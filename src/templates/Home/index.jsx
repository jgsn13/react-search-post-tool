import './style.css';

import { useCallback, useEffect, useState } from 'react';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = posts.length >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <section className='container'>
      <div className='search-container'>
        <SearchInput searchValue={searchValue} handleChange={handleChange} />
        {!!searchValue && (
          <>
            <p className='search-value'>
              <b>Search value:</b> <i>{searchValue}</i>
            </p>
            {filteredPosts.length > 0 && (
              <>
                <p className='search-results'>
                  <b>Results:</b> <i>{filteredPosts.length}</i>
                </p>
              </>
            )}
          </>
        )}
      </div>
      {(filteredPosts.length > 0 && <Posts posts={filteredPosts} />) || (
        <p className='no-post'>No post found</p>
      )}
      <div className='button-container'>
        {!searchValue && (
          <Button
            text='Load more posts'
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};
