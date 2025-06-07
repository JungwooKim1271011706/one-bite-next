const React = require('react');
const { getMimeType } = require('../../lib/utils/mime-utils');

module.exports = function UploadShowComponent(props) {
  const { property, record } = props;
  const storedFilePath = record?.params?.audioFileKey 

  if (!storedFilePath) {
    return React.createElement('p', null, '업로드된 파일이 없습니다.');
  }

  const encodedPath = encodeURI(`/uploads/audio/${storedFilePath}`);
  const mimeType = getMimeType(storedFilePath);

  return React.createElement('div', null,
    React.createElement('div', {
      style: {
        fontSize: '12px',
        color: 'rgb(137, 138, 154)',
        marginBottom: '0.25rem',
      }
    }, '음성 파일'),
    React.createElement('audio', { 
      controls: true,
      style: {
        marginBottom: '1rem',
      }
    },
      React.createElement('source', {
        src: encodedPath,
        type: mimeType,
      }),
      '브라우저가 audio 태그를 지원하지 않습니다.'
    ),
    React.createElement('div', {
      style: {
        fontSize: '12px',
        color: 'rgb(137, 138, 154)',
        marginBottom: '0.25rem',
      }
    }, '음성 파일 다운로드'),
    React.createElement('p', null,
      React.createElement('a', {
        href: encodedPath,
        download: storedFilePath,
        target: '_blank',
        rel: 'noopener noreferrer',
      }, `🔗 ${storedFilePath} 다운로드`)
    )
  );
};