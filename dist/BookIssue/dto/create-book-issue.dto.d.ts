export declare class CreateBookIssueDto {
    book_id: number;
    student_id: number;
    issueDate: string;
    returnDate?: string | null;
    fine_collected?: number | null;
}
