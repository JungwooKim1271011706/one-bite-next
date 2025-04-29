'use client'

import next from "next";

type Props = {
    currentPage: number;
    totalCount?: number;
    groupSize: number;
    searchQuery : string;
}

export default function Pagination({ currentPage, totalCount = 1, groupSize, searchQuery = ''} : Props) {
    const currentGroup = Math.floor((currentPage - 1) / groupSize);
    const startPage = currentGroup * groupSize + 1;
    const totalPage = Math.ceil(totalCount / groupSize);
    const endPage = Math.min(startPage + groupSize - 1, totalPage);

    const prevGroupPage = startPage -1;
    const nextGroupPage = endPage + 1;


    return (
        <div style={{ 
            marginTop : '2rem',
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            }}>
            {/* 가장 첫번쨰 페이지로 이동 */}
            {(
                <a
                    href={`?q=${searchQuery}&page=1`}
                    style={{
                        padding: '2px 4px',
                        fontWeight: 'bold',
                        color: "blue"
                    }}>
                {`<<`}</a>
            )}
            {/* 이전 그룹으로 이동 */}
            {(
                <a 
                    href={`?q=${searchQuery}&page=${prevGroupPage}`}
                    style={{
                            padding: '0px 8px 0px 3px',
                    }}
                >&lt;</a>

            )}
            {/* 페이지 */}
            {Array.from({ length: endPage - startPage + 1}, (_, i) => {
                const page = startPage + i;
                const isActive = page === currentPage;
                return (
                    <a
                    key={page}
                    href={`?q=${searchQuery}&page=${page}`}
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
        {endPage < totalPage && (
            <a href={`?q=${searchQuery}&page=${nextGroupPage}`}>{`>`}</a>
        )}

        {/* 가장 마지막 페이지로 이동 */}
        {currentPage < totalPage && (
            <a
                href={`?page=${totalPage}`}
                style={{
                    padding: '0px 0px 0px 6px',
                    fontWeight: 'bold',
                    color: "blue"
            }}>{`>>`}</a>
        )}
        </div>
    );

}