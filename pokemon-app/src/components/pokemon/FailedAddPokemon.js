import React, { useState, forwardRef } from "react";
import { letterCapitalize } from "../../service/util";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Pokeball from "../../assets/images/pokeball.png";

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
  closeModal: {
    textAlign: "right",
  },
  messageFailed: {
    margin: 30,
  },
  pokeballImage: {
    "& img": {
      width: 100,
    },
  },
}));

const FailedAddPokemon = forwardRef(({ pokemon, handleOpenModal }, ref) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleOnCloseModal = (e) => {
    handleOpenModal(false);
  };
  return (
    <div ref={ref} style={modalStyle} className={classes.paper}>
      <div className={classes.closeModal}>
        <IconButton aria-label="delete" onClick={handleOnCloseModal}>
          <ClearIcon color="primary" />
        </IconButton>
      </div>
      <div className={classes.pokeballImage}>
        <img src={Pokeball} alt="pokeball" />
      </div>
      <div>
        <Typography
          variant="h6"
          color="secondary"
          className={classes.messageFailed}
        >
          {`Sorry, you can't catch ${letterCapitalize(
            pokemon.name
          )} right now. Please, try again later!`}
        </Typography>
      </div>
    </div>
  );
});

export default FailedAddPokemon;
