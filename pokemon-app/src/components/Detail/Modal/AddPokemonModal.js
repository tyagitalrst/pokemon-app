import React, { createRef, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core";
import FormAddPokemon from "./FormAddPokemon";
import FailedAddPokemon from "./FailedAddPokemon";

const useStyles = makeStyles((theme) => ({
  catchButton: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
}));

function AddPokemonModal({ pokemon }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const refModal = createRef();

  const handleOpenModal = (val) => () => {
    setOpenModal(val);
  };

  const handleOnClickCatchButton = () => {
    const randomVal = Math.random();
    if (randomVal >= 0.5) setShowFormAdd(true);
    else setShowFormAdd(false);
    setOpenModal(true);
  };

  return (
    <div>
      <div className="pokemon-detail__btn-catch">
        <Button
          className={classes.catchButton}
          variant="contained"
          color="primary"
          onClick={handleOnClickCatchButton}
        >
          CATCH
        </Button>
      </div>
      <div>
        <Modal
          open={openModal}
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          onClose={handleOpenModal(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {showFormAdd ? (
            <FormAddPokemon
              ref={refModal}
              pokemon={pokemon}
              handleOpenModal={setOpenModal}
            />
          ) : (
            <FailedAddPokemon
              pokemon={pokemon}
              ref={refModal}
              handleOpenModal={setOpenModal}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}

export default AddPokemonModal;
