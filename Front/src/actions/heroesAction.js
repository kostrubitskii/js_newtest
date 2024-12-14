export const fetchHeroesAction = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3005/heroes");
      const data = await response.json();
      dispatch({
        type: "FETCH_HEROES",
        payload: data,
      });
    } catch (error) {
      console.error("Помилка завантаження героїв:", error);
    }
  };
};


export const addHeroAction = (e, formData) => {
  return async (dispatch) => {
    try {
      e.preventDefault();

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => {
            data.append("images", file);
          });
        } else {
          data.append(key, value);
        }
      });

      const response = await fetch("http://localhost:3005/heroes", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Немає відповіді");
      }

      const result = await response.json();
      console.log("Супергероя створено:", result);

      dispatch({
        type: "ADD_HERO",
        payload: result,
      });
    } catch (error) {
      console.error("Помилка створення героя:", error);
    }
  };
};

export const deleteHeroAction = (id, navigate) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3005/heroes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/");
      }
      dispatch({
        type: "DELETE_HERO",
        payload: id,
      });
    } catch (error) {
      console.error("Помилка видалення героя:", error);
    }
  };
};

export const updateHeroAction = (e, formData, heroId) => {
  return async (dispatch) => {
    try {
      e.preventDefault();

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image) => {
            if (typeof image === "string") {
              data.append("existingImages", image);
            } else {
              data.append(key, image);
            }
          });
        } else {
          data.append(key, value);
        }
      });

      const response = await fetch(`http://localhost:3005/heroes/${heroId}`, {
        method: "PATCH",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Немає відповіді");
      }

      const result = await response.json();
      console.log("Супергероя оновлено:", result);
    } catch (error) {
      console.error("Помилка в оновленні супергероя", error);
    }
  };
};
