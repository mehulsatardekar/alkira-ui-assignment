import React from 'react'
import * as  XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useTeams } from '../../context';
import { GamesType, TeamsType } from '../../types';


const ExcelExport = () => {
    const { teams, games } = useTeams();

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = (filedata: TeamsType[] | GamesType[]) => {
        const ws = XLSX.utils.json_to_sheet(filedata);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        return data;

    }

    const savefiles = () => {
        const teamsData = exportToExcel(teams);
        const gamesData = exportToExcel(games);

        saveAs(teamsData, "teamsfile" + fileExtension);
        saveAs(gamesData, "gamesfile" + fileExtension);

    }
    return (
        <button type="button" className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="left" title="Export Data To Excel" onClick={savefiles}>Export to Excel</button>
    )
}

export { ExcelExport }