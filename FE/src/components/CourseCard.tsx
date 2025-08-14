import { useEffect, useState } from 'react';
import { fetchTips, addTip, deleteTip, Tip } from '../services/api';

type Props = {
  courseId: string;
  courseName: string;
};

export default function CourseCard({ courseId, courseName }: Props) {
  const [tips, setTips] = useState<Tip[]>([]);
  const [newTip, setNewTip] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Fetch tips on mount
  useEffect(() => {
    const loadTips = async () => {
      try {
        const data = await fetchTips(courseId as any);
        // וודא שתמיד יש מערך, אפילו ריק
        setTips(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load tips', err);
      }
    };
    loadTips();
  }, [courseId]);

  const handleAddTip = async () => {
    if (!newTip.trim()) return;
    try {
      const tip = await addTip(courseId as any, newTip);
      setTips((prev) => [...prev, tip]);
      setNewTip('');
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add tip', err);
    }
  };

  const handleDeleteTip = async (id: number) => {
    try {
      await deleteTip(id);
      setTips((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete tip', err);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>{courseName}</h3>

      <button onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? 'Cancel' : 'Add Tip'}
      </button>

      {showForm && (
        <div style={styles.form}>
          <textarea
            value={newTip}
            onChange={(e) => setNewTip(e.target.value)}
            placeholder="Write your tip..."
            style={{ width: '100%' }}
          />
          <button onClick={handleAddTip}>Save</button>
        </div>
      )}

      <ul>
        {tips.map((tip) => (
          <li key={tip.id} style={styles.tipItem}>
            {tip.content}
            <button onClick={() => handleDeleteTip(tip.id)} style={styles.deleteBtn}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '10px',
    width: '22%',
    minWidth: '200px',
    margin: '1rem',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    backgroundColor: 'lightblue', 
    color: 'black', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  form: {
    marginTop: '0.5rem',
    marginBottom: '1rem',
  },
  tipItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.3rem',
  },
  deleteBtn: {
    marginLeft: '1rem',
    background: 'tomato',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};
