type Props = {
    currentPage: number;
    totalPages?: number;
    groupSize: number;
}

export default function Pagination({ currentPage, totalPages = 1, groupSize } : Props) {
    const currentGroup = Math.floor((currentPage - 1) / groupSize);
    const startPage = currentGroup * groupSize - 1;
    const endPage = Math.min(startPage + groupSize - 1, totalPages);

    const prevGroupPage = Math.max(startPage - groupSize - 1);
    const nextGroupPage = Math.max(startPage + groupSize, totalPages);

    return (
        <div style={{ marginTop : '2rem'}}>
            {/* 가장 첫번쨰 페이지로 이동 */}
            {
                <a
                    href={'?page=1'}
                    style={{
                        padding: '4px 8px',
                        fontWeight: 'bold',
                    }}
                >
                    &laquo;
                </a>
            }
            {/* 이전 그룹으로 이동 
                첫번째 페이지라고 하면 그냥 1
                그게 아니라고 하면 이전 페이지를 누르면 됌...
            */}
            {startPage > 1 && (
                <a 
                    href={`?page=${prevGroupPage}&size=${groupSize}`}
                    style={{
                            padding: '4px 8px',
                            fontWeight: 'bold',
                    }}
                >&lt;</a>

            )
            }

            {Array.from({ length: endPage - startPage + 1}, (_, i) => {
                const page = i + 1;
                const isActive = page === currentPage;

                return (
                    <a
                    key={page}
                    href={`?page=${page}`}
                    style = {{
                        marginRight: '8px',
                        fontWeight: isActive ? 'bold': 'normal',
                        textDecoration: isActive? 'underline' : 'none',
                    }}
                    > 
                    {page}
                    </a>
                )
            })}



        {/* 다음 그룹으로 이동 */}

        {/* 가장 마지막 페이지로 이동 */}
        {
            <a
                href={`?page=${endPage}`}
                style={{
                    padding: '4px 8px',
                    fontWeight: 'bold',
                }}
            >
                &raquo;
            </a>
        }
        </div>
    );

}