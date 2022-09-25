import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormDialog from './components/dialog';

const initialValue = { bolme: "", status: "", sual: "", sualcavabi: "", yanlisvariant1: "", yanlisvariant2: "", yanlisvariant3: ""}

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const url = `http://localhost:4000/suallar`
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Bolme", field: "bolme", },
    { headerName: "Status", field: "status", },
    { headerName: "Sual", field: "sual" },
    { headerName: "Dogru cavab", field: 'sualcavabi' },
    { headerName: "Yanlış cavab 1", field: 'yanlisvariant1' },
    { headerName: "Yanlış cavab 2", field: 'yanlisvariant2' },
    { headerName: "Yanlış cavab 3", field: 'yanlisvariant3' },
    {
      headerName: "Parametrlər", field: "id", cellRendererFramework: (params) => <div>
        <Button variant="outlined" color="primary" size="small" style={{ marginRight: "1px", marginBottom: "5px" }} onClick={() => handleUpdate(params.data)}>Yenilə</Button>
        <Button variant="outlined" color="secondary" size="small" style={{ marginBottom: "5px" }} onClick={() => handleDelete(params.value)}>Sil</Button>
      </div>
    }
  ]

  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
  }

  const onChange = (e) => {
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const onGridReady = (params) => {
    setGridApi(params);
  }

  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Bunu silmək istədiyinizə əminsinizmi?", id)
    console.log(confirm)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())
    }
  }

  const handleFormSubmit = () => {
    if (formData.id) {
      fetch(url+`/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    } else {
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }

  const defaultColDef = {
    sortable: true,
    flex: 1, filter: true,
    floatingFilter: true
  }

  return (
    <div className='App'>
      <h1 style={{ textAlign: "center" }}>React-App</h1>
      <h3 style={{ textAlign: "center" }}>CRUD Operation with Json-server in ag-Grid</h3>
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginBottom: '10px' }}>Sual əlavə edin</Button>
      </Grid>
      <div className="ag-theme-alpine" style={{ height: '400px' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={tableData}
          defaultColDef={defaultColDef}
          pagination={true}
          onGridReady={onGridReady}
        />
      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </div>
  );
};
export default App
