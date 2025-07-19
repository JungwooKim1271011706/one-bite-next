'use client'

type Props = {
    currentPage: number;
    totalCount?: number;
    groupSize: number;
    searchQuery: string;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalCount = 1,
    groupSize,
    searchQuery = '',
    onPageChange
}: Props) {
    const currentGroup = Math.floor((currentPage - 1) / groupSize);
    const startPage = currentGroup * groupSize + 1;
    const totalPage = Math.max(1, Math.ceil(totalCount / groupSize));
    const endPage = Math.min(startPage + groupSize - 1, totalPage);

    const prevGroupPage = startPage - 1;
    const nextGroupPage = endPage + 1;

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{
                marginTop: '2rem',
                display: "inline-flex",
                alignItems: 'center',
                gap: '15px',
            }}>
                {/* 가장 첫번째 페이지로 이동 */}
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    style={{
                        padding: '2px 4px',
                        fontWeight: 'bold',
                        color: "blue",
                        background: "none",
                        border: "none",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer"
                    }}>
                    {`<<`}
                </button>
                {/* 이전 그룹으로 이동 */}
                <button
                    onClick={() => onPageChange(prevGroupPage)}
                    disabled={prevGroupPage < 1}
                    style={{
                        padding: '0px 8px 0px 3px',
                        background: "none",
                        border: "none",
                        cursor: prevGroupPage < 1 ? "not-allowed" : "pointer"
                    }}
                >&lt;</button>
                {/* 페이지 */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const page = startPage + i;
                    const isActive = page === currentPage;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            disabled={page === currentPage}
                            style={{
                                marginRight: '8px',
                                fontWeight: isActive ? 'bold' : 'normal',
                                textDecoration: isActive ? 'underline' : 'none',
                                background: "none",
                                border: "none",
                                cursor: page === currentPage ? "not-allowed" : "pointer"
                            }}
                        >
                            {page}
                        </button>
                    )
                })}
                {/* 다음 그룹으로 이동 */}
                <button
                    onClick={() => onPageChange(nextGroupPage)}
                    disabled={endPage >= totalPage}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: endPage >= totalPage ? "not-allowed" : "pointer"
                    }}
                >{`>`}</button>
                {/* 가장 마지막 페이지로 이동 */}
                <button
                    onClick={() => onPageChange(totalPage)}
                    disabled={currentPage === totalPage}
                    style={{
                        padding: '0px 0px 0px 6px',
                        fontWeight: 'bold',
                        color: "blue",
                        background: "none",
                        border: "none",
                        cursor: currentPage === totalPage ? "not-allowed" : "pointer"
                    }}>{`>>`}</button>
            </div>
        </div>
    );
}