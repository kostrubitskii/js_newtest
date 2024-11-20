export const handleCreateSubmit = async (e, formData, updateHeroes) => {
  e.preventDefault();

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'images') {
      value.forEach((file) => {
        data.append('images', file);
      });
    } else {
      data.append(key, value);
    }
  });

  try {
    const response = await fetch('http://localhost:3005/heroes', {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      throw new Error('Немає відповіді');
    }

    const result = await response.json();
    console.log('Супергероя створено:', result);

    if (updateHeroes) {
      updateHeroes(result);
    }

  } catch (error) {
    console.error('Помилка в створенні супергероя:', error);
  }

};

export const handleUpdateSubmit = async (e, formData, heroId, updateHeroes) => {
  e.preventDefault();

  const data = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'images') {
      value.forEach((image) => {
        if (typeof image === "string") {
          data.append('existingImages', image);
        } else {
          data.append(key, image);
        }
      });
    } else {
      data.append(key, value);
    }
  });

  try {
    const response = await fetch(`http://localhost:3005/heroes/${heroId}`, {
      method: 'PATCH',
      body: data,
    });

    if (!response.ok) {
      throw new Error('Немає відповіді');
    }

    const result = await response.json();
    console.log('Супергероя оновлено:', result);
  
    if (updateHeroes) {
      updateHeroes(result);
    }

  } catch (error) {
    console.error('Помилка в оновленні супергероя:', error);
  }
};



