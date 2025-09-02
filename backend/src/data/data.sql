-- 1. BẢNG CATEGORIES (Danh mục công việc)
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  color VARCHAR(7),  -- Mã màu HEX
  description TEXT
);

-- 2. BẢNG PRIORITIES (Mức độ ưu tiên)
CREATE TABLE priorities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  level INTEGER NOT NULL UNIQUE,  -- 1=High, 2=Medium, 3=Low
  color VARCHAR(7)  -- Hex color code
);

-- 3. BẢNG TASKS (Nhiệm vụ chính)
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  priority_id INTEGER REFERENCES priorities(id) ON DELETE SET NULL,
  deadline DATE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  has_reminders BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. BẢNG SUBTASKS (Nhiệm vụ con)
CREATE TABLE subtasks (
  id SERIAL PRIMARY KEY,
  task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,  -- Để sắp xếp thứ tự
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. BẢNG TAGS (Nhãn phân loại)
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- 6. BẢNG TASK_TAGS (Liên kết Many-to-Many giữa Tasks và Tags)
CREATE TABLE task_tags (
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, tag_id)
);

-- 7. BẢNG REMINDERS (Nhắc nhở)
CREATE TABLE reminders (
  id SERIAL PRIMARY KEY,
  task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  remind_at TIMESTAMP NOT NULL,
  message TEXT,
  type VARCHAR(50) DEFAULT 'notification' CHECK (type IN ('notification', 'email', 'sms')),
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index cho các truy vấn thường dùng
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_category ON tasks(category_id);
CREATE INDEX idx_tasks_priority ON tasks(priority_id);
CREATE INDEX idx_tasks_deadline ON tasks(deadline);
CREATE INDEX idx_subtasks_task ON subtasks(task_id);
CREATE INDEX idx_task_tags_task ON task_tags(task_id);
CREATE INDEX idx_task_tags_tag ON task_tags(tag_id);
CREATE INDEX idx_reminders_task ON reminders(task_id);
CREATE INDEX idx_reminders_time ON reminders(remind_at);

-- Insert Categories
INSERT INTO categories (name, color, description) VALUES 
('General', '#607D8B', 'Các công việc chung'),
('Work', '#2196F3', 'Công việc liên quan đến nghề nghiệp'),
('Personal', '#4CAF50', 'Công việc cá nhân'),
('Study', '#FF9800', 'Học tập và nghiên cứu'),
('Health', '#E91E63', 'Sức khỏe và thể thao'),
('Family', '#9C27B0', 'Gia đình và bạn bè');

-- Insert Priorities
INSERT INTO priorities (name, level, color) VALUES 
('High Priority', 1, '#FF4444'),
('Medium Priority', 2, '#FFA500'),
('Low Priority', 3, '#4CAF50');

-- Insert Tags
INSERT INTO tags (name) VALUES 
('urgent'),
('important'),
('quick'),
('meeting'),
('deadline'),
('learning'),
('shopping'),
('health');
