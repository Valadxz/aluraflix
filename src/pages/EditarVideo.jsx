import styled from "styled-components";
import {
  BotonLink,
  ContenidoParcial,
  FormBoton,
  GrupoBotones,
  BotonesSeparador,
} from "../components/UI/Estilos";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarVideo, obtenerVideo } from "../services/videos.services";
import { useEffect, useState, useContext } from "react";
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

const Selector = styled(FormControl)`
  .MuiSelect-select,
  .MuiSelect-select,
  .MuiFormLabel-root,
  .MuiSelect-iconFilled:focus {
    background-color: ${({ theme }) => theme.semioscuro} !important;
    color: ${({ theme }) => theme.texto} !important;
  }
  .MuiSelect-nativeInput,
  .MuiFormLabel-root {
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
  titulo: yup.string().required("El cambo es obligatorio"),
  link_video: yup
    .string()
    // .matches(
    //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //     'Ingrese una url valida.'
    // )
    .required("El cambo es obligatorio"),
  link_imagen: yup
    .string()
    // .matches(
    //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //     'Ingrese una url valida.'
    // )
    .required("El cambo es obligatorio"),
  artista: yup.string().required("El cambo es obligatorio"),
  descripcion: yup.string().required("El cambo es obligatorio"),
});

export function EditarVideo() {
  const datos = useContext(Contexto);
  const { artistas, recargar, valor } = datos;
  const { id } = useParams();
  const [video, setVideo] = useState();
  const [, setCargando] = useState(true);
  const navegacion = useNavigate();

  function actualizar() {
    recargar(valor + 1);
  }

  const formik = useFormik({
    initialValues: {
      titulo: video ? video.titulo : "",
      link_video: video ? video.link_video : "",
      link_imagen: video ? video.link_imagen : "",
      artista: video ? video.artista : "",
      descripcion: video ? video.descripcion : "",
    },
    enableReinitialize: true,
    validationSchema: esquemaDeValidacion,
    onSubmit: (values) => {
      //  console.log("Errores de validación:", formik.errors); // Para ver si hay errores en el formulario
        if (Object.keys(formik.errors).length === 0) {
          const { titulo, link_video, link_imagen, artista, descripcion } = values;
          actualizarVideo(id, { titulo, link_video, link_imagen, artista, descripcion })
            .then((respuesta) => {
             // console.log("Video actualizado correctamente:", respuesta);
              actualizar();
              navegacion("/video");
            })
            .catch((error) => {
              console.error("Error al actualizar el video:", error);
            });
        } else {
         // console.log("Formulario con errores, no se envía.");
        }
      }
      
  });

  useEffect(() => {
    async function llamar() {
      const respuesta = await obtenerVideo(id);
      setVideo(respuesta);
      //console.log("Video cargado:", respuesta); // Verificar si los datos se cargan correctamente
      setCargando(false);
    }
    llamar();
  }, [id]);

  return (
    <Principal>
      <PrincipalContenido>
        <PrincipalTitulo>Editar Video</PrincipalTitulo>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Campo
            fullWidth
            margin="normal"
            id="titulo"
            name="titulo"
            label="Titulo"
            variant="filled"
            value={formik.values.titulo}
            onChange={formik.handleChange}
            error={formik.touched.titulo && Boolean(formik.errors.titulo)}
            helperText={formik.touched.titulo && formik.errors.titulo}
          />
          <Campo
            fullWidth
            margin="normal"
            id="link_video"
            name="link_video"
            label="Enlace de video"
            variant="filled"
            value={formik.values.link_video}
            onChange={formik.handleChange}
            error={
              formik.touched.link_video && Boolean(formik.errors.link_video)
            }
            helperText={formik.touched.link_video && formik.errors.link_video}
          />
          <Campo
            fullWidth
            margin="normal"
            id="link_imagen"
            name="link_imagen"
            label="Enlace de imagen"
            variant="filled"
            value={formik.values.link_imagen}
            onChange={formik.handleChange}
            error={
              formik.touched.link_imagen && Boolean(formik.errors.link_imagen)
            }
            helperText={formik.touched.link_imagen && formik.errors.link_imagen}
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
              onChange={(e) => formik.setFieldValue("artista", e.target.value)}
            >
              {artistas.map((artista, indice) => (
                <MenuItem value={artista.id} key={indice}>
                  {artista.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.artista && formik.errors.artista}
            </FormHelperText>
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
            error={
              formik.touched.descripcion && Boolean(formik.errors.descripcion)
            }
            helperText={formik.touched.descripcion && formik.errors.descripcion}
          />
          <GrupoBotones>
            <BotonesSeparador>
              <FormBoton color="#f90606" type="submit">
                Actualizar
              </FormBoton>

              <FormBoton
                color="#cfcfcf"
                type="reset"
                onClick={formik.resetForm}
              >
                Limpiar
              </FormBoton>
            </BotonesSeparador>
            <BotonLink tipo="lineas" color="#cfcfcf" to="../video">
              Regresar
            </BotonLink>
          </GrupoBotones>
        </form>
      </PrincipalContenido>
    </Principal>
  );
}
