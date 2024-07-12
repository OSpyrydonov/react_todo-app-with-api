import React from 'react';
import cn from 'classnames';

import { Todo, FilterType } from '../../types';

interface Props {
  todos: Todo[];
  filterType: FilterType;
  onChangeType: (type: FilterType) => void;
  onDelete: (todoId: number) => void;
}

export const Footer: React.FC<Props> = ({
  todos,
  filterType,
  onChangeType,
  onDelete,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.some(todo => todo.completed);

  function handleDeleteAllCompleted() {
    const allCompletedTodos = todos.filter(todo => todo.completed);

    allCompletedTodos.map(todo => onDelete(todo.id));
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(type => (
          <a
            key={type}
            href={`#/${type.toLowerCase()}`}
            className={cn('filter__link', {
              selected: filterType === type,
            })}
            data-cy={`FilterLink${type.charAt(0).toUpperCase()}${type.slice(1)}`}
            onClick={() => onChangeType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleDeleteAllCompleted}
        disabled={!completedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
