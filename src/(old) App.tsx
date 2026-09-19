import { useEffect, useState } from 'react'
import './App.css'
import get_data from './read_excel';
function App() {
  const [excel_data, setExcelData] = useState<Record<any,any>[]>([]);
  const [table_headings,setTableHeadings]=useState<React.JSX.Element[]>();
  const [table_rows,setTableRows]=useState<React.JSX.Element[]>();

  const [sort_by,setSortBy]=useState("first_name");
  const [sort_ascending,setSortAscending]=useState(true);

  //ID	Course	Provider	Link	Description	Hours	Cost	Level
  const sort_columns=["first_name","last_name","email","city","state"];
  const is_num_column_arr=[false,false,false,false,false];
  const sort_columns_options=sort_columns.map(sort_column=><option value={sort_column}>{sort_column}</option>);

  let up_arrow=<>↑</>;
  let down_arrow=<>↓</>;
  if(sort_ascending)
  {
    up_arrow=<b style={{color:"blue"}}>↑</b>
  }
  else
  {
    down_arrow=<b style={{color:"blue"}}>↓</b>
  }

   function update_sort_by(e: React.ChangeEvent<HTMLSelectElement>)
  {
    setSortBy(e.target.value);
  }
  function update_sort_ascending(new_value:boolean)
  {
    console.log("Make sort "+new_value);
    setSortAscending(new_value);
  }
  function sort_data(arr:Record<any,any>[])
  {
    console.log(arr);
    console.log(sort_by);
    const sort_column_index=sort_columns.indexOf(sort_by);
    const is_num_column=is_num_column_arr[sort_column_index];
    if(is_num_column)
    {
      if(sort_ascending)
      {
        arr.sort((a,b)=>a[sort_by]-b[sort_by]);
      }
      else
      {
        arr.sort((a,b)=>b[sort_by]-a[sort_by]);
      }
    }
    else
    {
      if(sort_ascending)
      {
        arr.sort((a,b)=>a[sort_by].localeCompare(b[sort_by]));
      }
      else
      {
        arr.sort((a,b)=>b[sort_by].localeCompare(a[sort_by]));
      }
    }
    return arr;
  }

  useEffect(()=>
  {
    async function async_wrapper()
    {
      if(excel_data.length==0)
      {
        const excel_data_temp=await get_data("MOCK_DATA.xlsx","data_short");
        console.log(excel_data_temp);
        setExcelData(excel_data_temp);
      }
    }
    async_wrapper();
  },[]);

  //Set up data entry cell.
  function handle_cell(value:any,column_number:number,row_number:number)
  {
    return (<td key={`td_${row_number},${column_number}`}>{value}</td>);
  }

  //Loop through each input row
  function handle_row(row:Record<any, any>,row_number:number)
  {
    let values=Object.values(row);
    return(<tr key={ `tr_${row_number}`}>
    {
      values.map((value: any,column_number: number) => handle_cell(value,column_number,row_number))
    }
    </tr>);
  }

  useEffect(()=>
  {
    let excel_data_temp=[...excel_data];
    excel_data_temp=sort_data(excel_data_temp);
    setExcelData(excel_data_temp);
  },[sort_ascending,sort_by]);

  useEffect(()=>
  {
    if(excel_data.length>0)
    {
      console.log(excel_data);
      let columns=Object.keys(excel_data[0]);
      const table_headings_temp=columns.map(column=><th key={`th_${column}`}>{column}</th>);
      setTableHeadings(table_headings_temp);

      const table_rows_temp=excel_data.map((row,row_number)=>handle_row(row,row_number));
      setTableRows(table_rows_temp);
    }
  },[excel_data])
  return (
    <>
    <h1>React Excel Template</h1>
    <h2>Settings</h2>
    <div className="container d-inline-block bg-light border" id="settings_grid">
    <div className="row">
    <div className="col border">
    Sort By
    </div>
    <div className="col border">
    Direction
    </div>
    </div>
    <div className="row">
    <div className="col border">
    <select id="sort_by" value={sort_by} onChange={update_sort_by}>
    {sort_columns_options}
    </select>
    </div>
    <div className="col border">
    <button id="asc_button" onClick={()=>update_sort_ascending(true)}>{up_arrow}</button>
    <button id="desc_button" onClick={()=>update_sort_ascending(false)}>{down_arrow}</button>
    </div>
    </div>
    </div>

    <h2>Results</h2>
    <table className="table table-striped">
    <thead>
    <tr>
    {table_headings}
    </tr>
    </thead>
    <tbody>
    {table_rows}
    </tbody>
    </table>
    </>
  )
}

export default App
