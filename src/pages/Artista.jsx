import styled from "styled-components";
import { ContenidoParcial, FormBoton, BotonLink, GrupoBotones, BotonesSeparador } from "../components/UI/Estilos";
import * as yup from 'yup';
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { Tabla } from "../components/Tabla";
import { useContext } from "react";
import { Contexto } from "../Contexto";
import { crearArtista, eliminarArtista } from "../services/artistas.service";

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

const PrincipalTitulo = styled.h1`
    color: ${({ theme }) => theme.texto};
    text-align: center;
    font-weight: 700;
    font-size: 1.5rem;
`;

const esquemaDeValidacion = yup.object({
    nombre: yup
        .string()
        .required('El campo es obligatorio'),
    descripcion: yup
        .string()
        .required('El campo es obligatorio'),
    color: yup
        .string()
        .required('El campo es obligatorio'),
    codigo: yup
        .number()
        .typeError('Solo caracteres numéricos')
        .required('El campo es obligatorio'),
    imagenUrl: yup
        .string()
        .url('La URL debe ser válida')
        .required('El campo de imagen es obligatorio'),
});

export function Artista() {
    const datos = useContext(Contexto);
    const { artistas, valor, recargar } = datos;

    const columnas = [
        { field: 'nombre', headerName: 'Nombre', flex: 1 },
        { field: 'descripcion', headerName: 'Descripción', flex: 2 },
        { field: 'imagenUrl', headerName: 'Imagen', flex: 2 },
    ];    

    function actualizar() {
        recargar(valor + 1);
    }

    const formik = useFormik({
        initialValues: {
            nombre: '',
            descripcion: '',
            color: '#dcdcdc',
            codigo: '',
            imagenUrl: '',
        },
        enableReinitialize: true,
        validationSchema: esquemaDeValidacion,
        onSubmit: (values) => {
            const { nombre, descripcion, color, codigo, imagenUrl } = values;
            formik.resetForm();
            crearArtista({
                nombre,
                descripcion,
                color,
                codigo,
                imagenUrl, 
            })
                .then(() => {
                    actualizar();
                });
        },
    });

    return (
        <Principal>
            <PrincipalContenido>
                <PrincipalTitulo>Agregar un nuevo Artista</PrincipalTitulo>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Campo
                        fullWidth
                        margin="normal"
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        variant="filled"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                    />
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
                    <Campo
                        fullWidth
                        margin="normal"
                        id="color"
                        name="color"
                        label="Color"
                        type="color"
                        variant="filled"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        error={formik.touched.color && Boolean(formik.errors.color)}
                        helperText={formik.touched.color && formik.errors.color}
                    />
                    <Campo
                        fullWidth
                        margin="normal"
                        id="codigo"
                        name="codigo"
                        label="Código"
                        variant="filled"
                        value={formik.values.codigo}
                        onChange={formik.handleChange}
                        error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                        helperText={formik.touched.codigo && formik.errors.codigo}
                    />
                    <Campo
                        fullWidth
                        margin="normal"
                        id="imagenUrl"
                        name="imagenUrl"
                        label="URL de la Imagen"
                        variant="filled"
                        value={formik.values.imagenUrl}
                        onChange={formik.handleChange}
                        error={formik.touched.imagenUrl && Boolean(formik.errors.imagenUrl)}
                        helperText={formik.touched.imagenUrl && formik.errors.imagenUrl}
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
                        <BotonLink tipo='lineas' color="#cfcfcf" to='../video'>
                            Nuevo Video
                        </BotonLink>
                    </GrupoBotones>
                </form>
                <Tabla db={artistas} columnas={columnas} actualizar={actualizar} eliminar={eliminarArtista} />
                </PrincipalContenido>
        </Principal>
    );
}
