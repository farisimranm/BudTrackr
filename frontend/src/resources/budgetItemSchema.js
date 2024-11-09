export const budgetDataGridSchema = [
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        editable: true,
    },
    {
        field: 'amount',
        headerName: 'Amount (RM)',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'receiver',
        headerName: 'Receiver',
        width: 150,
        editable: true,
    },
    {
        field: 'remarks',
        headerName: 'Remarks',
        width: 300,
        editable: true,
    },
    {
        field: 'isCompleted',
        headerName: 'Completed',
        width: 150,
        type: 'boolean',
        editable: true,
    }
];