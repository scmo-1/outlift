import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type PaginatorProps = {
  pages: number
  currentPage: number
  onPageChange: (page: number) => void
  onNext: () => void
  onPrevious: () => void
}

function Paginator({ pages, currentPage, onPageChange, onNext, onPrevious }: PaginatorProps) {
  const items: Array<number | 'ellipsis'> = []

  if (pages <= 4) {
    for (let index = 0; index < pages; index += 1) {
      items.push(index)
    }
  } else if (currentPage < 3) {
    items.push(0, 1, 2, 'ellipsis', pages - 1)
  } else if (currentPage >= pages - 3) {
    items.push(0, 'ellipsis', pages - 3, pages - 2, pages - 1)
  } else {
    items.push(0, 'ellipsis', currentPage, 'ellipsis', pages - 1)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onPrevious}
            aria-disabled={currentPage === 0}
            className={currentPage === 0 ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
        {items.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink isActive={item === currentPage} onClick={() => onPageChange(item)}>
                {item + 1}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext
            onClick={onNext}
            aria-disabled={currentPage === pages - 1}
            className={currentPage === pages - 1 ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paginator
