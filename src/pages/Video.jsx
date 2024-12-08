import styled from "styled-components";
import { BotonLink, ContenidoParcial, FormBoton, GrupoBotones, BotonesSeparador } from "../components/UI/Estilos";
import * as yup from 'yup';
import { useFormik } from "formik";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Tabla } from "../components/Tabla";
import { useContext } from "react";
import { Contexto } from "../Contexto";
import { crearVideo, eliminarVideo } from "../services/videos.services";

const Principal = styled.main`
    background: ${({ theme }) => theme.oscuro};
    margin-top: 4rem;
`;

const PrincipalContenido = styled(ContenidoParcial)`
    padding: 2rem 0;
`;

const Campo = styled(TextField)`
    input {
        background-color: ${({ theme }) => theme.semioscuro};
        color: ${({ theme }) => theme.texto};
    }
    .MuiFormLabel-root {
        color: ${({ theme }) => theme.texto};
    }
    .MuiFormLabel-root.Mui-focused {
        color: ${({ theme }) => theme.texto};
    }
    .MuiFormLabel-root.Mui-error {
        color: ${({ theme }) => theme.texto};
    }
`;

const Selector = styled(FormControl)`
    .MuiSelect-select, .MuiFormLabel-root, .MuiSelect-iconFilled:focus {
        background-color: ${({ theme }) => theme.semioscuro} !important;
        color: ${({ theme }) => theme.texto} !important;
    }
    .MuiSelect-nativeInput, .MuiFormLabel-root {
        color: ${({ theme }) => theme.texto};
    }
    .MuiSelect-icon {
        color: ${({ theme }) => theme.texto};
    }
    .MuiFormLabel-root.Mui-error {
        color: ${({ theme }) => theme.texto};
    }
`;

const PrincipalTitulo = styled.h1`
    color: ${({ theme }) => theme.texto};
    text-align: center;
    font-weight: 700;
    font-size: 1.5rem;
`;

const esquemaDeValidacion = yup.object({
    titulo: yup
        .string()
        .required('El campo es obligatorio'),
    enlace_video: yup
        .string()
        .url('Ingrese un enlace válido')
        .required('El campo es obligatorio'),
    enlace_imagen: yup
        .string()
        .url('Ingrese un enlace válido')
        .required('El campo es obligatorio'),
    artista: yup
        .string()
        .required('El campo es obligatorio'),
    descripcion: yup
        .string()
        .required('El campo es obligatorio'),
});

export function Video() {
    const { videos = [], artistas = [], valor, recargar } = useContext(Contexto);

    const columnas = [
        { field: 'titulo', headerName: 'Título', flex: 1 },
        { field: 'artista', headerName: 'Artista', flex: 1 },
        { field: 'descripcion', headerName: 'Descripción', flex: 2 },
        { field: 'link_video', headerName: 'Enlace del Video', flex: 2, renderCell: (params) => (
            <a href={params.value} target="_blank" rel="noopener noreferrer" style={{ color: '#f90606' }}>
                Ver Video
            </a>
        )},
        { field: 'link_imagen', headerName: 'Imagen', flex: 1, renderCell: (params) => (
            <img
                src={params.value || '/placeholder.jpg'}
                alt="Vista previa"
                style={{
                    width: '100px',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '4px',
                }}
            />
        )},
    ];

    const videosConArtista = (videos || []).map((video) => {
        const artistaEncontrado = (artistas || []).find((artista) => artista.id === video.artista);
        return {
            ...video,
            artista: artistaEncontrado ? artistaEncontrado.nombre : 'Desconocido',
            link_video: video.link_video,
            link_imagen: video.link_imagen,
            descripcion: video.descripcion,
        };
    });


    function actualizar() {
        recargar(valor + 1);
    }

    const formik = useFormik({
        initialValues: {
            titulo: '',
            link_video: '',
            link_imagen: '',
            artista: '',
            descripcion: '',
        },
        enableReinitialize: true,
        validationSchema: esquemaDeValidacion,
        onSubmit: (values) => {
            const { titulo, enlace_video, enlace_imagen, artista, descripcion } = values;
            formik.resetForm();
            crearVideo({
                titulo,
                link_video: enlace_video,
                link_imagen: enlace_imagen,
                artista,
                descripcion,
            })
                .then(() => {
                    actualizar();
                })
                .catch((error) => {
                    console.error("Error al crear el video:", error);
                });
        },
    });

    return (
        <Principal>
            <PrincipalContenido>
                <PrincipalTitulo>Agregar un nuevo Video</PrincipalTitulo>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Campo
                        fullWidth
                        margin="normal"
                        id="titulo"
                        name="titulo"
                        label="Título"
                        variant="filled"
                        value={formik.values.titulo}
                        onChange={formik.handleChange}
                        error={formik.touched.titulo && Boolean(formik.errors.titulo)}
                        helperText={formik.touched.titulo && formik.errors.titulo}
                    />
                    <Campo
                        fullWidth
                        margin="normal"
                        id="enlace_video"
                        name="enlace_video"
                        label="Enlace de video"
                        variant="filled"
                        value={formik.values.enlace_video}
                        onChange={formik.handleChange}
                        error={formik.touched.enlace_video && Boolean(formik.errors.enlace_video)}
                        helperText={formik.touched.enlace_video && formik.errors.enlace_video}
                    />
                    <Campo
                        fullWidth
                        margin="normal"
                        id="enlace_imagen"
                        name="enlace_imagen"
                        label="Enlace de imagen"
                        variant="filled"
                        value={formik.values.enlace_imagen}
                        onChange={formik.handleChange}
                        error={formik.touched.enlace_imagen && Boolean(formik.errors.enlace_imagen)}
                        helperText={formik.touched.enlace_imagen && formik.errors.enlace_imagen}
                    />
                    <Selector
                        fullWidth
                        margin="normal"
                        variant="filled"
                        error={formik.touched.artista && Boolean(formik.errors.artista)}
                    >
                        <InputLabel id="artista-rotulo">Artista</InputLabel>
                        <Select
                            id="artista"
                            label="Artista"
                            name="artista"
                            value={formik.values.artista}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('artista', e.target.value)}
                        >
                            {artistas.map((artista, indice) => (
                                <MenuItem value={artista.id} key={indice}>
                                    {artista.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.artista && formik.errors.artista}</FormHelperText>
                    </Selector>
                    <Campo
                        fullWidth
                        margin="normal"
                        id="descripcion"
                        name="descripcion"
                        label="Descripción"
                        variant="filled"
                        value={formik.values.descripcion}
                        onChange={formik.handleChange}
                        error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                        helperText={formik.touched.descripcion && formik.errors.descripcion}
                    />
                    <GrupoBotones>
                        <BotonesSeparador>
                            <FormBoton color="#f90606" type="submit">
                                Guardar
                            </FormBoton>
                            <FormBoton color="#cfcfcf" type="reset" onClick={formik.resetForm}>
                                Limpiar
                            </FormBoton>
                        </BotonesSeparador>
                        <BotonLink tipo="lineas" color="#cfcfcf" to="../artista">
                            Nuevo Artista
                        </BotonLink>
                    </GrupoBotones>
                </form>
                <Tabla db={videosConArtista} columnas={columnas} actualizar={actualizar} eliminar={eliminarVideo} />
            </PrincipalContenido>
        </Principal>
    );
}

