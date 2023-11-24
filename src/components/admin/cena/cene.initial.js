import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CeneApi from "../../../api/cene.api";

const CeneInitial = () => {
    const [cene, setCene] = useState([]);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [ceneToDelete, setCeneToDelete] = useState(null);

    const getCene = async () => {
        const response = await fetch("http://localhost:5000/cena");
        const data = await response.json();
        setCene(data.cene);
    };

    useEffect(() => {
        getCene();
    }, []);


    const brisanjeCene = (id) => {
        setCeneToDelete(id);
        setIsConfirmationOpen(true);
    };

    const confirmDelete = async () => {
        if (ceneToDelete !== null) {
          const response = await CeneApi().brisanjeCene(ceneToDelete);
          window.location.reload();
        }
        setIsConfirmationOpen(false);
      };
    
      const cancelDelete = () => {
        setCeneToDelete(null);
        setIsConfirmationOpen(false);
      };

      return (
        <>
        
        </>
      );




};

export default CeneInitial;