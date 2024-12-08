import styled from "styled-components";
import { ContenidoParcial, FormBoton, BotonLink, GrupoBotones, BotonesSeparador } from "../components/UI/Estilos";
import * as yup from 'yup';
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarArtista, obtenerArtista } from "../services/artistas.service";
import { useEffect } from "react";
import { useContext } from "react";
import { Contexto } from "../Contexto";

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
    imagenUrl: yup
        .string()
        .required("El campo es obligatorio"),
    codigo: yup
        .number()
        .typeError('Solo caracteres numericos')
        .required('El campo es obligatorio'),
});

export function EditarArtista() {
    const { id } = useParams();
    const [artista, setartista] = useState();
    const datos = useContext(Contexto)
    const { valor, recargar } = datos;
    const navegacion = useNavigate();

    function actualizar() {
        recargar(valor + 1);
    }

    const formik = useFormik({
        initialValues: {
            nombre: artista ? artista.nombre : '',
            descripcion: artista ? artista.descripcion : '',
            color: artista ? artista.color : '#dcdcdc',
            imagenUrl: artista ? artista.imagenUrl : '',
            codigo: artista ? artista.codigo : '',
        },
        enableReinitialize: true,
        validationSchema: esquemaDeValidacion,
        onSubmit: (values) => {
            const { nombre, descripcion, color, imagenUrl, codigo } = values
            actualizarArtista(id, {
                nombre,
                descripcion,
                color,
                imagenUrl,
                codigo
            })
                .then(() => {
                    actualizar()
                    navegacion('/artista')
                });
        },
    });

    useEffect(() => {
        async function llamar() {
            const respuesta = await obtenerArtista(id);
            setartista(respuesta)
        }
        llamar()
    }, [id])

    return (
        <Principal>
            <PrincipalContenido>
                <PrincipalTitulo>Nuevo artista</PrincipalTitulo>
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
                        id="imagenUrl"
                        name="imagenUrl"
                        label="ImagenUrl"
                        variant="filled"
                        value={formik.values.imagenUrl}
                        onChange={formik.handleChange}
                        error={formik.touched.imagenUrl && Boolean(formik.errors.imagenUrl)}
                        helperText={formik.touched.imagenUrl && formik.errors.imagenUrl}
                    />
                    <Campo
                        fullWidth
                        margin="normal"
                        id="codigo"
                        name="codigo"
                        label="Codigo"
                        variant="filled"
                        value={formik.values.codigo}
                        onChange={formik.handleChange}
                        error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                        helperText={formik.touched.codigo && formik.errors.codigo}
                    />
                    <GrupoBotones >
                        <BotonesSeparador >
                            <FormBoton color="#f90606" type="submit">
                                Actualizar
                            </FormBoton>
                            <FormBoton color="#cfcfcf" type="reset" onClick={formik.resetForm}>
                                Limpiar
                            </FormBoton>
                        </BotonesSeparador>
                        <BotonLink tipo='lineas' color="#cfcfcf" to='../artista' >
                            Regresar
                        </BotonLink>
                    </GrupoBotones>
                </form>
            </PrincipalContenido>
        </Principal>
    );
}