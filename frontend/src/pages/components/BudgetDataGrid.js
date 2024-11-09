import React, { useEffect, useState, useCallback } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';
import { roundDecimal } from "../../utils/mathUtil";

const columns = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 2,
        editable: true,
    },
    {
        field: 'amount',
        headerName: 'Amount (RM)',
        type: 'number',
        flex: 1.5,
        editable: true,
    },
    {
        field: 'receiver',
        headerName: 'Receiver',
        flex: 1.5,
        editable: true,
    },
    {
        field: 'remarks',
        headerName: 'Remarks',
        flex: 3,
        editable: true,
    },
    {
        field: 'isCompleted',
        headerName: 'Completed',
        flex: 1,
        type: 'boolean',
        editable: true,
    }
];

function BudgetDataGrid({ mode, budgetElement }) {
    const [rows, setRows] = useState([]);
    const [cellModesModel, setCellModesModel] = useState({});

    useEffect(() => {
        const prepareRows = () => {
            let rows = [];
            
            if (!budgetElement)
                return rows;

            for (let item of budgetElement) {
                item.amount = roundDecimal(item?.amount)
                rows.push(item);
            }

            setRows(rows);
        };

        prepareRows();
    }, [budgetElement]);

    const getColumns = () => {        
        if (!mode)
            return columns;

        if (mode === 'income')
            return columns.filter(col => col.field !== 'receiver');

        return columns;
    };

    const handleCellClick = useCallback((params, event) => {
        if (!params.isEditable) {
            return;
        }

        // Ignore portal
        if (event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) {
            return;
        }

        setCellModesModel((prevModel) => {
            return {
                // Revert the mode of the other cells from other rows
                ...Object.keys(prevModel).reduce(
                    (acc, id) => ({
                        ...acc,
                        [id]: Object.keys(prevModel[id]).reduce(
                            (acc2, field) => ({
                                ...acc2,
                                [field]: { mode: GridCellModes.View },
                            }),
                            {},
                        ),
                    }),
                    {},
                ),
                [params.id]: {
                    // Revert the mode of other cells in the same row
                    ...Object.keys(prevModel[params.id] || {}).reduce(
                        (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
                        {},
                    ),
                    [params.field]: { mode: GridCellModes.Edit },
                },
            };
        });
    }, []);

    const handleCellModesModelChange = useCallback((newModel) => {
        setCellModesModel(newModel);
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={getColumns()}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                disableColumnMenu
                cellModesModel={cellModesModel}
                onCellModesModelChange={handleCellModesModelChange}
                onCellClick={handleCellClick}
            />
        </Box>
    );
}

export default BudgetDataGrid;