interface Props {
  filterBy: string;
  filterValue: string;
  setFilterBy: (value: string) => void;
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
          <span className='mx-2'>
            {!filterBy || filterBy === 'all'
              ? 'All'
              : filterBy === 'artist'
                ? 'Artist'
                : 'Title'}
          </span>
        </button>
        <ul className='dropdown-menu'>
          <li
            className='dropdown-item'
            onClick={() => {
              setFilterValue('');
              setFilterBy('all');
            }}
          >
            All
          </li>
          <li
            className='dropdown-item'
            onClick={() => {
              setFilterValue('');
              setFilterBy('artist');
            }}
          >
            Artist
          </li>
          <li
            className='dropdown-item'
            onClick={() => {
              setFilterValue('');
              setFilterBy('title');
            }}
          >
            Title
          </li>
        </ul>
        <input
          disabled={filterBy === 'all' ? true : false}
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
