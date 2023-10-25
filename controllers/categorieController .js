import Categorie from '../models/categorieModel.js';
import mongoose from 'mongoose';

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.status(200).json(
      { data: categories,
        message:'success',
        status : 200
      }
    );



  } catch (error) {
    res.status(400).json( 
      {
       data: null,
       message:error.message,
       status : 400
      }
    );
  }
};

// Get a single categorie
const getCategorie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json( 
      { data: null,
        message:'not found',
        status : 404
      }
    );
  }
  const categorie = await Categorie.findById(id);

  if (!categorie) {
    return res.status(404).json(
      { data: null,
        message:'not found',
        status : 404
      }
    );
  }

  res.status(200).json(
    { data: categorie,
      message:'succes',
      status : 200
    }
  );
}

// Create a new categorie
const createCategorie = async (req, res) => {
  const { name, telephone, logo, location, website_link, email } = req.body;
  try {
    const categorie = await Categorie.create({ name, telephone, logo, location, website_link, email });

    res.json(
      { data: categorie,
        message:'succes',
        status : 200
      }
    );
  } catch (err) {
    res.status(400).json(
      { data: null,
        message:err.message,
        status : 400
      }
    );
  }
};

// Update a categorie 
const updateCategorie = async(req, res) => { 
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(
      { data: null,
        message:'not found',
        status : 404
    });
  }
  const categorie = await Categorie.findByIdAndUpdate({_id:id},{...req.body});

  if (!categorie) {
    return res.status(404).json(

     {  data: null,
        message:'not found',
        status : 404
      }
    );
  }

  res.status(200).json(
      { data: categorie,
        message:'succes',
        status : 200
      }

  );
};





// Delete a categorie
const deleteCategorie = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(
      { data: null,
        message:'not found',
        status : 404
      }
    );
  }
  const categorie = await Categorie.findByIdAndDelete(id);

  if (!categorie) {
    return res.status(404).json(
      { data: null,
        message:'not found',
        status : 404
      }
    );
  }

  res.status(200).json(

    { data: categorie,
      message:'success',
      status : 200
    }

  );
};


// Export functions
export { createCategorie, getAllCategories, getCategorie, deleteCategorie, updateCategorie };
