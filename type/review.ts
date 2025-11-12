export type IssueSeverity = "low" | "medium" | "high"


export type Issue = {
    line: number;
    severity : IssueSeverity;
    message : string;
}

export type Refactor = {
    explain : string;
    code : string;
}

export type Review = {
    summary : string;
    issues: Issue[];
    security: string[];
    improvements: string[];
    refactor: Refactor[];
    eli5 : string;
};

