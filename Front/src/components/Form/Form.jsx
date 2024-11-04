import React, { useState, useEffect } from "react";
import styles from "./form.module.scss";

export const Form = ({
  buttonText,
  handleSubmit,
  hero = {
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  },
  id,
}) => {
  const [formData, setFormData] = useState(hero);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (hero.images) {
      setImagePreviews(hero.images);
    }
  }, [hero.images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newFiles],
    }));

    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleDeleteImage = (image) => {
    setFormData((prevState) => {
      const newImages = prevState.images.filter((img) => img !== image);
      return { ...prevState, images: newImages };
    });

    setImagePreviews((prevPreviews) => {
      return prevPreviews.filter((preview) => preview !== image);
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, formData, id)}
      className={styles.formContainer}
    >
      <div className={styles.test}>
        <label>Nickname:</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
          placeholder="Type here"
        />
      </div>

      <div className={styles.test}>
        <label>Real Name:</label>
        <input
          type="text"
          name="real_name"
          value={formData.real_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.test}>
        <label>Origin Description:</label>
        <textarea
          name="origin_description"
          value={formData.origin_description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.test}>
        <label>Superpowers:</label>
        <textarea
          name="superpowers"
          value={formData.superpowers}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.test}>
        <label>Catch Phrase:</label>
        <input
          type="text"
          name="catch_phrase"
          value={formData.catch_phrase}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.test}>
        <label>Images:</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>

      <div className={styles.previews}>
        {imagePreviews.map((preview, index) => (
          <div className={styles.previewImageBlock} key={index}>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={() => handleDeleteImage(preview)}
            >
              X
            </button>
            <img
              src={preview}
              alt={`Preview ${index}`}
              className={styles.imagePreview}
            />
          </div>
        ))}
      </div>
      <button type="submit" className={styles.buttonSubmit}>
        {buttonText}
      </button>
    </form>
  );
};
