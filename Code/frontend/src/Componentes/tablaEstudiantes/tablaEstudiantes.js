import React, { useEffect, useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import api_host from '../conf/creds';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          }
    },
    paper8: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    textfields:{
        marginTop:'5%'
    },
    columna2: {
        marginRight:'5%',
        width:'45%',
        float: 'right',
        height: '50%'
    },
    text: {
        marginTop:'10%',
        width:'100%',
        height:'100%'
      },
    buscador: {
        marginTop:'1%',
      },
    
});

const ProcessTable = (props) => {
    const { classes } = props;
    
    const [mensaje, setMensaje] = React.useState("");
    const [nombre, setNombre] = useState("");
    const [carnet, setCarnet] = useState("");
    const [id, setId] = useState("");

    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [openExito, setOpenExito] = useState(false);
    const [openExitoEliminar, setOpenExitoEliminar] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openErrorEliminar, setOpenErrorEliminar] = useState(false);

    const handleCarnet = (e) =>{setCarnet(e.target.value);} 
    const handleNombre= (e) =>{setNombre(e.target.value);}  

    const alertaExito = () => {
        setOpenExito(true)
        setTimeout(() => {
            setOpenExito(false)
          }, 4000);     
    }

    const alertaExitoEliminar = () => {
        setOpenExitoEliminar(true)
        setTimeout(() => {
            setOpenExitoEliminar(false)
          }, 4000);     
    }

    const alertaError = () => {
        setOpenError(true)
        setTimeout(() => {
            setOpenError(false)
          }, 4000);     
    }

    const alertaErrorEliminar = () => {
        setOpenErrorEliminar(true)
        setTimeout(() => {
            setOpenErrorEliminar(false)
          }, 4000);     
    }

    const handleOpen1 = (nombre,carnet) => {
        setOpen1(true);
        setNombre(nombre);
        setCarnet(carnet);
    };

    const handleOpen2 = (nombre,carnet,id) => {
        setOpen2(true);
        setNombre(nombre);
        setCarnet(carnet);
        setId(id);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClose2Editar = () => {
        setTimeout(() => {
            setOpen2(false);
          }, 2000);
    
    };

    
    useEffect(() => {
        const timer = setInterval(() => {
            getTabla ();
        }, 3000);

        getTabla();

        return () => {
            clearInterval(timer);
        }
    }, []);

    
    const getDatos = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(`${api_host}/getEstudiantes`, requestOptions)
        const json = await response.json()
        return json
    }

    const getTabla = async () => {
        const datos = await getDatos();
        setData(datos);
    }


    const searchFriend = (val) => {
        setSearch(val);
        const newFriends = data.map((friend) => (
            friend.carnet.toLowerCase().indexOf(val.toLowerCase()) !== -1 ? { ...friend, show: true } : { ...friend, show: false }
        ));
        setData(newFriends);
    }

    const eliminarEstudiante = async (idEstudiante) =>{
        
        const body = {
            id:idEstudiante,
        };

       const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body)
        };
        const response = await fetch(`${api_host}/eliminarEstudiante`, requestOptions)
        const nueva = await response.json()
        
        if (nueva === 0){return;}
        const res = nueva.respuesta
        if(res === 1){
          alertaExitoEliminar();
        }else{
           setMensaje("Ocurrio un error al eliminar al estudiante")
           alertaErrorEliminar();
        }
      }

    const editar = async (idEditarEstudiante) =>{
        if(carnet==="" ||nombre===""){
           setMensaje("Rellene todos los campos.")
           alertaError();
           return 0;
        }
        const body = {
            id:idEditarEstudiante,
            carnet:carnet,
            nombre:nombre,
          };
       const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body)
        };
        const response = await fetch(`${api_host}/editarEstudiante`, requestOptions)
        const json = await response.json()
        return json
      }
      
     
     const confirmarEditar = async (id) => {
        const nueva = await editar(id)
        if (nueva === 0){return;}
        const res = nueva.respuesta
        if(res === 1){
          alertaExito();
          handleClose2Editar();
        }else{
           setMensaje("Ocurrio un error al actualizar los datos del estudiante.")
           alertaError();
        }
      }

    return(
        <>
       <TextField 
                placeholder="Search" 
                id="Search" 
                label="Search" 
                variant="outlined" 
                value={search}
                onChange={(e) => searchFriend(e.target.value)}
                className={classes.buscador}
            /> 
        <Paper className={classes.root}>
            
        <div className={classes.root,classes.alerta}>
                <Collapse in={openExitoEliminar}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenExitoEliminar(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    variant="filled"
                    >
                     Estudiante eliminado con éxito.
                    </Alert>
                </Collapse>
            </div>


            <div className={classes.root,classes.alerta}>
                <Collapse in={openErrorEliminar}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenErrorEliminar(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    variant="filled"
                    severity="error"
                    >
                     {mensaje}
                    </Alert>
                </Collapse>
            </div>
            <TableContainer style={{ maxHeight: '80vh' }}>
            <Table className={classes.table} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.head} align="center">Carnet</TableCell>
                        <TableCell className={classes.head} align="center">Nombre</TableCell>
                        <TableCell className={classes.head} align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        .map((row, index) => (
                            <TableRow className={classes.row} key={index} style= {{display:(row.hasOwnProperty('show') ? row.show ? 'table-row' : 'none' : 'table-row')}}>
                                <TableCell align="center">{row.carnet}</TableCell>
                                <TableCell align="center">{row.nombre}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="primary" onClick={() => handleOpen1(row.nombre,row.carnet)}>
                                        <VisibilityIcon />
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen2(row.nombre,row.carnet,row.id)}>
                                        <EditIcon />
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => eliminarEstudiante(row.id)}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            </TableContainer>
            
            <div>
                <Modal
                  open={open1}
                  onClose={handleClose1}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={{top:'50%',left:'50%', transform: 'translate(-50%, -50%)'}} className={classes.paper8}>
                    <h2 id="simple-modal-title" align = 'center'>Estudiante</h2>
                    <div className={classes.columna1}>
                    <TextField defaultValue={carnet} disabled = 'True' label="Carnet" variant="outlined" className={classes.textfields}/>
                    <TextField defaultValue={nombre} disabled = 'True' label="Nombre" variant="outlined" className={classes.textfields}/>
                   </div>
                  </div>
                </Modal>
           </div>

           <div>
                <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={{top:'50%',left:'50%', transform: 'translate(-50%, -50%)'}} className={classes.paper8}>
                    <h2 id="simple-modal-title" align = 'center'>Editar estudiante</h2>
                    <div className={classes.columna1}>
                    <TextField defaultValue={carnet} label="Carnet" onChange={handleCarnet} variant="outlined" id='carnet' className={classes.textfields}/>
                    <TextField defaultValue={nombre} label="Nombre" onChange={handleNombre} variant="outlined" id='nombre' className={classes.textfields}/>
                    <br></br>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => confirmarEditar(id)}
                        className={classes.col2}
                        >       
                        Editar
                    </Button>
                   </div>
                   <div className={classes.root,classes.alerta}>
                        <Collapse in={openExito}>
                            <Alert
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenExito(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            variant="filled"
                            >
                            Estudiante actualizado con éxito.
                            </Alert>
                        </Collapse>
                    </div>


                    <div className={classes.root,classes.alerta}>
                        <Collapse in={openError}>
                            <Alert
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenError(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            variant="filled"
                            severity="error"
                            >
                            {mensaje}
                            </Alert>
                        </Collapse>
                    </div>
                  </div>
                </Modal>
           </div>

        </Paper>
        </>
    )
}

export default withStyles(styles)(ProcessTable);