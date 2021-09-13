import React, { forwardRef, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ADD_POKEMON_COLLECTION } from "../../../service/graphql/pokemon/mutations";
import { checkOwnedPokemonName } from "../../../service/util/index";
import { pokemonCollections } from "../../../service/graphql/pokemon/reactiveVariable";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  IconButton,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "20px 30px",
  },
  inputName: {
    textAlign: "left",
    width: "100%",
    margin: "20px 0 30px",
  },
  closeModal: {
    textAlign: "right",
  },
}));

const FormAddPokemon = forwardRef(({ pokemon, handleOpenModal }, ref) => {
  const classes = useStyles();
  const history = useHistory();
  const [modalStyle] = useState(getModalStyle);

  const allCollection = useReactiveVar(pokemonCollections);
  const [validName, setValidName] = useState(true);
  const [pokemonName, setPokemonName] = useState("");

  const handleChangeInputName = (e) => {
    let isExist = checkOwnedPokemonName(
      pokemon.name,
      e.target.value,
      true,
      allCollection
    );
    setPokemonName(e.target.value);
    if (isExist.length > 0) setValidName(false);
    else setValidName(true);
  };

  const savePokemon = (pokemon) => () => {
    handleOpenModal(false);
    ADD_POKEMON_COLLECTION(pokemonName, pokemon);
    setTimeout(() => history.push("/collections"), 500);
  };

  const handleOnCloseModal = (e) => {
    setPokemonName("");
    setValidName(true);
    handleOpenModal(false);
  };

  return (
    <div ref={ref} style={modalStyle} className={classes.paper}>
      <form noValidate autoComplete="off">
        <div>
          <div className={classes.closeModal}>
            <IconButton aria-label="delete" onClick={handleOnCloseModal}>
              <ClearIcon color="primary" />
            </IconButton>
          </div>
          <Typography variant="h6" color="secondary">
            Give Your Pokemon Name
          </Typography>
        </div>
        <div>
          <FormControl
            error={!validName}
            required={true}
            color="secondary"
            className={classes.inputName}
          >
            <InputLabel htmlFor="pokemon-detail-add-modal__frm-name">
              Name
            </InputLabel>
            <Input
              id="pokemon-detail-add-modal__frm-name"
              value={pokemonName}
              onChange={handleChangeInputName}
              aria-describedby="pokemon-detail-add-modal__frm-name-error"
            />
            {(!validName || !pokemonName) && (
              <FormHelperText id="pokemon-detail-add-modal__frm-name-error">
                {pokemonName.length === 0
                  ? "This Field is Required"
                  : `Pokemen with ${pokemonName} as Name is Already Exist!`}
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={!validName || !pokemonName}
          onClick={savePokemon(pokemon)}
        >
          SAVE POKEMON
        </Button>
      </form>
    </div>
  );
});

export default FormAddPokemon;
