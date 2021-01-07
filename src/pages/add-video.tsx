import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Layout from '../components/Layout';
import type { Author, Category } from '../common/interfaces';
import { getAuthors } from '../services/authors';
import { getCategories } from '../services/categories';
import Spinner from '../components/Spinner';
import VideoContext from '../context/VideoContext';


const AddVideo: React.FC = () => {
  const history = useHistory();

  const [videoName, setVideoName] = useState<string>('');
  const [videoAuthor, setVideoAuthor] = useState<string>('');
  const [videoCategory, setVideoCategory] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const { addVideo, lastId } = useContext(VideoContext);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const fetchedAuthors = await getAuthors();
      const fetchedCategories = await getCategories();

      setAuthors(fetchedAuthors);
      setCategories(fetchedCategories);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handlCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const options: HTMLOptionElement[] = Array.from(event.target.selectedOptions);
    setVideoCategory(options.map((option) => option.value));
  }

  const addVideoFn = (event: FormEvent) => {
    event.preventDefault();

    if (!videoName) {
      setErrorMessage('Video name is required. Please provide "video name".');
      return;
    }

    if (videoAuthor === '') {
      setErrorMessage('Video author is required. Please select an author.');
      return;
    }

    if (videoCategory.length === 0) {
      setErrorMessage('Please select a category for the video.');
      return;
    }

    addVideo({
      id: lastId + 1,
      name: videoName,
      author: videoAuthor,
      categories: videoCategory
    });
    history.push('/');
  }

  return (
    <Layout>
      <h2>Add Video</h2>
      <hr />
      { isLoading ? <Spinner /> : (
        <form onSubmit={addVideoFn}>
          <div className="formGroup">
            <label htmlFor="videoName">Video name</label>
            <input name="videoName" value={videoName} id="videoName" placeholder="Video Name" onChange={({ target }) => setVideoName(target.value)} />
          </div>

          <div className="formGroup">
            <label htmlFor="videoAuthor">Video author</label>
            <select defaultValue={0} name="videoAuthor" id="videoAuthor" onChange={({ target }) => setVideoAuthor(target.value)}>
              <option disabled value={0}>Select one</option>
              {authors.map(author => (
                <option value={author.name} key={author.id}>{author.name}</option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="videoCategory">Video category</label>
            <select defaultValue={[]} name="videoCategory" id="videoCategory" onChange={handlCategoryChange} multiple>
              {categories.map(category => (
                <option value={category.name} key={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {errorMessage ? <span className="error">{errorMessage}</span> : null}
          <button className="submitVideo">Submit</button>
          <Link to="/">Cancel</Link>
        </form>
      )}
    </Layout>
  );
};

export default AddVideo;