import React, { FormEvent, useContext, useEffect, useState, ChangeEvent } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';

import Layout from '../components/Layout';
import VideoContext from '../context/VideoContext';
import type { ProcessedVideo } from '../common/interfaces';
import type { Author, Category } from '../common/interfaces';
import { getAuthors } from '../services/authors';
import { getCategories } from '../services/categories';
import Spinner from '../components/Spinner';


const EditVideo: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ videoId: string }>();
  const { getVideo, updateVideo } = useContext(VideoContext);

  const [currentVideo, setCurrentVideo] = useState<ProcessedVideo | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [videoName, setVideoName] = useState<string>('');
  const [videoAuthor, setVideoAuthor] = useState<string>('');
  const [videoCategory, setVideoCategory] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchItems = async () => {
    try {
      const fetchedAuthors = await getAuthors();
      const fetchedCategories = await getCategories();

      setAuthors(fetchedAuthors);
      setCategories(fetchedCategories);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const video = getVideo(parseInt(params.videoId, 10));
    setCurrentVideo(video);
    fetchItems();
  }, [params.videoId]);

  const handlCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const options: HTMLOptionElement[] = Array.from(event.target.selectedOptions);
    setVideoCategory(options.map((option) => option.value));
  }

  const editVideoFn = (event: FormEvent) => {
    event.preventDefault();
    const updatedContent: any = {};

    if (videoName) {
      updatedContent.name = videoName;
    }

    if (videoAuthor !== '') {
      updatedContent.author = videoAuthor;
    }

    if (videoCategory.length !== 0) {
      updatedContent.categories = videoCategory;
    }

    updateVideo({
      ...currentVideo,
      ...updatedContent
    });
    history.push('/');
  }

  return (
    <Layout>
      <h2>Edit Video: {currentVideo?.name}</h2>
      <hr />
      { isLoading ? <Spinner /> : (
        <form onSubmit={editVideoFn}>
          <div className="formGroup">
            <label htmlFor="videoName">Video name</label>
            <input name="videoName" id="videoName" placeholder="Video Name" onChange={({ target }) => setVideoName(target.value)} defaultValue={currentVideo?.name} />
          </div>

          <div className="formGroup">
            <label htmlFor="videoAuthor">Video author</label>
            <select defaultValue={currentVideo?.author} name="videoAuthor" id="videoAuthor" onChange={({ target }) => setVideoAuthor(target.value)}>
              <option disabled value={0}>Select one</option>
              {authors.map(author => (
                <option value={author.name} key={author.id}>{author.name}</option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="videoCategory">Video category</label>
            <select defaultValue={currentVideo?.categories || []} name="videoCategory" id="videoCategory" onChange={handlCategoryChange} multiple>
              {categories.map(category => {
                return (
                  <option value={category.name} key={category.id}>{category.name}</option>
                )
              })}
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

export default EditVideo;