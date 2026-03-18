import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import credential from '../src/app/cron/cgcProductKey.json'

const SPREADSHEET_ID = '1GIgf9TwfctMrK43Qu0NmI_i0ikOzn7cuPwh--lCgbXQ'
const SHEET_TITLE = '\uC694\uCCAD\uC0AC\uD56D_\uAD00\uB9AC\uB300\uC7A5'
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const COMPLETE_TARGET = '\uD611\uC758\uD544\uC694'
const NOTE_DUPLICATE = '\uC911\uBCF5'
const NOTE_FAILED = '\uC2E4\uD328'

type SheetRecord = Record<string, string | undefined>

function normalizeHeader(value: string) {
  return value.replace(/\s+/g, '').trim().toLowerCase()
}

function getFieldName(record: SheetRecord, aliases: string[]) {
  const normalizedAlias = aliases.map(normalizeHeader)
  return Object.keys(record).find(key => normalizedAlias.includes(normalizeHeader(key)))
}

function getFieldValue(record: SheetRecord, aliases: string[]) {
  const fieldName = getFieldName(record, aliases)
  return fieldName ? (record[fieldName] ?? '').toString().trim() : ''
}

function setFieldValue(row: GoogleSpreadsheetRow, record: SheetRecord, aliases: string[], value: string) {
  const fieldName = getFieldName(record, aliases)
  if (!fieldName) {
    throw new Error(`Missing column: ${aliases.join(', ')}`)
  }
  row.set(fieldName, value)
}

function normalizeText(value: string) {
  return value
    .replace(/\s+/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .trim()
    .toLowerCase()
}

function createRequestKey(request: string, detail: string) {
  return `${normalizeText(request)}::${normalizeText(detail)}`
}

async function loadSheet() {
  const auth = new JWT({
    email: credential.client_email,
    key: credential.private_key,
    scopes: SCOPES,
  })

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth)
  await doc.loadInfo()

  const sheet = doc.sheetsByTitle[SHEET_TITLE]
  if (!sheet) {
    throw new Error(`Sheet not found: ${SHEET_TITLE}`)
  }

  return sheet
}

async function processRows() {
  const sheet = await loadSheet()
  const rows = await sheet.getRows()
  const seenRequests = new Map<string, string>()

  let updatedCount = 0
  let pendingCount = 0

  for (const row of rows) {
    const record = row.toObject() as SheetRecord
    const no = getFieldValue(record, ['NO.', 'NO'])
    const requester = getFieldValue(record, ['\uC694\uCCAD\uC790'])
    const request = getFieldValue(record, ['\uC694\uCCAD\uC0AC\uD56D'])
    const detail = getFieldValue(record, ['\uC0C1\uC138'])
    const completeStatus = getFieldValue(record, ['\uC644\uB8CC \uC5EC\uBD80', '\uC644\uB8CC\uC5EC\uBD80'])
    const note = getFieldValue(record, ['\uBE44\uACE0'])

    if (completeStatus !== COMPLETE_TARGET) {
      continue
    }

    const requestKey = createRequestKey(request, detail)
    if (!requestKey || requestKey === '::') {
      setFieldValue(row, record, ['\uBE44\uACE0'], NOTE_FAILED)
      await row.save()
      updatedCount += 1
      continue
    }

    if (seenRequests.has(requestKey)) {
      const duplicateWith = seenRequests.get(requestKey)
      const duplicateNote = note ? `${note}, ${NOTE_DUPLICATE}` : `${NOTE_DUPLICATE} (${duplicateWith})`
      setFieldValue(row, record, ['\uBE44\uACE0'], duplicateNote)
      await row.save()
      updatedCount += 1
      continue
    }

    seenRequests.set(requestKey, no || requester || request)
    pendingCount += 1
    console.log(`[PENDING] NO=${no || '-'} requester=${requester || '-'} request=${request || '-'} detail=${detail || '-'}`)
  }

  console.log(`Processed pending rows: ${pendingCount}`)
  console.log(`Updated duplicate/failed rows: ${updatedCount}`)
}

processRows().catch(error => {
  console.error('Failed to process request sheet.')
  console.error(error)
  process.exitCode = 1
})
