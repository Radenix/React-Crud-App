import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';


export default function FormDialog({open, handleClose, data, onChange, handleFormSubmit}) {
    const {id,status,bolme,sual,dogruvariant,yanlisvariant1,yanlisvariant2,yanlisvariant3}=data

  return (
    <div>
   
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {id?"Sualı yenilə":"Yeni sual əlavə et"}        
        </DialogTitle>
        <DialogContent>
          <form>
            <br />
            <TextField value={bolme} onChange={e=>onChange(e)} id="bolme" placeholder="Bolmeyi daxil edin" label="Bolme" fullWidth size="small" style={{marginBottom: "10px"}}/>
            <TextField value={status} onChange={e=>onChange(e)} id="status" placeholder="Status daxil edin" label="Status" fullWidth size="small" style={{marginBottom: "10px"}}/>
            <TextField value={sual} onChange={e=>onChange(e)} id="sual" placeholder="Sual daxil edin" label="Sual" fullWidth size="small" style={{marginBottom: "10px"}}/>
            <div style={{textAlign: "center", color: "green", marginBottom:"10px"}}>Dogru Cavab:</div>
            <TextField value={dogruvariant} onChange={e=>onChange(e)} id="sualcavabi" placeholder="Duz cavabi daxil edin" label="Doğru Cavab" fullWidth size="small" style={{marginBottom: "10px"}}/>
            <div style={{textAlign: "center", color: "red", marginBottom:"10px"}}>Yanlış Cavablar:</div>
            <TextField value={yanlisvariant1} onChange={e=>onChange(e)} id="yanlisvariant1" placeholder="Yanlış cavabi daxil edin" label="Yanlış Cavab 1" fullWidth size="small" style={{marginBottom: "10px"}}/>
            <TextField value={yanlisvariant2} onChange={e=>onChange(e)} id="yanlisvariant2" placeholder="Yanlış cavabi daxil edin" label="Yanlış Cavab 2" fullWidth size="small" style={{marginBottom: "10px"}}/>
            <TextField value={yanlisvariant3} onChange={e=>onChange(e)} id="yanlisvariant3" placeholder="Yanlış cavabi daxil edin" label="Yanlış Cavab 3" fullWidth size="small" style={{marginBottom: "10px"}}/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">Ləğv et</Button>
          <Button color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {id?"Yenilə":"Əlavə et"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
