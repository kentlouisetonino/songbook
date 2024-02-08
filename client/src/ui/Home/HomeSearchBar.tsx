import { useMemo } from 'react';
import { FilterBy, FilterByLabel } from 'src/types/song';

interface Props {
  filterBy: FilterBy;
  filterValue: string;
  setFilterBy: (value: FilterBy) => void;
  setFilterValue: (value: string) => void;
  onFilterBySearch: () => void;
}

export default function HomeSearchBar({
  filterBy,
  filterValue,
  setFilterBy,
  setFilterValue,
  onFilterBySearch
}: Props) {
  const searchFilterBy = useMemo(() => {
    switch (filterBy) {
      case FilterBy.Artist:
        return FilterByLabel[FilterBy.Artist];
      case FilterBy.Title:
        return FilterByLabel[FilterBy.Title];
      default:
        return FilterByLabel[FilterBy.All];
    }
  }, [filterBy]);

  return (
    <div className='mx-3'>
      <div className='input-group mb-3'>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={() => onFilterBySearch()}
        >
          Search
        </button>
        <button
          type='button'
          className='btn btn-outline-secondary dropdown-toggle dropdown-toggle-split'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <span className='mx-2'>{searchFilterBy}</span>
        </button>
        <ul className='dropdown-menu'>
          <li
            className='dropdown-item'
            onClick={() => {
              setFilterValue('');
              setFilterBy(FilterBy.All);
            }}
          >
            All
          </li>
          <li
            className='dropdown-item'
            onClick={() => {
              setFilterValue('');
              setFilterBy(FilterBy.Artist);
            }}
          >
            Artist
          </li>
          <li
            className='dropdown-item'
            onClick={() => {
              setFilterValue('');
              setFilterBy(FilterBy.Title);
            }}
          >
            Title
          </li>
        </ul>
        <input
          disabled={filterBy === FilterBy.All}
          type='text'
          className='form-control'
          aria-label='Text input with segmented dropdown button'
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
    </div>
  );
}
