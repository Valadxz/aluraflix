import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TablaDataGrid = styled(DataGrid)`
  margin-top: 2rem;
  background-color: #2d2c2cf7; 
  border-radius: 8px;
  border: 1px solid #ddd;

  .MuiDataGrid-columnHeader {
    background-color: rgb(220 26 40);
    color: white; 
    font-weight: bold;
  }

  .MuiDataGrid-cell {
    color: white;
  }

  .MuiDataGrid-row:hover {
    background-color: #f0f0f0; 
  }

  .MuiDataGrid-footerContainer {
    background-color: rgb(220 26 40);
    color: white; 
  }

`;


export function Tabla({ db = [], columnas = [], actualizar, eliminar }) {
    if (!Array.isArray(columnas) || columnas.length === 0) {
        console.warn("La propiedad 'columnas' está vacía o no es válida.");
        return <p>No hay columnas para mostrar.</p>;
    }

    if (!Array.isArray(db)) {
        console.warn("La propiedad 'db' no es un arreglo.");
        return <p>No hay datos para mostrar.</p>;
    }

    return (
        <TablaDataGrid
            rows={db}
            columns={[
                ...columnas.map((columna) => {
                    if (columna.field === 'imagenUrl') {
                        return {
                            ...columna,
                            renderCell: (params) => (
                                <img
                                    src={params.value || '/placeholder.jpg'}
                                    alt="Vista previa"
                                    style={{
                                        width: '95px',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                    }}
                                />
                            ),
                        };
                    }
                    return columna;
                }),
                {
                    field: 'acciones',
                    headerName: 'Acciones',
                    maxWidth: 300,
                    sortable: false,
                    renderCell: (params) => {
                        const { id } = params.row;
                        const onClick = (e) => {
                            e.stopPropagation();
                            eliminar(id).then(() => {
                                actualizar();
                            });
                        };

                        return (
                            <>
                                <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={onClick} />
                                <Link to={`${id}`}>
                                    <EditIcon sx={{ color: 'orange', cursor: 'pointer' }} />
                                </Link>
                            </>
                        );
                    },
                },
            ]}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10, 20]}
        />
    );
}

