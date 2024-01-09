import Favorite from "../models/favoriteModel.js";
import User from "../models/userModel.js";
import Design from "../models/designModel.js";

// Get all favorites
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      include: [
        { model: Design, as: "Design" },
        { model: User, as: "User" },
      ],
    });
 
    return res.status(200).json({
      data: favorites,
      message: "success",
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching favorites:", error)
    res.status(400).json({
      data: null,
      message: error.message,
      status: 400,
    });
  }
};


// Get a single favorite by ID
export const getFavorite = async (req, res) => {
  const id = req.params.id;
  try {
    const favorite = await Favorite.findByPk(id, {
      include: [
        { model: Design, as: "Design" },
        { model: User, as: "User" },
      ],
    });
    if (favorite) {
      return res.status(200).json({
        data: favorite,
        message: "success",
        status: 200,
      });
    } else {
      res.status(404).json({
        data: null,
        message: `Favorite not found`,
        status: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
};

// Get favorites chosen by a single user
export const getFavoritesByUser = async (req, res) => {
  const {UserId} = req.params;
  console.log("user", UserId);
  try {
    const favorites = await Favorite.findAll({
      where: { UserId: UserId }, 
      include: [Design,User]
      
    });
    return res.status(200).json({
      data: favorites,
      message: "success",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      status: 400,
    });
  }
};


// Create Favorite
export const createFavorite = async (req, res) => {
  const { DesignId, UserId } = req.body;
  try {
    const favorite = await Favorite.create({ DesignId, UserId });

    res.status(201).json({
      data: favorite,
      message: "Favorite created successfully!",
      status: 201,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Failed to create favorite",
      status: 500,
      error: true,
    });
  }
};

// // Update an existing Favorite
// export const updateFavorite = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const existingFavorite = await Favorite.findByPk(id);
//     if (!existingFavorite) {
//       return res.status(404).json({
//         data: null,
//         message: `Favorite with Id: ${id} not found!`,
//         status: 404,
//       });
//     }
//     await Favorite.update(
//       { ...req.body },
//       {
//         where: { id },
//       }
//     );

//     const updatedFavorite = await Favorite.findByPk(id);
//     if (updatedFavorite) {
//       return res.status(200).json({
//         data: updatedFavorite,
//         message: `Favorite with ID: ${id} updated successfully!`,
//         status: 200,
//       });
//     } else {
//       return res.status(500).json({
//         data: null,
//         message: `Failed to retrieve updated Favorite with ID: ${id}`,
//         status: 500,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       data: null,
//       message: error.message,
//       status: 500,
//     });
//   }
// };

// Delete Favorite
export const deleteFavorite = async (req, res) => {
  const id = req.params.id;
  try {
    const favorite = await Favorite.findByPk(id);
    if (!favorite) {
      return res.status(404).json({
        message: "No favorite Found!",
        status: 404,
        error: true,
      });
    }
    const deletedFavorite = await Favorite.destroy({ where: { id } });
    if (deletedFavorite) {
      return res.status(200).json({
        message: `Favorite is deleted!`,
        status: 200,
        error: false,
      });
    } else {
      res.status(400).json({
        message: `Failed to delete favorite!`,
        status: 400,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500,
      error: true,
    });
  }
};

export const getLikedDesignsByid = async (req, res) => {

  const { id } = req.params

  try{
    const likes = await Favorite.findAll({ where:{DesignId: id}});
    res.status(200).json({
      data: likes,
      number: likes.length
      
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500,
      error: true,
    });
  }
}
export default Favorite;
