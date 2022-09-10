import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function FormDialog({open, handleClose, data, onChange, handleFormSubmit}) {
    const {id,status,ad,tesvir,sekil}=data

  return (
    <div>
   
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {id?"Bölməni yenilə":"Yeni bölmə əlavə et"}        
        </DialogTitle>
        <DialogContent>
          <form>
            <br />
            <TextField value={ad} onChange={e=>onChange(e)} id="ad" placeholder="Adı daxil edin" label="Ad" fullWidth style={{marginBottom: "10px", color: "red"}}/>
            <TextField value={status} onChange={e=>onChange(e)} id="status" placeholder="Status daxil edin" label="Status" fullWidth style={{marginBottom: "10px"}}/>
            <TextField value={tesvir} onChange={e=>onChange(e)} id="tesvir" placeholder="Təsvir daxil edin" label="Təsvir" fullWidth style={{marginBottom: "10px"}}/>
            <input type="file" value={sekil} onChange={e=>onChange(e)} style={{ border: "1px solid gray",opacity:"0.7",width: "550px",lineHeight: "50px",borderRadius: "4px"}}/>
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
