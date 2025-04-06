type Props = {
    currentPage: number;
    totalPages?: number;
}

export default function Pagination({ currentPage, totalPages = 10} : Props) {
    return (
        <div style={{ marginTop : '2rem'}}>
            {Array.from({ length: totalPages}, (_, i) => {
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
        </div>
    );

}