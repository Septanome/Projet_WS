import React, { FC } from "react";
import { Button } from "@mui/joy";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import "./pagination.scss";
import { getCenteredArrayBoundaries } from "../../utils/array";
import { PaginatedData } from "../../models/pagination/pagination";

interface PaginationProps<T> {
    disabled?: boolean;
    pagination: PaginatedData<T>;
    pageCount?: number;

    goToPage?: (page: number) => void;
    goBack?: () => void;
    goForward?: () => void;
}

export const Pagination: FC<PaginationProps<unknown>> = ({
    disabled,
    pagination,
    pageCount = 5,
    goToPage,
    goBack,
    goForward,
}) => {
    const [pageStart, pageEnd] = getCenteredArrayBoundaries(
        pagination.totalPages,
        pagination.currentPage,
        pageCount,
        1,
    );

    return (
        <div className="pagination">
            <Button
                disabled={disabled || !pagination.hasPrevious}
                onClick={goBack}
            >
                <ArrowBackRounded />
            </Button>

            <div className="pagination__pages">
                {pageStart > 1 && (
                    <Button
                        variant="plain"
                        onClick={() => goToPage?.(1)}
                        disabled={disabled}
                    >
                        1
                    </Button>
                )}
                {pageStart > 2 && (
                    <Button variant="plain" disabled={true}>
                        ...
                    </Button>
                )}
                {Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => (
                    <Button
                        key={i}
                        variant={
                            pageStart + i === pagination.currentPage
                                ? "soft"
                                : "plain"
                        }
                        onClick={
                            pageStart + i === pagination.currentPage
                                ? undefined
                                : () => goToPage?.(pageStart + i)
                        }
                        disabled={disabled}
                    >
                        {pageStart + i}
                    </Button>
                ))}
                {pageEnd < pagination.totalPages - 1 && (
                    <Button variant="plain" disabled={true}>
                        ...
                    </Button>
                )}
                {pageEnd < pagination.totalPages && (
                    <Button
                        variant="plain"
                        onClick={() => goToPage?.(pagination.totalPages)}
                        disabled={disabled}
                    >
                        {pagination.totalPages}
                    </Button>
                )}
            </div>

            <Button
                disabled={disabled || !pagination.hasNext}
                onClick={goForward}
            >
                <ArrowForwardRounded />
            </Button>
        </div>
    );
};
