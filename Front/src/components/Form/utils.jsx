export const handleCreateSubmit = async (e, formData) => {
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
  } catch (error) {
    console.error('Помилка в створені супергероя:', error);
  }

  window.location.reload()
};


// export const handleUpdateSubmit = async (e, formData, heroId) => {
//   e.preventDefault();

//   const data = new FormData();
  
//   Object.entries(formData).forEach(([key, value]) => {
//     if (key === 'images') {
//       data.append(key, JSON.stringify(value));
//     } else {
//       data.append(key, value);
//     }
    
//     console.log("VALUE", value);
//   });

//   for (const [key, value] of data.entries()) {
//     console.log(`${key}: ${value}`);
//   }

//   try {
//     const response = await fetch(`http://localhost:3005/heroes/${heroId}`, {
//       method: 'PATCH',
//       body: data,
//     });

//     if (!response.ok) {
//       throw new Error('Немає відповіді');
//     }

//     const result = await response.json();
//     console.log('Супергероя оновлено:', result);
//   } catch (error) {
//     console.error('Помилка в оновленні супергероя:', error);
//   }

// };

export const handleUpdateSubmit = async (e, formData, heroId) => {
  e.preventDefault();

  const data = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'images') {
      value.forEach((image) => {
        if (typeof image === "string") {
          data.append('existingImages', image); // Додаємо існуючі посилання без JSON.stringify
        } else {
          data.append(key, image); // Нові файли залишаються без змін
        }
      });
    } else {
      data.append(key, value);
    }
  });

  for (const [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
  }

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
  } catch (error) {
    console.error('Помилка в оновленні супергероя:', error);
  }

};



