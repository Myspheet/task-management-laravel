<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Elibyy\TCPDF\Facades\TCPDF as PDF;
use App\Models\Task;
use Illuminate\Support\Facades\Log;

class PDFController extends Controller
{
    public function generatePDF(Request $request) {
        $name = $request->user()->name;
// Start the heredoc syntax with <<<EOD
        $html = <<<EOD
<!DOCTYPE html>
<html>
<head>
    <title>Task List for $name</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            color: #343a40;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #495057;
        }
        table {
            width: 100%;
            margin: 0 auto;
            border-collapse: collapse;
        }
        th, td {
            padding: 15px;
            text-align: left;
            border: 1px solid #343a40;
        }
        th {
            background-color: #343a40;
            color: #fff;
        }
    </style>
</head>
<body>
    <h1>Task List for $name</h1>
    <table nobr="true" cellpadding="5">
        <tr>
            <th>Title</th>
            <th width="250">Description</th>
            <th width="80">Due Date</th>
            <th width="70">Complete</th>
        </tr>
EOD;

// Use a for loop to generate table rows for each task
        foreach (Task::all() as $task) {
            $completeText = $task->completed ? 'Yes' : 'No';
            // Append each row to the $html variable
            $html .= <<<EOD
        <tr>
            <td>{$task->title}</td>
            <td>{$task->description}</td>
            <td>{$task->due_date}</td>
            <td>$completeText</td>
        </tr>
EOD;
        }

// Close the table and HTML tags in the heredoc syntax
        $html .= <<<EOD
    </table>
</body>
</html>
EOD;


        PDF::AddPage();
        PDF::writeHTML($html, true, false, true, false, '');
        header('Access-Control-Allow-Origin: *');
        $pdf = PDF::Output("$name.pdf");

           return response($pdf)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', "attachment; filename=$name.pdf");

    }
}
