/**
 * Select Component
 * Dropdown selection component with search and accessibility
 * Designed for oil & gas industry data selection
 */

import React, { useState, useRef, useEffect } from 'react';
import { SelectContainer, SelectButton, SelectDropdown, SelectOption, SelectSearch } from './Select.styles';

export interface SelectOptionType {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOptionType[];
  value?: string | number;
  onChange?: (value: string | number, option: SelectOptionType) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'data-testid'?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchable = false,
  disabled = false,
  error,
  label,
  helperText,
  size = 'md',
  className,
  'data-testid': testId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(option => option.value === value);
  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          const option = filteredOptions[focusedIndex];
          if (!option.disabled) {
            handleSelect(option);
          }
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
        break;
    }
  };

  const handleSelect = (option: SelectOptionType) => {
    if (!option.disabled) {
      onChange?.(option.value, option);
      setIsOpen(false);
      setSearchTerm('');
      setFocusedIndex(-1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFocusedIndex(-1);
  };

  return (
    <SelectContainer className={className} data-testid={testId}>
      {label && (
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          color: error ? '#f44336' : '#374151',
          marginBottom: '0.25rem',
          display: 'block'
        }}>
          {label}
        </label>
      )}
      
      <div ref={containerRef} style={{ position: 'relative' }}>
        <SelectButton
          type="button"
          size={size}
          disabled={disabled}
          hasError={!!error}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={label || placeholder}
        >
          <span style={{ 
            color: selectedOption ? '#212121' : '#9ca3af',
            flex: 1,
            textAlign: 'left'
          }}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              color: '#6b7280'
            }}
          >
            <path d="M6 9l4 4 4-4" />
          </svg>
        </SelectButton>

        {isOpen && (
          <SelectDropdown size={size}>
            {searchable && (
              <SelectSearch
                ref={searchRef}
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            )}
            
            {filteredOptions.length === 0 ? (
              <div style={{
                padding: '0.75rem 1rem',
                color: '#6b7280',
                textAlign: 'center',
                fontSize: '0.875rem'
              }}>
                No options found
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <SelectOption
                  key={option.value}
                  size={size}
                  disabled={option.disabled ?? false}
                  focused={index === focusedIndex}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {option.label}
                </SelectOption>
              ))
            )}
          </SelectDropdown>
        )}
      </div>

      {error && (
        <div style={{
          fontSize: '0.875rem',
          color: '#f44336',
          marginTop: '0.25rem'
        }}>
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          marginTop: '0.25rem'
        }}>
          {helperText}
        </div>
      )}
    </SelectContainer>
  );
};

export default Select;
