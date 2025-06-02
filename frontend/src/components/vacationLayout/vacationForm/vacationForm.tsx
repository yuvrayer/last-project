import React, { useState } from 'react';

const VacationForm = ({ onFilterChange }: { onFilterChange: (filter: string) => void }) => {
  const [selectedVacations, setSelectedVacations] = useState<{
    followed: boolean;
    notStarted: boolean;
    active: boolean;
  }>({
    followed: false,
    notStarted: false,
    active: false,
  });

  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked && !selectedVacations[name as keyof typeof selectedVacations]) {
      // מנקים את כל הסינונים ומסמנים רק את אחד שנבחר
      const newSelection = {
        followed: false,
        notStarted: false,
        active: false,
        [name]: true, // מסמנים את הסינון שנבחר
      };

      setSelectedVacations(newSelection);
      onFilterChange(name); // שולחים את הסינון שנבחר לאפקטיביות

      setError('');
    } else {
      // אם הסינון מבוטל, לא עושים כלום (לא ממלאים את ה-state)
      setSelectedVacations({ ...selectedVacations, [name]: false });
      onFilterChange(''); // אם בוטל, שולחים פילטר ריק
      setError('');
    }
  };

  return (
    <div className="Checkboxes">
      <label>
        <input
          type="checkbox"
          name="followed"
          checked={selectedVacations.followed}
          onChange={handleChange}
        />
        Followed vacations
      </label>
      <label>
        <input
          type="checkbox"
          name="notStarted"
          checked={selectedVacations.notStarted}
          onChange={handleChange}
        />
        Vacations that haven't started
      </label>
      <label>
        <input
          type="checkbox"
          name="active"
          checked={selectedVacations.active}
          onChange={handleChange}
        />
        Active vacations
      </label>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VacationForm;