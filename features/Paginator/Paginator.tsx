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
  hidePageLinks?: boolean
  displayLabel?: string
  disableNext?: boolean
  disablePrevious?: boolean
  nextAriaLabel?: string
  previousAriaLabel?: string
}

function Paginator({
  pages,
  currentPage,
  onPageChange,
  onNext,
  onPrevious,
  hidePageLinks = false,
  displayLabel,
  disableNext,
  disablePrevious,
  nextAriaLabel,
  previousAriaLabel,
}: PaginatorProps) {
  const items: Array<number | 'ellipsis'> = []
  const isPreviousDisabled = disablePrevious ?? currentPage === 0
  const isNextDisabled = disableNext ?? currentPage === pages - 1

  if (!hidePageLinks && pages <= 4) {
    for (let index = 0; index < pages; index += 1) {
      items.push(index)
    }
  } else if (!hidePageLinks && currentPage < 3) {
    items.push(0, 1, 2, 'ellipsis', pages - 1)
  } else if (!hidePageLinks && currentPage >= pages - 3) {
    items.push(0, 'ellipsis', pages - 3, pages - 2, pages - 1)
  } else if (!hidePageLinks) {
    items.push(0, 'ellipsis', currentPage, 'ellipsis', pages - 1)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onPrevious}
            aria-label={previousAriaLabel ?? 'Go to previous page'}
            aria-disabled={isPreviousDisabled}
            className={isPreviousDisabled ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
        {hidePageLinks ? (
          <PaginationItem>
            <span className="flex min-w-32 items-center justify-center px-3 text-sm font-medium capitalize">
              {displayLabel}
            </span>
          </PaginationItem>
        ) : (
          items.map((item, index) => {
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
          })
        )}
        <PaginationItem>
          <PaginationNext
            onClick={onNext}
            aria-label={nextAriaLabel ?? 'Go to next page'}
            aria-disabled={isNextDisabled}
            className={isNextDisabled ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paginator
