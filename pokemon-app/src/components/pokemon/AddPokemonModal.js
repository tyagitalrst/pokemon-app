import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Modal } from "@material-ui/core";
import { ADD_POKEMON_COLLECTION } from "../../service/graphql/pokemon/mutations";

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
    padding: theme.spacing(2, 4, 3),
  },
}));

function AddPokemonModal({ pokemon }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

  const handleOpenModal = (val) => () => {
    setOpenModal(val);
  };

  const handleChangeInputName = (e) => {
    setPokemonName(e.target.value);
  };

  const savePokemon = (pokemon) => () => {
    setOpenModal(false);
    ADD_POKEMON_COLLECTION(pokemonName, pokemon);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          value={pokemonName}
          onChange={handleChangeInputName}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={savePokemon(pokemon)}
        >
          SAVE POKEMON
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <div className="pokemon-detail__btn-catch">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal(true)}
        >
          CATCH
        </Button>
      </div>
      <div>
        <Modal
          open={openModal}
          onClose={handleOpenModal(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    </div>
  );
}

export default AddPokemonModal;
