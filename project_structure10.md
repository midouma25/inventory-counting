# Project Structure

```text
inventory-counting/
    ├── README.md
    ├── extract_code.py
    ├── project_structure.md
    ├── project_structure1.md
    ├── project_structure10.md
    ├── project_structure2.md
    ├── project_structure4.md
    ├── project_structure5.md
    ├── project_structure6.md
    ├── project_structure7.md
    ├── project_structure8.md
    ├── project_structure9.md
├── backend/
    ├── database.js
    ├── main.js
    ├── package.json
    ├── preload.js
├── frontend/
    ├── .oxlintrc.json
    ├── App.jsx
    ├── README.md
    ├── index.css
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    ├── assets/
    ├── public/
    ├── src/
        ├── App.jsx
        ├── i18n.js
        ├── index.css
        ├── main.jsx
        ├── assets/
        ├── components/
            ├── EndOfDay.jsx
            ├── ExpensesPieChart.jsx
            ├── UsersManagement.jsx
            ├── layout/
                ├── MainLayout.jsx
                ├── Sidebar.jsx
                ├── Topbar.jsx
            ├── pages/
                ├── Agenda.jsx
                ├── Attendance.jsx
                ├── Dashboard.jsx
                ├── Employees.jsx
                ├── Expenses.jsx
                ├── HR.jsx
                ├── Login.jsx
                ├── Payroll.jsx
                ├── Suppliers.jsx
            ├── ui/
                ├── Modal.jsx
            ├── utils/
        ├── locales/
            ├── ar/
                ├── translation.json
            ├── en/
                ├── translation.json
        ├── store/
            ├── attendanceStore.js
            ├── authStore.js
            ├── employeeStore.js
            ├── expenseStore.js
            ├── payrollStore.js
            ├── supplierStore.js
```


---

# Source Code

## `README.md`

```markdown
// Unable to read file (encoding).
```

---

## `extract_code.py`

```python
import os

# ==============================
# الإعدادات
# ==============================

OUTPUT_FILE = "project_structure10.md"
MAX_DEPTH = 3                 # أقصى عمق للشجرة
MAX_FILE_SIZE = 200 * 1024    # 200KB

IGNORE_DIRS = {
    ".git",
    ".github",
    ".idea",
    ".vscode",
    "node_modules",
    "__pycache__",
    ".venv",
    "venv",
    "env",
    "build",
    "dist",
    "release",
    "out",
    "target",
    "bin",
    "obj",
    "coverage",
    ".next"
}

IGNORE_FILES = {
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    ".gitignore",
    ".DS_Store",
    "Thumbs.db"
}

IGNORE_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif",
    ".svg", ".ico",
    ".pdf",
    ".zip", ".rar", ".7z",
    ".mp3", ".mp4", ".wav",
    ".exe", ".dll",
    ".pyc",
    ".log"
}

CODE_EXTENSIONS = {
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json",
    ".css",
    ".html",
    ".md",
    ".sql"
}


def language(ext):
    ext = ext.lower()

    if ext == ".py":
        return "python"

    if ext in [".js", ".jsx"]:
        return "javascript"

    if ext in [".ts", ".tsx"]:
        return "typescript"

    if ext == ".css":
        return "css"

    if ext == ".html":
        return "html"

    if ext == ".json":
        return "json"

    if ext == ".sql":
        return "sql"

    if ext == ".md":
        return "markdown"

    return "text"


def generate(directory):

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:

        ##################################################
        # Project Tree
        ##################################################

        f.write("# Project Structure\n\n")
        f.write("```text\n")

        for root, dirs, files in os.walk(directory):

            dirs[:] = sorted([d for d in dirs if d not in IGNORE_DIRS])

            level = os.path.relpath(root, directory).count(os.sep)

            if level > MAX_DEPTH:
                dirs.clear()
                continue

            indent = "    " * level

            folder = os.path.basename(root)

            if root == directory:
                f.write(f"{os.path.basename(directory)}/\n")
            else:
                f.write(f"{indent}├── {folder}/\n")

            sub = "    " * (level + 1)

            for file in sorted(files):

                if file in IGNORE_FILES:
                    continue

                ext = os.path.splitext(file)[1].lower()

                if ext in IGNORE_EXTENSIONS:
                    continue

                f.write(f"{sub}├── {file}\n")

        f.write("```\n\n")

        ##################################################
        # Source Code
        ##################################################

        f.write("\n---\n\n")
        f.write("# Source Code\n\n")

        for root, dirs, files in os.walk(directory):

            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

            for file in sorted(files):

                if file in IGNORE_FILES:
                    continue

                ext = os.path.splitext(file)[1].lower()

                if ext not in CODE_EXTENSIONS:
                    continue

                path = os.path.join(root, file)

                if os.path.getsize(path) > MAX_FILE_SIZE:
                    continue

                relative = os.path.relpath(path, directory)

                f.write(f"## `{relative}`\n\n")

                f.write(f"```{language(ext)}\n")

                try:
                    with open(path, "r", encoding="utf-8") as code:
                        f.write(code.read())
                except UnicodeDecodeError:
                    f.write("// Unable to read file (encoding).")
                except Exception as e:
                    f.write(f"// {e}")

                f.write("\n```\n\n---\n\n")

    print("Done!")
    print("Output:", OUTPUT_FILE)


if __name__ == "__main__":
    generate(os.getcwd())
```

---

## `project_structure.md`

```markdown
# هيكل المشروع (Project Tree)

```text
├── inventory-counting/
    ├── extract_code.py
    ├── project_structure.md
    ├── README.md
    ├── frontend/
        ├── .gitignore
        ├── .oxlintrc.json
        ├── App.jsx
        ├── index.css
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── README.md
        ├── tailwind.config.js
        ├── vite.config.js
        ├── assets/
        ├── public/
        ├── src/
            ├── App.jsx
            ├── i18n.js
            ├── index.css
            ├── main.jsx
            ├── assets/
            ├── components/
                ├── layout/
                    ├── MainLayout.jsx
                    ├── Sidebar.jsx
                    ├── Topbar.jsx
                ├── pages/
                    ├── Agenda.jsx
                    ├── Dashboard.jsx
                    ├── HR.jsx
                    ├── Login.jsx
                    ├── Suppliers.jsx
                    ├── Employees/
                    ├── Suppliers/
                ├── ui/
            ├── locales/
                ├── en/
                    ├── translation.json
        ├── store/
            ├── authStore.js
        ├── utils/
```

---

# محتوى الأكواد (Source Code)

## الملف: `extract_code.py`

```python
import os

def generate_code_report(directory, output_filename="project_structure.md"):
    # المجلدات والملفات التي سيتم تجاهلها (لتجنب استخراج ملفات ضخمة أو غير هامة)
# إضافة .venv إلى القائمة
    ignore_dirs = {'.git', 'node_modules', '__pycache__', 'venv', '.venv', 'env', '.next', 'build', 'dist'}
    ignore_exts = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.pdf', '.zip', '.exe', '.pyc', '.mp4'}

    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write("# هيكل المشروع (Project Tree)\n\n```text\n")

        # 1. رسم شجرة المجلدات والملفات
        for root, dirs, files in os.walk(directory):
            # فلترة المجلدات لتجاهل الغير مرغوب فيها
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            
            # حساب مستوى المسافة البادئة بناءً على عمق المجلد
            level = root.replace(directory, '').count(os.sep)
            indent = ' ' * 4 * level
            folder_name = os.path.basename(root)
            
            if folder_name:  # تجنب طباعة مسار فارغ للمجلد الرئيسي
                f.write(f"{indent}├── {folder_name}/\n")
            
            subindent = ' ' * 4 * (level + 1)
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext not in ignore_exts:
                    f.write(f"{subindent}├── {file}\n")

        f.write("```\n\n---\n\n# محتوى الأكواد (Source Code)\n\n")

        # 2. كتابة محتوى الملفات
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext not in ignore_exts:
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, directory)

                    # تحديد لغة البرمجة لتنسيقها في ملف الماركداون
                    lang = ext.replace('.', '') if ext else 'text'
                    if lang in ['js', 'jsx']: lang = 'javascript'
                    elif lang in ['ts', 'tsx']: lang = 'typescript'
                    elif lang == 'py': lang = 'python'

                    f.write(f"## الملف: `{rel_path}`\n\n")
                    f.write(f"```{lang}\n")
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as code_file:
                            f.write(code_file.read())
                    except Exception as e:
                        f.write(f"// تعذر قراءة الملف: {e}")
                        
                    f.write("\n```\n\n---\n\n")

    print(f"تم الانتهاء بنجاح! تم حفظ النتيجة في ملف: {output_filename}")

# تشغيل السكربت على المجلد الحالي
if __name__ == "__main__":
    current_directory = os.getcwd()
    generate_code_report(current_directory)
```

---

## الملف: `project_structure.md`

```md

```

---

## الملف: `README.md`

```md
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte
```

---

## الملف: `frontend\.gitignore`

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

---

## الملف: `frontend\.oxlintrc.json`

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

```

---

## الملف: `frontend\App.jsx`

```javascript

```

---

## الملف: `frontend\index.css`

```css

```

---

## الملف: `frontend\index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

---

## الملف: `frontend\package-lock.json`

```json
{
  "name": "frontend",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "frontend",
      "version": "0.0.0",
      "dependencies": {
        "@tailwindcss/vite": "^4.3.3",
        "@tanstack/react-table": "^8.21.3",
        "i18next": "^26.3.6",
        "i18next-browser-languagedetector": "^8.2.1",
        "lucide-react": "^1.25.0",
        "react": "^19.2.7",
        "react-dom": "^19.2.7",
        "react-i18next": "^17.0.10",
        "react-router-dom": "^7.18.1"
      },
      "devDependencies": {
        "@tailwindcss/postcss": "^4.3.3",
        "@types/react": "^19.2.17",
        "@types/react-dom": "^19.2.3",
        "@vitejs/plugin-react": "^6.0.3",
        "autoprefixer": "^10.5.4",
        "oxlint": "^1.71.0",
        "postcss": "^8.5.20",
        "tailwindcss": "^4.3.3",
        "vite": "^8.1.1"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.7.tgz",
      "integrity": "sha512-Nq8OhGWiZIZGV6hLHoyAKLLcJihP/xFeBMGJoUrxTX2psI8dCifzLhZISFb+VWS3wFMRDmCGw5R+dOySCqPLhw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@emnapi/core": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.11.1.tgz",
      "integrity": "sha512-RSvbQmHzdKzNsLYa/wHrbc3KN4sYLKAdPZxqiM2HATqv/SBk2/ENSHpvXGaLOMcsAyz0poEGqkmmKYG3OWiJEQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.2",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.1.tgz",
      "integrity": "sha512-vgj7R3y3Wgx24IQaGPA/R6YFXLHVMOZ0uVEyIQPaWs+rd1AzfEMXlAC22FYwO1XkKR6NPsq7mUandH8oIRdZFw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.2.tgz",
      "integrity": "sha512-c95qOXkHdydNKhscBTebqEC1CVAZpyqOfVfBzQ1qgzyl3gfeldUjIggDbIZgDKsHLgnsM+igH7TJ/eAasaVuMA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.6.tgz",
      "integrity": "sha512-ZLv/JdUfkvOy9eCnnBaGfiO+XimbjebAeO+MRQqD/B+FR1tnRN0tpKSJHRbE8sFfS6aqsXZ67TQjfwfsxULVbg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@tybys/wasm-util": "^0.10.3"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "peerDependencies": {
        "@emnapi/core": "^1.7.1",
        "@emnapi/runtime": "^1.7.1"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.139.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.139.0.tgz",
      "integrity": "sha512-r9gHphtCs+1M7J0pw6Sn/hh/Wpa/iQrOOkrNAlVLF/gHq+/CJmHIWKKUUhdWjcD6CIa8idarspCsASiXCXvFUw==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Boshen"
      }
    },
    "node_modules/@oxlint/binding-android-arm-eabi": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-android-arm-eabi/-/binding-android-arm-eabi-1.74.0.tgz",
      "integrity": "sha512-+gHd12muVI9ZLBaWLPkHt3Fj7jihFjgQ1MGtBaRL8vWrWrI0P7dLUty/cHrHS0oqPYIRgQUJsPu2CExQuMcwNw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-android-arm64": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-android-arm64/-/binding-android-arm64-1.74.0.tgz",
      "integrity": "sha512-xjKdoMB+H+RCOByv/7l7nfIGW9mlOisqYdcyC75UqYuQecLpReAeEYUf2CNeDEI3KtmUgxpRw/+c63y4AeF/Bw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-darwin-arm64": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-darwin-arm64/-/binding-darwin-arm64-1.74.0.tgz",
      "integrity": "sha512-iUK7wvc6sejMKsC+Pt67mntoF5weFcyEunhZfLJceU6gL419mexz5wBkSx/EnkFBExMLNtOi9fnDSc5xfK0IzQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-darwin-x64": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-darwin-x64/-/binding-darwin-x64-1.74.0.tgz",
      "integrity": "sha512-ggKc/tn5SJ1u2yG2izC6VKODfYKV8MQ2AicJlNzOjuyrC29udvOef6/JzK2r32xqCnBDLFouR1VCkjzEI0/N9Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-freebsd-x64": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-freebsd-x64/-/binding-freebsd-x64-1.74.0.tgz",
      "integrity": "sha512-u++dH/43jy9hTLbneaWlS0gla/Bp1JdwJ2zgevCl8nDFUh6qRCGMxcL0f0lb7By3A9p/LfFr+7cG4HU1hG856g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm-gnueabihf": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.74.0.tgz",
      "integrity": "sha512-Sj1zmtFDVTPeIbIz4ZfcXAbFHqCmKCXdCUlAJzvTF7I20NTH1RDpoF2PhkqNODutJzVhJYmm3oz0GwgY+tvE2g==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm-musleabihf": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm-musleabihf/-/binding-linux-arm-musleabihf-1.74.0.tgz",
      "integrity": "sha512-//PKyQb/tQXcHArx2f7z+oVI/eMS2Jpv+edNuAtOrgIhWdGcpHxogveAxzmF2rpH1AIHp4Hq04RF/rgJdiICnQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm64-gnu": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.74.0.tgz",
      "integrity": "sha512-/k1Me+aX2tjuH10K62mLS0y8cLkJBHX6Ce0xPK+eWeel4bSdEGZ8dv4+hYMzg0GrSmjwy4yAYsDPeEeKBft/2w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm64-musl": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.74.0.tgz",
      "integrity": "sha512-3tFSjBxc5D8/zvjEuLvOqcA8ZXKD0+6NuaVO/edeamNc49MoAsbfaC9s1UiwODwgF6slGaF8yJA2TPkukd77tg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-ppc64-gnu": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.74.0.tgz",
      "integrity": "sha512-9QggtPkSPXOCTu8Szis7auOK/sC7KdQaN+/TujP7YVVhzCAOhgdRfgv8uEz0r2tk5xdgus5rLYUrCDoZNtiRUw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-riscv64-gnu": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-riscv64-gnu/-/binding-linux-riscv64-gnu-1.74.0.tgz",
      "integrity": "sha512-VM5VPUJ4DJIWiK+AZn8FScUqMr6OFrCAYybMYjEEi7W13ParI64MByiXTkKMqZpBmvQ9zxl9Ebq2VUOiZRJYUg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-riscv64-musl": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-riscv64-musl/-/binding-linux-riscv64-musl-1.74.0.tgz",
      "integrity": "sha512-SaDY1gh9rOA592J54g+gu5hkOFFQBZsMmIYHs+NRHG+Uq0OxtuuCXMWQ3vu1830Eugv5uMXyjG+bv2Z9y4IXjw==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-s390x-gnu": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.74.0.tgz",
      "integrity": "sha512-ZATQeHZCyr6MbDveg0obD5sxLHFOghtOdC5jwVwYlvFWqtFOxctgFEG6Ef/64hYvZrWyhyCckB10AelqLopeDA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-x64-gnu": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.74.0.tgz",
      "integrity": "sha512-+aIvJyrdeD7LwCQ2WYLMUWNmnbeDRSPb40aBYtPjD9+PTqUwgJnk+HK5yLfSMeqXrMrDhE9uTmtt2y50tvjhHw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-x64-musl": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-x64-musl/-/binding-linux-x64-musl-1.74.0.tgz",
      "integrity": "sha512-XyktaR8lhK2qWiCK0Tk8oYD+/cgn+oHA6ddRnxSSXUKkkojkV78CmShZUxQF+yrBFs0SuW+JBOPG6hecyc/iZg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-openharmony-arm64": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-openharmony-arm64/-/binding-openharmony-arm64-1.74.0.tgz",
      "integrity": "sha512-mzbjrPl4neaVUiJ1fUiEUxTGaSZBoiKtaoB6jmIpz9S+VOA2vDYmJpihQ82w6178V5jxziclTg8Cgj5yF6tTDg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-arm64-msvc": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.74.0.tgz",
      "integrity": "sha512-vUAe9okpS2Oa5+lX67lqHMuNUvfkleRKwrUDJ/WJBsgmddvZ1mrsh2HVmuFDRzqFELhaJhFaCNOuR6a7L3rtIA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-ia32-msvc": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-ia32-msvc/-/binding-win32-ia32-msvc-1.74.0.tgz",
      "integrity": "sha512-yyXXJyYYSXL4I8K8jAWjJs+J3fa9gH2JmEbo4f5adm+1tNC9itseicBNuwK7BDHvqQ5J534s+yDULu89vYL2ZQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-x64-msvc": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.74.0.tgz",
      "integrity": "sha512-VTC9IYTIMrVUk/i6Ms1ohzzDKZFkWn0KU2OBbPBzgmVZ2V30165T/zK4LztTr0Xgp9fZ1qQZ1rsZAu/rEmySlA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.1.5.tgz",
      "integrity": "sha512-lZg8fqIv2v7FF237bwMgzGZEJvGL79/s5knJ/i6FmsGF4XXlzccZ4jb+TrFIxtSSxFtIpdsgrPZeMk1I9AFcyQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.1.5.tgz",
      "integrity": "sha512-51Bnx9pNiMRKSUNtBfySkNJ9vMU9Hh3I1ozDd6gyPPYzaXCfnptUcEZxXGYFn+ul2dtcMUiqGR1Yai2K10uoTw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.1.5.tgz",
      "integrity": "sha512-Tm+gbfC0aHu1tBA/JvKQh32S0K6YgCHkiAF4/W6xX0K0RmNuc94VeK419dJoE65R5aRxmo+noZQSWrAMF6yb6g==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.1.5.tgz",
      "integrity": "sha512-JMzDKCCXq93YccG5gz3hvOs1oXRKAf0XYpfOS88e+wZrC8Iugj6j68867vrYZkvpDDpKn/KoKORThmchMpF6TA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.1.5.tgz",
      "integrity": "sha512-uML21j2K5TfPGutKxub+M+nLjZIrWjXQ5Grx4lCe/nimTj9B4L63zHpjXLl4y0L3mcm2htEQIb06oCG/szerNw==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.1.5.tgz",
      "integrity": "sha512-navSiuTMogvnQoZoM/v+l3ZWo50/NTwSHSzheABx/RCnmUPaKwq9qSo4Br2OYRs21+Fz8uFqITZM3H4opOB0/Q==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.1.5.tgz",
      "integrity": "sha512-lAryqH7IteztmCXQXk0etKj4wBQ7Gx5S6LjKhsgp9zb8I5bsuvU/2llH1hDQcjsFeqIsovMVN339/8pUDDBXxA==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.1.5.tgz",
      "integrity": "sha512-fsK/sNBnxzBlL4O1JNrZakVQxPspqpED5dLtNsZS9oOKmtSpdNIzxH2kkol5HYTWJN47sE20ztMJPxfZ89qGOg==",
      "cpu": [
        "ppc64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.1.5.tgz",
      "integrity": "sha512-gLYb4BIadlfTOYT5gO503n8zQjXflgzpD0FcyKh0Mzx3rqCZKnHoJWV9xe1KXUJ5lx2JfcSHr/mhzS0PC/McAA==",
      "cpu": [
        "s390x"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.1.5.tgz",
      "integrity": "sha512-FjcpEKUyJygHgs1o50VYNvkt5+7Le/VEdYt0AkRpkL33MnyQfwr8l5mXwMmfmTbyMPr5vJLC+8/Gd9gXnwU1QQ==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.1.5.tgz",
      "integrity": "sha512-Me+PfPI2TMeOQk0gYWfLQZtTktrmzbr8cDboqX83XKc7UrgAi55gF+2dUkWdxd19n55Essp2yeca+O9N5rBxHg==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.1.5.tgz",
      "integrity": "sha512-yc5WrLzXks6zCQfn9Oxr8pORKyl/pF+QjHmW/Qx3qu0oyrrNC+y2JLTU1E2rcWYAmzlnqngWXHQjy51VzW70Vw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-wasm32-wasi": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-wasm32-wasi/-/binding-wasm32-wasi-1.1.5.tgz",
      "integrity": "sha512-VbQGPX2b4r48TAMIM2cjgluIM1HYutm4pcTEJsle7iEP7sB1dFqtPLBVbdLAZCxy1txCcPxf4QFf4v8uvltPqA==",
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "1.11.1",
        "@emnapi/runtime": "1.11.1",
        "@napi-rs/wasm-runtime": "^1.1.6"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.1.5.tgz",
      "integrity": "sha512-gHv82k63z4qpV5+Q1y/12KrK0ltWBukVDI8nZcbT7Tt/ZlOIVwppazneq0F93oDxTo3IgAMEDIoQh3E2n6mVsw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.1.5.tgz",
      "integrity": "sha512-tTZuDBPw85tEN5PQi1pnEBzDy0Z49HtScLAbD5t6hyeU92A95pRWaSMw1GZZi/RwgSgUIl0xrSlXIT/9QzvYSA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz",
      "integrity": "sha512-2j9bGt5Jh8hj+vPtgzPtl72j0yRxHAyumoo6TNfAjsLB04UtpSvPbPcDcBMxz7n+9CYB0c1GxQFxYRg2jimqGw==",
      "license": "MIT"
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.3.3.tgz",
      "integrity": "sha512-/T8IKEsf9VTU6tLjgC7+sv2mOPtQxzE2jMw7u4Tt40Tx+QSZxpzh95/H6cMKoja9XuW7iMdLJYBB0o9G1CaAgg==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.24.1",
        "jiti": "^2.7.0",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.3.3.tgz",
      "integrity": "sha512-krXjAikiaFSPaK/FkAQT5UTx3VormQaiZ5hBFlJZ9UFQGB/rwg1MZIhHAG9smMQRTdyJxP6Qt5MwMtdyU5FWrA==",
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-x64": "4.3.3",
        "@tailwindcss/oxide-freebsd-x64": "4.3.3",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-musl": "4.3.3",
        "@tailwindcss/oxide-linux-x64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-x64-musl": "4.3.3",
        "@tailwindcss/oxide-wasm32-wasi": "4.3.3",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.3.3",
        "@tailwindcss/oxide-win32-x64-msvc": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.3.tgz",
      "integrity": "sha512-Y85A2gmPSkl5Ve5qR86GL4HT509cFqQh1aes9p3sSkyTPwt0Pppf3GkwGe4JPACcRYjgJIEhQgM6dBClnr0NYw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.3.tgz",
      "integrity": "sha512-BiaWatpBcERQFDlOjRDpIVXuFK5PJez5SA4JMg6VYZdBYU+qKfV/vqjcIs+IYmtitf1xYQZTwXvU/8y4lfZUGw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.3.tgz",
      "integrity": "sha512-fAeUqfV5ndhxRwai8cXGzdLvul9utWOmeTkv69unv4ZXixjn61Z+p9lCWdwOwA3TYboG3BwdVuN/RDjhBRl0mw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.3.tgz",
      "integrity": "sha512-iyf5bV6+wnAlflVeEy7R25dupxTNECZN5QMI0qNT6eT+EgaGdZcKhGkr5SdoaWiLJ3spLqIY9VCeSGrwmtg4kw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.3.tgz",
      "integrity": "sha512-aAYUprJAJQWWbRrPvtjdroZ56Md+JM8pMiopS6xGEwDfLhqj+2ver2p4nU4Mb3CRqcMmNBjo8KkUgcxhkzVQGQ==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.3.tgz",
      "integrity": "sha512-nDxldcEENOxZRzC2uu9jrutZdAAQtb+8WWDCSnWL1zvBk1+FN+x6MtDViPB5AJMfttVCUhehGWus3XBPgatM/w==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.3.tgz",
      "integrity": "sha512-Md44bD6veX/PC5iyF8cDVnw4HBIANZepRZZ7a8DQOvkfo5WUBwcp6iAuCUz23u+4SUkhJlD3eL7hNdW8ezd/kA==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.3.tgz",
      "integrity": "sha512-tx7us1muwOKAKWao2v/GaafFeQboE6aj88vC6ziN2NCGcRm8gWUhwjzg+YdVB1e4boAtdtma4L43onunI6NS4w==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.3.tgz",
      "integrity": "sha512-SJxX60smvHgasZoBy11dX6YRjXJFovwWBoedhbQPOBzgFWBHGB+TVPWB9BxzR7TTxU8FQZAI2AyiNCMzFm8Img==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.3.tgz",
      "integrity": "sha512-jx1+rPhY/5Ympkktd656HBWEBLxP7dH06losBLjjf5vgCODXvi9KhtftWcMIwTFIDqBr7cRnQkdLnAG+IOlGvQ==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.11.1",
        "@emnapi/runtime": "^1.11.1",
        "@emnapi/wasi-threads": "^1.2.2",
        "@napi-rs/wasm-runtime": "^1.1.4",
        "@tybys/wasm-util": "^0.10.2",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.3.tgz",
      "integrity": "sha512-3rc292Ca2ceK6Ulcc/bAVnTs/3nDtoPhyEKlgPv+yQJQi/JS/AMJlqzxvlDacL1nekbrcf6bTqp/jV4qgnPxNQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.3.tgz",
      "integrity": "sha512-yJ0pwIVc/nYeGoV02WtsN8KYyLQv7kyI2wDnkezyJlGGjkd4QLwDGAwl47YpPJeuI0M0ObaXGSPjvWDPeTPggw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/postcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/postcss/-/postcss-4.3.3.tgz",
      "integrity": "sha512-JTSZZGQi1AyKirbLN3azmjVzef92tcX7h+iSqPdaeStyFpGpDlKvvpxeOE8njhbUanbRwr3z8DyzhICWnMtQeg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "@tailwindcss/node": "4.3.3",
        "@tailwindcss/oxide": "4.3.3",
        "postcss": "^8.5.16",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/vite": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.3.3.tgz",
      "integrity": "sha512-yYU8cogLeSh/ms2jh8Fj7jaba/EWa7Ja6GoUqYZaraEuCI5YS6ms6ObZgjjedm+jm6XZjdNRWBpPP6Z86oOxcw==",
      "license": "MIT",
      "dependencies": {
        "@tailwindcss/node": "4.3.3",
        "@tailwindcss/oxide": "4.3.3",
        "tailwindcss": "4.3.3"
      },
      "peerDependencies": {
        "vite": "^5.2.0 || ^6 || ^7 || ^8"
      }
    },
    "node_modules/@tanstack/react-table": {
      "version": "8.21.3",
      "resolved": "https://registry.npmjs.org/@tanstack/react-table/-/react-table-8.21.3.tgz",
      "integrity": "sha512-5nNMTSETP4ykGegmVkhjcS8tTLW6Vl4axfEGQN3v0zdHYbK4UfoqfPChclTrJ4EoK9QynqAu9oUf8VEmrpZ5Ww==",
      "license": "MIT",
      "dependencies": {
        "@tanstack/table-core": "8.21.3"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      },
      "peerDependencies": {
        "react": ">=16.8",
        "react-dom": ">=16.8"
      }
    },
    "node_modules/@tanstack/table-core": {
      "version": "8.21.3",
      "resolved": "https://registry.npmjs.org/@tanstack/table-core/-/table-core-8.21.3.tgz",
      "integrity": "sha512-ldZXEhOBb8Is7xLs01fR3YEc3DERiz5silj8tnGkFZytt1abEvl/GhUmCE0PMLaMPTa3Jk4HbKmRlHmu+gCftg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      }
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.3",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.3.tgz",
      "integrity": "sha512-F3fo1MYrRJYL3zER0OUOmkutjr1Vp23m7OsSgp7nq4SP6OqX6C/56XFIPAl5bt3zaBRjmW7SGz3u/6LwFpYcOg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.2.17",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.17.tgz",
      "integrity": "sha512-MXfmqaVPEVgkBT/aY0aGCkRWWtByiYQXo3xdQ8r5RzuFrPiRn8Gar2tQdXSUQ2GKV3bkXckek89V8wQBY2Q/Aw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.0.3.tgz",
      "integrity": "sha512-vmFvco5/QuC2f9Oj+wTk0+9XeDFkHxSamwZKYc7MxYwKICfvUvlMhqKI0VuICPltGqh1neqBKDvO4kes1ya8vg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "^1.0.1"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        }
      }
    },
    "node_modules/autoprefixer": {
      "version": "10.5.4",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.4.tgz",
      "integrity": "sha512-MaU0U/za7N3r6brxD4YB/l4NSrFzLPlANv6wEuQVaIPlD3L4W9rFcQPbL/EilY9BHhHvhfcz3gInDLrEtWT4EA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.6",
        "caniuse-lite": "^1.0.30001806",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.43",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.43.tgz",
      "integrity": "sha512-AjYpR78kDWAY3Efj+cDTFH9t9SCoL7OoTp1BOb0mQV7S+6CiLwnWM3FyxhJtdPufDFKzmCSFoUncKjWgJEZTCQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.6",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.6.tgz",
      "integrity": "sha512-FQBYNK15VMslhLHpA7+n+n1GOlF1kId2xcCg7/j95f24AOF6VDYMNH4mFxF7KuaTdv627faazpOAjFzMrfJOUw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.10.42",
        "caniuse-lite": "^1.0.30001803",
        "electron-to-chromium": "^1.5.389",
        "node-releases": "^2.0.51",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001806",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001806.tgz",
      "integrity": "sha512-72Cuvd95zbSYPKq6Fhg8eDJRlzgWDf7/mtoZv6Qe/DYNCEBdNxoA3+rZAU2ZhGCpZlns3EssFavaZomckT5Uuw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.393",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.393.tgz",
      "integrity": "sha512-kiDJdIUawuEIcp9XoICKp1iTYDEbgguIPq526N1Q7jIQDeQ3CqoMx71025PI/7E48Ddtw2HuWsVjY7afEgNxmg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/enhanced-resolve": {
      "version": "5.24.3",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.24.3.tgz",
      "integrity": "sha512-PwKooW9JUzh5chmYfHM3IQl5OkK2u2Nm011MgeZrss3JmFraUx/fqrf78kk8GUMYoibx/14MdwTl/1WKkG7TpQ==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/html-parse-stringify": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/html-parse-stringify/-/html-parse-stringify-3.0.1.tgz",
      "integrity": "sha512-KknJ50kTInJ7qIScF3jeaFRpMpE8/lfiTdzf/twXyPBLAGrLRTmkz3AdTnKeh40X8k9L2fdYwEp/42WGXIRGcg==",
      "license": "MIT",
      "dependencies": {
        "void-elements": "3.1.0"
      }
    },
    "node_modules/i18next": {
      "version": "26.3.6",
      "resolved": "https://registry.npmjs.org/i18next/-/i18next-26.3.6.tgz",
      "integrity": "sha512-Bu5Z2nAXgfVyM8xvW3jk9EKRIuX37PudsrBViThNFx7CR7aaYTpP01cxNB/E4c4UUzTDiAZRstEhsRfPOL/8xA==",
      "funding": [
        {
          "type": "individual",
          "url": "https://www.locize.com/i18next"
        },
        {
          "type": "individual",
          "url": "https://www.i18next.com/how-to/faq#i18next-is-awesome.-how-can-i-support-the-project"
        },
        {
          "type": "individual",
          "url": "https://www.locize.com"
        }
      ],
      "license": "MIT",
      "peerDependencies": {
        "typescript": "^5 || ^6 || ^7"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/i18next-browser-languagedetector": {
      "version": "8.2.1",
      "resolved": "https://registry.npmjs.org/i18next-browser-languagedetector/-/i18next-browser-languagedetector-8.2.1.tgz",
      "integrity": "sha512-bZg8+4bdmaOiApD7N7BPT9W8MLZG+nPTOFlLiJiT8uzKXFjhxw4v2ierCXOwB5sFDMtuA5G4kgYZ0AznZxQ/cw==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.23.2"
      }
    },
    "node_modules/jiti": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz",
      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.33.0.tgz",
      "integrity": "sha512-WkUDrojuJs0xkgGf2udWxa3yGBRxPtxUkB79i6aCZLRgc7PM8fZe9TosfPDcvEpQZbuFASnHYmRLBLUbmLOIIA==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.33.0",
        "lightningcss-darwin-arm64": "1.33.0",
        "lightningcss-darwin-x64": "1.33.0",
        "lightningcss-freebsd-x64": "1.33.0",
        "lightningcss-linux-arm-gnueabihf": "1.33.0",
        "lightningcss-linux-arm64-gnu": "1.33.0",
        "lightningcss-linux-arm64-musl": "1.33.0",
        "lightningcss-linux-x64-gnu": "1.33.0",
        "lightningcss-linux-x64-musl": "1.33.0",
        "lightningcss-win32-arm64-msvc": "1.33.0",
        "lightningcss-win32-x64-msvc": "1.33.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.33.0.tgz",
      "integrity": "sha512-gEpRTalKdosp4Bb8qWtc2iOgE5SeIHlpS1up9bFq2wAyYhl1UdTObYiHe98zEM9SQvSoqQZ1IQD0JNpg3Ml5pg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.33.0.tgz",
      "integrity": "sha512-Sciaz8eenNTKn9b3t7+xr0ipTp9YxKQY4npwQ3mrRuL0BAVHBLyZxofhaKBAVtzmtRZ/zTyo0/to4B1uWG/Djg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.33.0.tgz",
      "integrity": "sha512-Z5UPAxzrjlWNNyGy6i65cJzzvgJ5D3T6wMvs+gWpY9d7qRhANrxqAp6LhxIgZhWEw18RfJTGcRxjuLIBr+m8XQ==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.33.0.tgz",
      "integrity": "sha512-QQM/Ti/hQajJwCY+RiWuCZ9sdtI/XQk7nDK5vC8kkdwixezOlDgvDx7+RT+QjK6FcFT4MpsuoBnHIo/O3StRRg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.33.0.tgz",
      "integrity": "sha512-N7FVBe6iS24MlM6R/4RBTxGhQheZGs7tiQ9U32UtF75NzP5Q7xWPRqLBCKxlRQRk3rY1jCIPLzx7WzOhuUIRLQ==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.33.0.tgz",
      "integrity": "sha512-j2v/itmy4HlNxlc6voKXYgBqNi0Ng2LShg4z7GufpEgs05P+2suBVyi9I6YHq5uoVFx9ETin3eCEhLVyXGQnKg==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.33.0.tgz",
      "integrity": "sha512-yiO5ROMuYQgXbC60yjZU5CYSFZGKXL0HFATXt9mHJn1+zW55oCtMI9NfcVhYLMFDL7gV7oBPon/EmMMGg2OvtQ==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.33.0.tgz",
      "integrity": "sha512-ar+Ju7LmcN0Jo4FpL4hpFybwNG9/3A/Br5KW2n2jyODg3MEZXaDYADdemoNS+BDNfMgKvylJLj4S5tyRActuAg==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.33.0.tgz",
      "integrity": "sha512-RYiYbkokw0trfKqqzfF55lginwEPrD3OJDfTuJzFs1MK6iFnDenaz1fqLLtX4ITG3OktJQXOeTaw1awrBAlZPw==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.33.0.tgz",
      "integrity": "sha512-1K+MPfLSFVpphzpdbfkhlWk6wBrTObBzS2T6db10PNOZgR9GoVsAWzwNyuhUYYbTp23j+4RrncfujZ4uAzXvwA==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.33.0.tgz",
      "integrity": "sha512-OlEICDx/Xl0FqSp4bry8zFnCvGpig3Gl4gCquvYwHuqJKEC1+n9NgDniFvqHGmMv1ZkqDJrDqKKSykTDX+ehuA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.25.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.25.0.tgz",
      "integrity": "sha512-/mdJTRbiwcLOQ1NZZK1amZF9rIZyvO18D6r9TngE6TG1NmqHgFuT4eE7Xrkm9UsXMbBJD1NlfwHVltCDWHrOTw==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.16",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.16.tgz",
      "integrity": "sha512-bzlKTyNJ7+LdGIIwy8ijFpIqEQIvafahV7eYykJ8Cvh42EdJeODoJ6gUJXpQJvej1BddH8OqTXZNE/KfbWAu8Q==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.51",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.51.tgz",
      "integrity": "sha512-wRNIrw4DmVLKQlbgOMdkMx27Wrpzes2hh5Jtbi2bjPd+4wJstWIqP5A+lscnqbm0xxmT5Bpg8Lec5ItEBwx6BQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/oxlint": {
      "version": "1.74.0",
      "resolved": "https://registry.npmjs.org/oxlint/-/oxlint-1.74.0.tgz",
      "integrity": "sha512-odGl2s2x5IOJoj3A0v1k0PGBXVFBZeZ2+AK/+K2MJur7Ghi3bkyX5NuLUWHKqa4js1wjep3hJeuTQJOlr+4+dA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "oxlint": "bin/oxlint"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/Boshen"
      },
      "optionalDependencies": {
        "@oxlint/binding-android-arm-eabi": "1.74.0",
        "@oxlint/binding-android-arm64": "1.74.0",
        "@oxlint/binding-darwin-arm64": "1.74.0",
        "@oxlint/binding-darwin-x64": "1.74.0",
        "@oxlint/binding-freebsd-x64": "1.74.0",
        "@oxlint/binding-linux-arm-gnueabihf": "1.74.0",
        "@oxlint/binding-linux-arm-musleabihf": "1.74.0",
        "@oxlint/binding-linux-arm64-gnu": "1.74.0",
        "@oxlint/binding-linux-arm64-musl": "1.74.0",
        "@oxlint/binding-linux-ppc64-gnu": "1.74.0",
        "@oxlint/binding-linux-riscv64-gnu": "1.74.0",
        "@oxlint/binding-linux-riscv64-musl": "1.74.0",
        "@oxlint/binding-linux-s390x-gnu": "1.74.0",
        "@oxlint/binding-linux-x64-gnu": "1.74.0",
        "@oxlint/binding-linux-x64-musl": "1.74.0",
        "@oxlint/binding-openharmony-arm64": "1.74.0",
        "@oxlint/binding-win32-arm64-msvc": "1.74.0",
        "@oxlint/binding-win32-ia32-msvc": "1.74.0",
        "@oxlint/binding-win32-x64-msvc": "1.74.0"
      },
      "peerDependencies": {
        "oxlint-tsgolint": ">=0.24.0",
        "vite-plus": "*"
      },
      "peerDependenciesMeta": {
        "oxlint-tsgolint": {
          "optional": true
        },
        "vite-plus": {
          "optional": true
        }
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.5",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.5.tgz",
      "integrity": "sha512-RvwwcruNjI1ncT5xRakeyS9Lf8lcItv34KD+aif+VH9kduAyfYBipGh12274xtenIPZ119/R9BdTBa8gAwSh0A==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.20",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.20.tgz",
      "integrity": "sha512-lW616l85ucIQL+FocMmL7pQFPqBmwejrCMg+iPxyImlrANNJG9NHq/RkyCZopDhd8C3LA03PHRJDjkbGu8vvug==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.16",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "19.2.7",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.7.tgz",
      "integrity": "sha512-HNe9WslTbXmFK8o8cmwgAeJFSBvt1bPdHCVKtaaV+WlAN36mpT4hcRpwbf3fY56ar2oIXzsBpOAiIRHAdY0OlQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.7",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.7.tgz",
      "integrity": "sha512-t0BRVXvbiE/o20Hfw669rLbMCDWtYZLvmJigy2f0MxsXF+71pxhR3xOkspmsO8h3ZlNzyibAmtCa3l4lYKk6gQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.7"
      }
    },
    "node_modules/react-i18next": {
      "version": "17.0.10",
      "resolved": "https://registry.npmjs.org/react-i18next/-/react-i18next-17.0.10.tgz",
      "integrity": "sha512-XneHftyYA774MJkkccSkZ5oKrUpCnXIPmxio3wemqrVzCRLWiGXOMbIzObrer03fNDEnm8g8R5yYls4HcE+esg==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.29.2",
        "html-parse-stringify": "^3.0.1",
        "use-sync-external-store": "^1.6.0"
      },
      "peerDependencies": {
        "i18next": ">= 26.2.0",
        "react": ">= 16.8.0",
        "typescript": "^5 || ^6 || ^7"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        },
        "react-native": {
          "optional": true
        },
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/react-router": {
      "version": "7.18.1",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.18.1.tgz",
      "integrity": "sha512-GDLgg3i3uM0aeJO3Fm+TCS+sDQ7gu12T6x0qdTEzcwqEfleci7JwugVNIF3U//0FWKnJT7ptG+20B2jfDqnZAg==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.18.1",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.18.1.tgz",
      "integrity": "sha512-KaZh+X/6UtEp28x51AUYZDMg9NGoz2ja3dNHa+ta/tk40vCzKhQ/RypCWBMLbmDr6//E24Vv5uPsrqXFozdkAg==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.18.1"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/rolldown": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.1.5.tgz",
      "integrity": "sha512-t9z29cJjXf/vxQ8dyhCSpt6H6aSwHTk8cT5I3iy6SMXuFpk5mB6PL6XfC8PCwrPTx93udwKUm9HRteAlTGBLiA==",
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.139.0",
        "@rolldown/pluginutils": "^1.0.0"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm64": "1.1.5",
        "@rolldown/binding-darwin-arm64": "1.1.5",
        "@rolldown/binding-darwin-x64": "1.1.5",
        "@rolldown/binding-freebsd-x64": "1.1.5",
        "@rolldown/binding-linux-arm-gnueabihf": "1.1.5",
        "@rolldown/binding-linux-arm64-gnu": "1.1.5",
        "@rolldown/binding-linux-arm64-musl": "1.1.5",
        "@rolldown/binding-linux-ppc64-gnu": "1.1.5",
        "@rolldown/binding-linux-s390x-gnu": "1.1.5",
        "@rolldown/binding-linux-x64-gnu": "1.1.5",
        "@rolldown/binding-linux-x64-musl": "1.1.5",
        "@rolldown/binding-openharmony-arm64": "1.1.5",
        "@rolldown/binding-wasm32-wasi": "1.1.5",
        "@rolldown/binding-win32-arm64-msvc": "1.1.5",
        "@rolldown/binding-win32-x64-msvc": "1.1.5"
      }
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.2.tgz",
      "integrity": "sha512-oeM1lpU/UvhTxw+g3cIfxXHyJRc/uidd3yK1P242gzHds0udQBYzs3y8j4gCCW+ZJ7ad0yctld8RYO+bdurlvw==",
      "license": "MIT"
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.3.tgz",
      "integrity": "sha512-gOhV3P7ufE62QDGg1zVaTgCR+EtPv92k2nIhVcVKcLmxT1sUBsQGhnZj175j+MqRt4zLF7ic+sCYjfhxMxj7YQ==",
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz",
      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD",
      "optional": true
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.6.0.tgz",
      "integrity": "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/vite": {
      "version": "8.1.5",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.1.5.tgz",
      "integrity": "sha512-7ULLwsCdYx/nRyrpiEwvqb5TFHrMVZyBt+rg/OAXT7rgj/z+DtTDyKFeLAdDkubDVDKD8jOsndmy7m55XcfUsw==",
      "license": "MIT",
      "dependencies": {
        "lightningcss": "^1.32.0",
        "picomatch": "^4.0.5",
        "postcss": "^8.5.17",
        "rolldown": "~1.1.5",
        "tinyglobby": "^0.2.17"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.3.0",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/void-elements": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/void-elements/-/void-elements-3.1.0.tgz",
      "integrity": "sha512-Dhxzh5HZuiHQhbvTW9AMetFfBHDMYpo23Uo9btPXgdYP+3T5S+p+jgNy7spra+veYhBP2dCSgxR/i2Y02h5/6w==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    }
  }
}

```

---

## الملف: `frontend\package.json`

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@tanstack/react-table": "^8.21.3",
    "i18next": "^26.3.6",
    "i18next-browser-languagedetector": "^8.2.1",
    "lucide-react": "^1.25.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-i18next": "^17.0.10",
    "react-router-dom": "^7.18.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "autoprefixer": "^10.5.4",
    "oxlint": "^1.71.0",
    "postcss": "^8.5.20",
    "tailwindcss": "^4.3.3",
    "vite": "^8.1.1"
  }
}

```

---

## الملف: `frontend\postcss.config.js`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

---

## الملف: `frontend\README.md`

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

```

---

## الملف: `frontend\tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## الملف: `frontend\vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## الملف: `frontend\src\App.jsx`

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from './layout/MainLayout';
 
// الصفحات الحقيقية التي قمنا ببنائها حتى الآن
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers';
import HR from './pages/HR';

// صفحات وهمية مؤقتة (Placeholders) لباقي الروابط حتى نقوم ببرمجتها
const Expenses = () => <div className="p-8 text-slate-300">Expenses Page (Coming Soon...)</div>;
const Agenda = () => <div className="p-8 text-slate-300">Agenda Page (Coming Soon...)</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* المسار الرئيسي يغلف كل الصفحات بـ MainLayout (الشريط الجانبي والعلوي) */}
        <Route path="/" element={<MainLayout />}>
          {/* صفحة البداية الافتراضية */}
          <Route index element={<Dashboard />} />
          
          {/* باقي الصفحات */}
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="hr" element={<HR />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="agenda" element={<Agenda />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## الملف: `frontend\src\i18n.js`

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';

const resources = {
  en: { translation: enTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

---

## الملف: `frontend\src\index.css`

```css
@import "tailwindcss";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## الملف: `frontend\src\main.jsx`

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

---

## الملف: `frontend\src\components\layout\MainLayout.jsx`

```javascript
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

---

## الملف: `frontend\src\components\layout\Sidebar.jsx`

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, Briefcase, Receipt, Calendar } from 'lucide-react';

export default function Sidebar() {
  const { t } = useTranslation();

  const menuItems = [
    { path: '/', name: t('sidebar.dashboard'), icon: <LayoutDashboard size={20} /> },
    { path: '/suppliers', name: t('sidebar.suppliers'), icon: <Users size={20} /> },
    { path: '/hr', name: t('sidebar.hr'), icon: <Briefcase size={20} /> },
    { path: '/expenses', name: t('sidebar.expenses'), icon: <Receipt size={20} /> },
    { path: '/agenda', name: t('sidebar.agenda'), icon: <Calendar size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-wider">
          POS<span className="text-blue-500">Manger</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-slate-800 text-white font-medium' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
```

---

## الملف: `frontend\src\components\layout\Topbar.jsx`

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, UserCircle } from 'lucide-react';

export default function Topbar() {
  const { t } = useTranslation();

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-64">
        <Search size={18} className="text-slate-500 mr-2" />
        <input 
          type="text" 
          placeholder={t('common.search')} 
          className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder-slate-600"
        />
      </div>

      <div className="flex items-center gap-4 text-slate-400">
        <button className="relative hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-slate-950"></span>
        </button>
        <div className="h-6 w-px bg-slate-800"></div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <UserCircle size={24} />
          <div className="text-sm">
            <p className="font-medium text-white leading-none">{t('common.superAdmin')}</p>
            <p className="text-xs text-slate-500 mt-1">{t('common.systemOwner')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

## الملف: `frontend\src\components\pages\Agenda.jsx`

```javascript

```

---

## الملف: `frontend\src\components\pages\Dashboard.jsx`

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, AlertCircle, Users, Wallet, Plus } from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors">
          <Plus size={18} />
          <span>{t('dashboard.quickAction')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.totalDebts')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">450,000 DA</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-red-900/30 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.dueThisWeek')}</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">125,000 DA</h3>
            </div>
            <div className="p-2 bg-red-950/50 rounded-lg text-red-400">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.activeEmployees')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">4 / 6</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <Users size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.expenses')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">32,000 DA</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <Wallet size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.charts.topCreditors')}</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg text-slate-500">
            Bar Chart Area
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.charts.expensesDist')}</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg text-slate-500">
            Pie/Area Chart Area
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.lists.urgentAlerts')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="font-medium text-white">ULTRA JOY Inc.</p>
                <p className="text-xs text-slate-500">Today at 14:00</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-red-400">39,390 DA</span>
                <button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-700">
                  {t('dashboard.actions.payNow')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.lists.recentAudit')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Advance Recorded - Ahmed</p>
                <p className="text-xs text-slate-500">45 mins ago by Admin</p>
              </div>
              <span className="text-sm text-slate-400">- 2,000 DA</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
```

---

## الملف: `frontend\src\components\pages\HR.jsx`

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScanBarcode, UserCheck, Users, Clock, AlertCircle } from 'lucide-react';

// بيانات وهمية لعمال المتجر
const initialAttendance = [
  { id: 1, pin: '1001', name: 'Ahmed Ali', role: 'Cashier', timeIn: '08:00 AM', timeOut: null, status: 'present' },
  { id: 2, pin: '1002', name: 'Sarah Connor', role: 'Store Manager', timeIn: '07:45 AM', timeOut: null, status: 'present' },
  { id: 3, pin: '1003', name: 'Karim Nabil', role: 'Stock Clerk', timeIn: '08:15 AM', timeOut: null, status: 'late' },
  { id: 4, pin: '1004', name: 'Mona Youssef', role: 'Cashier', timeIn: null, timeOut: null, status: 'absent' },
];

export default function HR() {
  const { t } = useTranslation();
  const [pinInput, setPinInput] = useState('');
  const [attendanceData, setAttendanceData] = useState(initialAttendance);
  const [lastAction, setLastAction] = useState(null); // لعرض رسالة نجاح التسجيل
  const inputRef = useRef(null);

  // تركيز تلقائي على حقل الباركود عند فتح الصفحة ليكون جاهزاً للمسح
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // دالة معالجة الباركود أو الـ PIN عند الضغط على Enter
  const handleCheckIn = (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    const employeeIndex = attendanceData.findIndex(emp => emp.pin === pinInput.trim());
    
    if (employeeIndex !== -1) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const updatedData = [...attendanceData];
      const emp = updatedData[employeeIndex];

      // منطق مبسط: إذا لم يسجل دخول نسجله، وإذا سجل دخوله مسبقاً نسجل خروجه
      if (!emp.timeIn) {
        emp.timeIn = currentTime;
        emp.status = 'present';
        setLastAction({ type: 'success', msg: `${emp.name} Checked IN at ${currentTime}` });
      } else if (!emp.timeOut) {
        emp.timeOut = currentTime;
        setLastAction({ type: 'success', msg: `${emp.name} Checked OUT at ${currentTime}` });
      } else {
        setLastAction({ type: 'error', msg: `${emp.name} has already completed their shift.` });
      }

      setAttendanceData(updatedData);
    } else {
      setLastAction({ type: 'error', msg: 'Invalid PIN or Barcode not recognized!' });
    }

    // مسح الحقل استعداداً للعامل التالي
    setPinInput('');
    inputRef.current.focus();
    
    // إخفاء الرسالة بعد 3 ثوانٍ
    setTimeout(() => setLastAction(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t('hr.title')}</h1>
        <p className="text-sm text-slate-500 mt-1">{t('hr.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* القسم الأيسر: قارئ الباركود (Scanner) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                <ScanBarcode size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">{t('hr.scanner.title')}</h2>
            </div>

            <form onSubmit={handleCheckIn} className="space-y-4">
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder={t('hr.scanner.placeholder')}
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-blue-500 rounded-lg px-4 py-4 text-center text-xl text-white tracking-widest placeholder-slate-600 transition-colors outline-none"
                  autoComplete="off"
                />
                <p className="text-xs text-slate-500 text-center mt-2">
                  Scanner acts as keyboard. Focus field and scan.
                </p>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                {t('hr.scanner.submit')}
              </button>
            </form>

            {/* رسائل النجاح أو الخطأ */}
            {lastAction && (
              <div className={`mt-4 p-3 rounded-lg text-sm text-center border ${
                lastAction.type === 'success' 
                  ? 'bg-emerald-950/50 border-emerald-900 text-emerald-400' 
                  : 'bg-red-950/50 border-red-900 text-red-400'
              }`}>
                {lastAction.msg}
              </div>
            )}
          </div>

          {/* بطاقات الإحصائيات (KPIs) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
              <UserCheck size={24} className="text-emerald-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-xs text-slate-500 uppercase">{t('hr.kpi.present')}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
              <AlertCircle size={24} className="text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">1</p>
              <p className="text-xs text-slate-500 uppercase">{t('hr.kpi.absent')}</p>
            </div>
          </div>
        </div>

        {/* القسم الأيمن: جدول حضور اليوم */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
            <h3 className="font-medium text-white flex items-center gap-2">
              <Users size={18} className="text-slate-400" />
              Today's Attendance
            </h3>
            <span className="text-xs text-slate-500">{new Date().toLocaleDateString()}</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('hr.table.name')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('hr.table.timeIn')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('hr.table.timeOut')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('hr.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((emp) => (
                  <tr key={emp.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.role} (PIN: {emp.pin})</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {emp.timeIn ? (
                        <span className="flex items-center gap-1"><Clock size={14} className="text-emerald-400"/> {emp.timeIn}</span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {emp.timeOut ? (
                        <span className="flex items-center gap-1"><Clock size={14} className="text-slate-400"/> {emp.timeOut}</span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        emp.status === 'present' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 
                        emp.status === 'late' ? 'bg-amber-950 text-amber-400 border border-amber-900' : 
                        'bg-red-950 text-red-400 border border-red-900'
                      }`}>
                        {t(`hr.status.${emp.status}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
```

---

## الملف: `frontend\src\components\pages\Login.jsx`

```javascript

```

---

## الملف: `frontend\src\components\pages\Suppliers.jsx`

```javascript
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel,
  getSortedRowModel,
  flexRender 
} from '@tanstack/react-table';
import { Plus, Search, MoreHorizontal, ArrowUpDown } from 'lucide-react';

// بيانات وهمية مؤقتة حتى نقوم بربطها بقاعدة بيانات SQLite لاحقاً
const mockData = [
  { id: 1, name: 'ULTRA JOY Inc.', phone: '0555-123-456', totalDebt: 150000 },
  { id: 2, name: 'Cevital Group', phone: '0770-987-654', totalDebt: 0 },
  { id: 3, name: 'Soummam Dairy', phone: '0661-222-333', totalDebt: 45000 },
  { id: 4, name: 'Bifrut', phone: '0550-111-222', totalDebt: 12000 },
];

export default function Suppliers() {
  const { t } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState('');

  // تعريف أعمدة الجدول
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button 
          className="flex items-center gap-2 hover:text-white transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('suppliers.table.name')}
          <ArrowUpDown size={14} />
        </button>
      ),
      cell: (info) => <span className="font-medium text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'phone',
      header: t('suppliers.table.phone'),
      cell: (info) => <span className="text-slate-400">{info.getValue() || '-'}</span>,
    },
    {
      accessorKey: 'totalDebt',
      header: t('suppliers.table.totalDebt'),
      cell: (info) => {
        const amount = info.getValue();
        return (
          <span className={`font-bold ${amount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {amount.toLocaleString()} DA
          </span>
        );
      },
    },
    {
      id: 'status',
      header: t('suppliers.table.status'),
      cell: ({ row }) => {
        const amount = row.original.totalDebt;
        const isClear = amount === 0;
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            isClear 
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' 
              : 'bg-red-950 text-red-400 border border-red-900'
          }`}>
            {isClear ? t('suppliers.status.clear') : t('suppliers.status.indebted')}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: t('suppliers.table.actions'),
      cell: () => (
        <div className="flex items-center gap-3">
          <button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-700 transition-colors">
            {t('suppliers.actions.pay')}
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      ),
    },
  ], [t]);

  // تهيئة جدول TanStack
  const table = useReactTable({
    data: mockData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      {/* القسم العلوي: العنوان وزر الإضافة */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('suppliers.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('suppliers.subtitle')}</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors">
          <Plus size={18} />
          <span>{t('suppliers.addSupplier')}</span>
        </button>
      </div>

      {/* حاوية البحث والجدول */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        
        {/* شريط البحث */}
        <div className="p-4 border-b border-slate-800 flex items-center">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder={t('suppliers.searchPlaceholder')}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* الجدول */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-slate-800 bg-slate-950/50">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4 text-sm font-medium text-slate-400 whitespace-nowrap">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 text-sm whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* حالة عدم وجود نتائج */}
        {table.getRowModel().rows.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No results found.
          </div>
        )}
        
      </div>
    </div>
  );
}
```

---

## الملف: `frontend\src\locales\en\translation.json`

```json
{
  "common": {
    "search": "Search...",
    "superAdmin": "Super Admin",
    "systemOwner": "System Owner"
  },
  "sidebar": {
    "dashboard": "Dashboard",
    "suppliers": "Suppliers",
    "hr": "HR & Staff",
    "expenses": "Expenses",
    "agenda": "Agenda"
  },
  "dashboard": {
    "title": "Dashboard",
    "subtitle": "System overview & financial metrics",
    "quickAction": "Quick Action",
    "kpi": {
      "totalDebts": "Total Debts (Suppliers)",
      "dueThisWeek": "Due This Week",
      "activeEmployees": "Active Employees",
      "expenses": "Expenses & Advances"
    },
    "charts": {
      "topCreditors": "Top 5 Creditors",
      "expensesDist": "Expenses Distribution"
    },
    "lists": {
      "urgentAlerts": "Urgent Agenda Alerts",
      "recentAudit": "Recent Audit Logs"
    },
    "actions": {
      "payNow": "Pay Now"
    }
  }
    ,


  "suppliers": {
    "title": "Suppliers & Debts",
    "subtitle": "Manage supplier accounts and unpaid invoices",
    "addSupplier": "New Supplier",
    "searchPlaceholder": "Search suppliers by name or phone...",
    "table": {
      "name": "Supplier Name",
      "phone": "Phone Number",
      "totalDebt": "Total Debt",
      "status": "Status",
      "actions": "Actions"
    },
    "status": {
      "clear": "Clear (No Debt)",
      "indebted": "Indebted"
    },
    "actions": {
      "view": "View Details",
      "pay": "Make Payment"
    }
  }

  ,

  
  "hr": {
    "title": "HR & Staff",
    "subtitle": "Manage attendance, shifts, and employee records",
    "scanner": {
      "title": "Time Clock (Check-In / Out)",
      "placeholder": "Scan Barcode or Enter PIN...",
      "submit": "Record"
    },
    "kpi": {
      "present": "Present Today",
      "absent": "Absent",
      "late": "Late"
    },
    "table": {
      "name": "Employee Name",
      "role": "Position",
      "timeIn": "Time In",
      "timeOut": "Time Out",
      "status": "Status"
    },
    "status": {
      "present": "Present",
      "absent": "Absent",
      "late": "Late"
    }
  }
}


```

---

## الملف: `frontend\store\authStore.js`

```javascript

```

---


```

---

## `project_structure10.md`

```markdown

```

---

## `backend\database.js`

```javascript
const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

const dbPath = path.join(app.getPath('userData'), 'pos_manager1.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

function initDatabase() {
  try {
    db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'admin')`).run();
    
    const checkAdmin = db.prepare("SELECT COUNT(*) as count FROM users WHERE username = 'admin'").get();
    if (checkAdmin.count === 0) {
      db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run('admin', 'admin', 'admin');
    }

    db.prepare(`CREATE TABLE IF NOT EXISTS suppliers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT, initial_debt REAL DEFAULT 0, total_debt REAL DEFAULT 0, status TEXT DEFAULT 'clear', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS receipts (id INTEGER PRIMARY KEY AUTOINCREMENT, supplier_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, note TEXT, pdf_path TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (supplier_id) REFERENCES suppliers(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS payments (id INTEGER PRIMARY KEY AUTOINCREMENT, supplier_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT, note TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (supplier_id) REFERENCES suppliers(id))`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, role TEXT, pin_code TEXT UNIQUE, status TEXT DEFAULT 'active', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, date TEXT NOT NULL, time_in TEXT, time_out TEXT, status TEXT DEFAULT 'present', FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, category TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    
    // إنشاء جدول الأجندة
    db.prepare(`CREATE TABLE IF NOT EXISTS agenda_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, type TEXT NOT NULL, task_date TEXT NOT NULL, task_time TEXT, status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();

    // إضافة حقل المبلغ لجدول الأجندة (مع تخطي الخطأ إذا كان موجوداً مسبقاً)
    try {
      db.prepare("ALTER TABLE agenda_tasks ADD COLUMN amount REAL DEFAULT 0").run();
    } catch (innerError) {
      // نتجاهل الخطأ بصمت لأن العمود موجود بالفعل
    }

    db.prepare(`CREATE TABLE IF NOT EXISTS advances (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      employee_id INTEGER NOT NULL, 
      amount REAL NOT NULL, 
      date TEXT NOT NULL, 
      caisse_source TEXT, 
      note TEXT, 
      status TEXT DEFAULT 'pending', 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    )`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS salaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      employee_id INTEGER NOT NULL, 
      start_date TEXT NOT NULL, 
      end_date TEXT NOT NULL, 
      total_hours REAL NOT NULL, 
      hourly_rate REAL NOT NULL, 
      total_advances REAL NOT NULL, 
      net_salary REAL NOT NULL, 
      payment_date TEXT NOT NULL, 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    )`).run();
    
    // 1. إضافة جدول الورديات (Shifts)
    db.prepare(`CREATE TABLE IF NOT EXISTS shifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cashier_name TEXT NOT NULL,
      opening_balance REAL NOT NULL,
      start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      end_time DATETIME,
      actual_cash REAL,
      difference REAL,
      status TEXT DEFAULT 'open',
      note TEXT
    )`).run();

    const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='shifts'").get();
    if (tableCheck) {
      console.log("✅ Shifts table created successfully!");
    } else {
      console.log("❌ Shifts table was not created.");
    }

    console.log('تمت تهيئة قاعدة البيانات بنجاح');
  } catch (error) {
    console.error('خطأ أثناء تهيئة قاعدة البيانات:', error);
  }
}

// الدالة المعدلة لجلب المصاريف بشكل موحد
function getExpenses() {
  return db.prepare(`
    SELECT id, description, category, amount, date, 'expense' as source 
    FROM expenses 
    UNION ALL 
    SELECT a.id, e.name || (CASE WHEN a.note != '' THEN ' - ' || a.note ELSE '' END) as description, 'advance' as category, a.amount, a.date, 'advance' as source 
    FROM advances a
    JOIN employees e ON a.employee_id = e.id
    UNION ALL
    SELECT p.id, s.name || (CASE WHEN p.note != '' THEN ' - ' || p.note ELSE '' END) as description, 'supplier_payment' as category, p.amount, p.date, 'supplier_payment' as source 
    FROM payments p
    JOIN suppliers s ON p.supplier_id = s.id
    ORDER BY date DESC, id DESC
  `).all();
}

// 2. دوال التحكم في الورديات الجديدة
function openShift(data) {
  const activeShift = db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(data.cashierName);
  if (activeShift) return { success: false, message: 'لديك وردية مفتوحة بالفعل.' };

  const info = db.prepare('INSERT INTO shifts (cashier_name, opening_balance) VALUES (?, ?)').run(data.cashierName, data.openingBalance);
  return { success: true, shiftId: info.lastInsertRowid };
}

function getActiveShift(cashierName) {
  return db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(cashierName);
}

function closeShift(data) {
  const endTime = new Date().toISOString();
  db.prepare(`
    UPDATE shifts 
    SET end_time = ?, actual_cash = ?, difference = ?, status = 'closed', note = ?
    WHERE id = ?
  `).run(endTime, data.actualCash, data.difference, data.note, data.shiftId);
  return { success: true };
}



function getShiftSummary(cashierName, startTime) {
  try {
    let paymentsRow, advancesRow;
    const expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ?").get(startTime);

    // إذا كان المستخدم هو المدير العام، نجمع كل الأموال الخارجة بغض النظر عن الكاشير
    if (cashierName === 'المدير العام' || cashierName === 'Super Admin' || cashierName === 'admin') {
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ?").get(startTime);
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ?").get(startTime);
    } else {
      // إذا كان كاشير عادي، نجمع مبالغه هو فقط
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime);
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime);
    }

    const totalExp = expensesRow.total || 0;
    const totalPay = paymentsRow.total || 0;
    const totalAdv = advancesRow.total || 0;

    return {
      success: true,
      data: {
        expenses: totalExp,
        supplierPayments: totalPay,
        advances: totalAdv,
        totalOut: totalExp + totalPay + totalAdv
      }
    };
  } catch (error) {
    console.error("Database Error in getShiftSummary:", error);
    return { success: false, error: error.message };
  }
}



function getUsers() {
  return db.prepare("SELECT id, username, role FROM users").all();
}


function addUser(data) {
  try {
    const info = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(data.username, data.password, data.role || 'cashier');
    return { success: true, id: info.lastInsertRowid };
  } catch (error) {
    return { success: false, message: 'اسم المستخدم موجود بالفعل' };
  }
}



function deleteUser(id) {
  try {
    // نمنع حذف حساب الأدمن الأساسي لحماية النظام
    db.prepare("DELETE FROM users WHERE id = ? AND username != 'admin'").run(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}





function addExpense(expense) {
  const stmt = db.prepare('INSERT INTO expenses (description, category, amount, date) VALUES (?, ?, ?, ?)');
  const date = expense.date || new Date().toISOString().split('T')[0];
  const info = stmt.run(expense.description, expense.category, expense.amount, date);
  return { success: true, id: info.lastInsertRowid };
}

function deleteExpense(id) { return { success: db.prepare('DELETE FROM expenses WHERE id = ?').run(id).changes > 0 }; }

function updateExpense(id, expense) { return { success: db.prepare('UPDATE expenses SET description = ?, category = ?, amount = ? WHERE id = ?').run(expense.description, expense.category, expense.amount, id).changes > 0 }; }

function verifyLogin(username, password) {
  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);
    if (user) return { success: true, user: { id: user.id, username: user.username, role: user.role } };
    return { success: false, message: 'Invalid username or password' };
  } catch (error) { return { success: false, message: error.message }; }
}

function getEmployees() { return db.prepare('SELECT * FROM employees').all(); }

function addEmployee(employeeData) {
  const info = db.prepare(`INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)`).run(employeeData.name, employeeData.role, employeeData.pinCode);
  return db.prepare("SELECT * FROM employees WHERE id = ?").get(info.lastInsertRowid);
}

function handlePinEntry(pinCode) {
  const employee = db.prepare("SELECT * FROM employees WHERE pin_code = ?").get(pinCode);
  if (!employee) return { success: false, message: 'رمز PIN غير صحيح' };
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toLocaleTimeString('en-US', { hour12: false });
  const record = db.prepare("SELECT * FROM attendance WHERE employee_id = ? AND date = ?").get(employee.id, today);
  if (!record) {
    db.prepare("INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)").run(employee.id, today, now);
    return { success: true, action: 'check_in', employeeName: employee.name, time: now };
  } else if (!record.time_out) {
    db.prepare("UPDATE attendance SET time_out = ? WHERE id = ?").run(now, record.id);
    return { success: true, action: 'check_out', employeeName: employee.name, time: now };
  } else {
    return { success: false, message: `الموظف ${employee.name} أتم تسجيل الحضور والانصراف اليوم` };
  }
}

function getTodayAttendance(date) { 
  return db.prepare(`
    SELECT a.*, e.name as employee_name, e.role 
    FROM attendance a 
    JOIN employees e ON a.employee_id = e.id 
    WHERE a.date = ? 
    ORDER BY a.time_in DESC
  `).all(date); 
}

function getSuppliers() { return db.prepare("SELECT * FROM suppliers ORDER BY id DESC").all(); }

function addSupplier(supplierData) {
  const status = supplierData.initialDebt > 0 ? 'indebted' : 'clear';
  const info = db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`).run(supplierData.name, supplierData.phone, supplierData.initialDebt, supplierData.initialDebt, status);
  return db.prepare("SELECT * FROM suppliers WHERE id = ?").get(info.lastInsertRowid);
}

function getSupplierDetails(supplierId) {
  const supplier = db.prepare('SELECT * FROM suppliers WHERE id = ?').get(supplierId);
  if (!supplier) return null;
  const receipts = db.prepare('SELECT * FROM receipts WHERE supplier_id = ? ORDER BY date DESC').all(supplierId);
  const payments = db.prepare('SELECT * FROM payments WHERE supplier_id = ? ORDER BY date DESC').all(supplierId);
  return { ...supplier, receipts, payments };
}

function deleteAgendaTask(id) {
  try {
    db.prepare("DELETE FROM agenda_tasks WHERE id = ?").run(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

function rescheduleAgendaTask(id, newDate) {
  try {
    db.prepare("UPDATE agenda_tasks SET task_date = ? WHERE id = ?").run(newDate, id);
    return { success: true };
  } catch (error) {
    console.error('Error rescheduling task:', error);
    throw error;
  }
}

const addReceipt = db.transaction((data) => {
  try {
    const supplierId = Number(data.supplierId);
    const amount = Number(data.amount) || 0;
    const date = data.date || new Date().toISOString().split('T')[0];
    const note = data.note || '';

    const info = db.prepare('INSERT INTO receipts (supplier_id, amount, date, note) VALUES (?, ?, ?, ?)').run(supplierId, amount, date, note);
    db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = 'indebted' WHERE id = ?").run(amount, supplierId);
    
    return info.lastInsertRowid;
  } catch (error) {
    throw error; 
  }
});

const addPayment = db.transaction((data) => {
  try {
    const { supplierId, amount, date, caisseSource, note } = data;
    const info = db.prepare('INSERT INTO payments (supplier_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(supplierId, amount, date, caisseSource || 'Caisse 1', note);
    const updateStmt = db.prepare(`UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?`);
    updateStmt.run(amount, amount, supplierId);
    return info.lastInsertRowid;
  } catch (error) {
    throw error;
  }
});

function getAdvances(employeeId) {
  if (employeeId) return db.prepare("SELECT * FROM advances WHERE employee_id = ? ORDER BY date DESC").all(employeeId);
  return db.prepare("SELECT a.*, e.name as employee_name FROM advances a JOIN employees e ON a.employee_id = e.id ORDER BY a.date DESC").all();
}

function addAdvance(data) {
  const info = db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.employeeId, data.amount, data.date, data.caisseSource || 'Admin', data.note || '');
  return { success: true, id: info.lastInsertRowid };
}

function getSalaries() {
  return db.prepare("SELECT s.*, e.name as employee_name FROM salaries s JOIN employees e ON s.employee_id = e.id ORDER BY s.payment_date DESC, s.id DESC").all();
}

function calculateEmployeePayroll(employeeId, startDate, endDate, hourlyRate) {
  const attendances = db.prepare(`SELECT * FROM attendance WHERE employee_id = ? AND date >= ? AND date <= ?`).all(employeeId, startDate, endDate);
  let totalHours = 0;
  attendances.forEach(record => {
    if (record.time_in && record.time_out) {
        const tIn = record.time_in.split(':');
        const tOut = record.time_out.split(':');
        const dIn = new Date(2000, 0, 1, tIn[0], tIn[1], tIn[2] || 0);
        const dOut = new Date(2000, 0, 1, tOut[0], tOut[1], tOut[2] || 0);
        let diff = (dOut - dIn) / (1000 * 60 * 60);
        if (diff < 0) diff += 24;
        totalHours += diff;
    }
  });
  const pendingAdvancesInfo = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE employee_id = ? AND status = 'pending'`).get(employeeId);
  const pendingAdvances = pendingAdvancesInfo.total || 0;
  const grossSalary = totalHours * hourlyRate;
  const netSalary = grossSalary - pendingAdvances;

  return {
    employeeId, startDate, endDate, totalHours: Number(totalHours.toFixed(2)),
    hourlyRate, grossSalary: Number(grossSalary.toFixed(2)),
    totalAdvances: pendingAdvances, netSalary: Number(netSalary.toFixed(2))
  };
}

const paySalary = db.transaction((data) => {
  try {
    const empId = Number(data.employeeId);
    const tHours = Number(data.totalHours) || 0;
    const hRate = Number(data.hourlyRate) || 0;
    const tAdvances = Number(data.totalAdvances) || 0;
    const nSalary = Number(data.netSalary) || 0;
    const sDate = data.startDate || '';
    const eDate = data.endDate || '';
    const pDate = data.date || new Date().toISOString().split('T')[0];

    db.prepare(`INSERT INTO salaries (employee_id, start_date, end_date, total_hours, hourly_rate, total_advances, net_salary, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(
      empId, sDate, eDate, tHours, hRate, tAdvances, nSalary, pDate
    );
    
    db.prepare(`UPDATE advances SET status = 'paid' WHERE employee_id = ? AND status = 'pending'`).run(empId);
    
    if (nSalary < 0) {
      const remainingDebt = Math.abs(nSalary);
      const rollNote = data.rolloverNote || `ترحيل ديون سلفيات (${sDate} إلى ${eDate})`;
      db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note, status) VALUES (?, ?, ?, ?, ?, ?)').run(
        empId, remainingDebt, pDate, 'System', rollNote, 'pending'
      );
    } else if (nSalary > 0) {
      const expNote = data.expenseNote || `راتب (أسبوع: ${sDate} إلى ${eDate})`;
      db.prepare(`INSERT INTO expenses (description, category, amount, date) VALUES (?, ?, ?, ?)`).run(
        expNote, 'salaries', nSalary, pDate
      );
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

function getAgendaTasks() {
  return db.prepare("SELECT * FROM agenda_tasks ORDER BY task_date ASC, task_time ASC").all();
}

function addAgendaTask(data) {
  const info = db.prepare('INSERT INTO agenda_tasks (title, type, task_date, task_time, amount) VALUES (?, ?, ?, ?, ?)').run(
    data.title, 
    data.type, 
    data.date, 
    data.time || '', 
    data.amount || 0
  );
  return { ...data, id: info.lastInsertRowid, status: 'pending' };
}

function toggleAgendaTaskStatus(id, status) {
  db.prepare('UPDATE agenda_tasks SET status = ? WHERE id = ?').run(status, id);
  return { success: true };
}

function getDueThisWeek() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const todayStr = today.toISOString().split('T')[0];
  const nextWeekStr = nextWeek.toISOString().split('T')[0];

  const result = db.prepare(`
    SELECT SUM(amount) as total 
    FROM agenda_tasks 
    WHERE type = 'payment' AND status = 'pending' 
    AND task_date >= ? AND task_date <= ?
  `).get(todayStr, nextWeekStr);
  
  return result.total || 0;
}

function getDailySummary(date) {
  try {
    const expensesRow = db.prepare(`SELECT SUM(amount) as total FROM expenses WHERE date = ?`).get(date);
    const totalExpenses = expensesRow.total || 0;

    const paymentsRow = db.prepare(`SELECT SUM(amount) as total FROM payments WHERE date = ?`).get(date);
    const totalPayments = paymentsRow.total || 0;

    const advancesRow = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE date = ?`).get(date);
    const totalAdvances = advancesRow.total || 0;

    const totalOut = totalExpenses + totalPayments + totalAdvances;

    return {
      success: true,
      data: {
        expenses: totalExpenses,
        supplierPayments: totalPayments,
        advances: totalAdvances,
        totalOut: totalOut
      }
    };
  } catch (error) {
    console.error("Database Error in getDailySummary:", error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, addEmployee, 
  handlePinEntry, getExpenses, addExpense, deleteExpense, updateExpense, getTodayAttendance,
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary,
  getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask , getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary // دوال الورديات الجديدة المصدرة
};
```

---

## `backend\main.js`

```javascript
const { app, BrowserWindow, ipcMain , Notification } = require('electron');
const db = require('./database'); 
const path = require('path');
const { 
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, 
  addEmployee, handlePinEntry, getExpenses, addExpense, deleteExpense, 
  updateExpense, getTodayAttendance, 
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary , getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask , getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary // الدوال الجديدة
} = require('./database');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
  });

  win.setMenuBarVisibility(false);
  win.loadURL('http://localhost:5173');
  win.once('ready-to-show', () => win.show());
}

function setupIpcHandlers() {
  ipcMain.handle('login', async (event, credentials) => verifyLogin(credentials.username, credentials.password));

  ipcMain.handle('get-suppliers', () => getSuppliers());
  ipcMain.handle('add-supplier', (event, data) => addSupplier(data));
  
  ipcMain.handle('get-supplier-details', (event, id) => getSupplierDetails(id));
  ipcMain.handle('add-receipt', (event, data) => {
    try { return { success: true, id: addReceipt(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });
  ipcMain.handle('add-payment', (event, data) => {
    try { return { success: true, id: addPayment(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });

  ipcMain.handle('get-expenses', () => getExpenses());
  ipcMain.handle('add-expense', (event, data) => addExpense(data));
  ipcMain.handle('delete-expense', (event, id) => deleteExpense(id));
  ipcMain.handle('update-expense', (event, data) => updateExpense(data.id, data.expense));

  ipcMain.handle('get-employees', () => getEmployees());
  ipcMain.handle('add-employee', (event, data) => addEmployee(data));
  ipcMain.handle('handle-pin-entry', (event, pinCode) => handlePinEntry(pinCode));
  ipcMain.handle('get-today-attendance', (event, date) => getTodayAttendance(date));

  ipcMain.handle('get-advances', (e, empId) => getAdvances(empId));
  ipcMain.handle('add-advance', (e, data) => addAdvance(data));
  ipcMain.handle('get-salaries', () => getSalaries());
  ipcMain.handle('calculate-payroll', (e, params) => {
    return calculateEmployeePayroll(params.employeeId, params.startDate, params.endDate, params.hourlyRate);
  });
  ipcMain.handle('pay-salary', (e, data) => {
    try { return paySalary(data); } catch (err) { return { success: false, error: err.message }; }
  });

  ipcMain.handle('get-agenda-tasks', () => getAgendaTasks());
  ipcMain.handle('add-agenda-task', (event, data) => addAgendaTask(data));
  ipcMain.handle('toggle-agenda-task-status', (event, id, status) => toggleAgendaTaskStatus(id, status));
  ipcMain.handle('get-due-this-week', () => getDueThisWeek());

  ipcMain.handle('delete-agenda-task', async (event, id) => {
    return deleteAgendaTask(id);
  });

  ipcMain.handle('reschedule-agenda-task', async (event, id, newDate) => {
    return rescheduleAgendaTask(id, newDate);
  });

  ipcMain.handle('get-daily-summary', async (event, date) => {
    return getDailySummary(date);
  });

  // --- مسارات الورديات (Shifts) الجديدة ---
  ipcMain.handle('open-shift', async (event, data) => openShift(data));
  ipcMain.handle('get-active-shift', async (event, cashierName) => getActiveShift(cashierName));
  ipcMain.handle('close-shift', async (event, data) => closeShift(data));
  ipcMain.handle('get-shift-summary', async (event, cashierName, startTime) => getShiftSummary(cashierName, startTime));
}

ipcMain.on('show-notification', (event, data) => {
  if (Notification.isSupported()) {
    new Notification({
      title: data?.title || 'تنبيهات النظام ⚠️',
      body: data?.body || 'لديك مهام مستحقة تحتاج إلى مراجعة',
      icon: path.join(__dirname, 'assets', 'icon.png') 
    }).show();
  }
});

ipcMain.handle('get-users', () => db.getUsers());
  ipcMain.handle('add-user', (event, data) => db.addUser(data));
  ipcMain.handle('delete-user', (event, id) => db.deleteUser(id));

  
app.whenReady().then(() => {
  initDatabase();
  setupIpcHandlers();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

---

## `backend\package.json`

```json
{
  "name": "pos-manager",
  "version": "1.0.0",
  "description": "Offline Supermarket Management System",
  "author": "Cherif <midouma25@gmail.com>",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
  },
  "build": {
    "appId": "com.cherif.posmanager",
    "productName": "POS Manager",
    "electronVersion": "30.0.0",
    "directories": {
      "output": "release"
    },
    "files": [
      "main.js",
      "preload.js",
      "database.js",
      "dist/**/*",
      "package.json"
    ],
    "win": {
      "target": "nsis",
      "icon": "build/icon.ico"
    },
    "asar": true
  },
  "dependencies": {
    "better-sqlite3": "^12.11.1"
  },
  "devDependencies": {
    "@electron/rebuild": "^4.2.0",
    "electron": "^43.1.1",
    "electron-builder": "^24.13.3"
  }
}

```

---

## `backend\preload.js`

```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  login: (credentials) => ipcRenderer.invoke('login', credentials),
  
  getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
  addSupplier: (data) => ipcRenderer.invoke('add-supplier', data),
  getSupplierDetails: (id) => ipcRenderer.invoke('get-supplier-details', id),
  addReceipt: (data) => ipcRenderer.invoke('add-receipt', data),
  addPayment: (data) => ipcRenderer.invoke('add-payment', data),
  
  getEmployees: () => ipcRenderer.invoke('get-employees'),
  addEmployee: (data) => ipcRenderer.invoke('add-employee', data),
  handlePinEntry: (pinCode) => ipcRenderer.invoke('handle-pin-entry', pinCode),
  getTodayAttendance: (date) => ipcRenderer.invoke('get-today-attendance', date),
  
  getExpenses: () => ipcRenderer.invoke('get-expenses'),
  addExpense: (data) => ipcRenderer.invoke('add-expense', data),
  deleteExpense: (id) => ipcRenderer.invoke('delete-expense', id),
  updateExpense: (id, expense) => ipcRenderer.invoke('update-expense', { id, expense }),

  getAdvances: (empId) => ipcRenderer.invoke('get-advances', empId),
  addAdvance: (data) => ipcRenderer.invoke('add-advance', data),
  getSalaries: () => ipcRenderer.invoke('get-salaries'),
  calculatePayroll: (params) => ipcRenderer.invoke('calculate-payroll', params),
  paySalary: (data) => ipcRenderer.invoke('pay-salary', data),

  getAgendaTasks: () => ipcRenderer.invoke('get-agenda-tasks'),
  addAgendaTask: (data) => ipcRenderer.invoke('add-agenda-task', data),
  toggleAgendaTaskStatus: (id, status) => ipcRenderer.invoke('toggle-agenda-task-status', id, status),
  getDueThisWeek: () => ipcRenderer.invoke('get-due-this-week'),

  getDailySummary: (date) => ipcRenderer.invoke('get-daily-summary', date),
  deleteAgendaTask: (id) => ipcRenderer.invoke('delete-agenda-task', id),
  rescheduleAgendaTask: (id, newDate) => ipcRenderer.invoke('reschedule-agenda-task', id, newDate),
  showNotification: (title, body) => ipcRenderer.send('show-notification', { title, body }),

  // --- مسارات الورديات (Shifts) الجديدة ---
  openShift: (data) => ipcRenderer.invoke('open-shift', data),
  getActiveShift: (cashierName) => ipcRenderer.invoke('get-active-shift', cashierName),
  closeShift: (data) => ipcRenderer.invoke('close-shift', data),
  getShiftSummary: (cashierName, startTime) => ipcRenderer.invoke('get-shift-summary', cashierName, startTime),

  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (data) => ipcRenderer.invoke('add-user', data),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
});
```

---

## `frontend\.oxlintrc.json`

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

```

---

## `frontend\App.jsx`

```javascript

```

---

## `frontend\README.md`

```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

```

---

## `frontend\index.css`

```css

```

---

## `frontend\index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

---

## `frontend\package.json`

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@tanstack/react-table": "^8.21.3",
    "i18next": "^26.3.6",
    "i18next-browser-languagedetector": "^8.2.1",
    "lucide-react": "^1.25.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-i18next": "^17.0.10",
    "react-router-dom": "^7.18.1",
    "recharts": "^3.10.0",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "autoprefixer": "^10.5.4",
    "oxlint": "^1.71.0",
    "postcss": "^8.5.20",
    "tailwindcss": "^4.3.3",
    "vite": "^8.1.1"
  }
}

```

---

## `frontend\postcss.config.js`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

---

## `frontend\tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## `frontend\vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // <-- هذا السطر السحري يخبر Vite باستخدام مسارات نسبية
})
```

---

## `frontend\src\App.jsx`

```javascript
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import useAuthStore from "./store/authStore";
import payrollStore from "./store/payrollStore";

// Layout & Pages
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/pages/Dashboard';
import Suppliers from './components/pages/Suppliers';
import HR from './components/pages/HR';
import Expenses from './components/pages/Expenses';
import Agenda from './components/pages/Agenda';
import Login from './components/pages/Login'; 
import Payroll from './components/pages/Payroll';
import EndOfDay from './components/EndOfDay';
import Settings from './components/UsersManagement';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* ✅ تم تصحيح مسار الإعدادات لتجنب التكرار */}
          <Route path="settings" element={<Settings />} /> 
          <Route path="end-of-day" element={<EndOfDay />} />
          <Route index element={<Dashboard />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="hr" element={<HR />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="agenda" element={<Agenda />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
```

---

## `frontend\src\i18n.js`

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

---

## `frontend\src\index.css`

```css
@import "tailwindcss";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## `frontend\src\main.jsx`

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

---

## `frontend\src\components\EndOfDay.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Lock, Calculator, Banknote, AlertCircle, Clock } from 'lucide-react';
import useAuthStore from '../store//authStore';

export default function EndOfDay() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const user = useAuthStore(state => state.user);
  const cashierName = (user?.role === 'superadmin' || user?.username === 'admin') ? t('common.superAdmin') : (user?.username || 'Cashier');

  const [activeShift, setActiveShift] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [openingBalanceInput, setOpeningBalanceInput] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const [notes, setNotes] = useState('');
  
  const [summary, setSummary] = useState({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0 });

  const fetchShiftData = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getActiveShift) {
        const shift = await window.api.getActiveShift(cashierName);
        if (shift) {
          setActiveShift(shift);
          
          // جلب ملخص المصاريف الخاص بهذه الوردية فقط
          const summaryRes = await window.api.getShiftSummary(cashierName, shift.start_time);
          if (summaryRes.success) {
            setSummary(summaryRes.data);
          }
        } else {
          setActiveShift(null);
          setSummary({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0 });
        }
      }
    } catch (error) {
      console.error("Error fetching shift:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShiftData();
  }, [cashierName]);

  const handleOpenShift = async (e) => {
    e.preventDefault();
    if (!openingBalanceInput) return;
    try {
      if (window.api && window.api.openShift) {
        const res = await window.api.openShift({ 
          cashierName, 
          openingBalance: Number(openingBalanceInput) 
        });
        if (res.success) {
          setOpeningBalanceInput('');
          fetchShiftData();
        } else {
          alert(res.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalOut = summary.totalOut || 0;
  const currentOpeningBalance = activeShift ? activeShift.opening_balance : 0;
  
  // حساب المبيعات (المداخيل الصافية): (النقد الفعلي + المصاريف الخارجة) - الرصيد الافتتاحي
  const todaySales = (actualAmount === '' || actualAmount === 0) 
    ? 0 
    : (Number(actualAmount) + totalOut) - Number(currentOpeningBalance);

  const handleCloseShift = async (e) => {
    e.preventDefault();
    if (actualAmount === '') return;
    
    if (window.confirm(t('eod.confirmClose'))) {
      try {
        if (window.api && window.api.closeShift) {
          const res = await window.api.closeShift({
            shiftId: activeShift.id,
            actualCash: Number(actualAmount),
            difference: todaySales, // نحفظ المبيعات/الفارق هنا
            note: notes
          });
          
          if (res.success) {
            alert(t('eod.closeSuccess'));
            setActiveShift(null);
            setActualAmount('');
            setNotes('');
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-slate-500">{t('hr.table.loading')}</div>;
  }

  // === الشاشة 1: فتح وردية جديدة ===
  if (!activeShift) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex items-center justify-center">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Play size={32} className="text-blue-500 ms-1" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('eod.open_shift_title')}</h1>
            <p className="text-slate-500 text-sm">{t('eod.open_shift_desc')} <span className="font-bold text-white">{cashierName}</span></p>
          </div>

          <form onSubmit={handleOpenShift} className="space-y-6 text-start">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.opening_balance')} (DA)</label>
              <div className="relative">
                <Banknote size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="number" 
                  min="0"
                  required
                  value={openingBalanceInput}
                  onChange={(e) => setOpeningBalanceInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 text-lg font-bold"
                  placeholder="0.00"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
              <Play size={18} /> {t('eod.open_shift_btn')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // === الشاشة 2: الوردية النشطة (إغلاق الوردية) ===
  const shiftStartTime = new Date(activeShift.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Lock className="text-red-500" /> {t('eod.title')}
          </h1>
          <p className="text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t('eod.active_shift')}: <strong className="text-white">{cashierName}</strong>
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3">
          <Clock className="text-blue-400" size={18} />
          <span className="text-sm font-medium">{t('hr.table.timeIn')}: {shiftStartTime}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-emerald-500">
          <h3 className="text-slate-400 text-sm mb-1">{t('eod.opening_balance')}</h3>
          <p className="text-2xl font-bold text-white">{currentOpeningBalance.toLocaleString()} {t('currency')}</p>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-red-500">
          <h3 className="text-slate-400 text-sm mb-1">{t('eod.total_deducted')}</h3>
          <p className="text-2xl font-bold text-red-400">{totalOut.toLocaleString()} {t('currency')}</p>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-blue-500">
          <h3 className="text-slate-400 text-sm mb-1">{t('eod.advances')} & {t('eod.supplier_payments')}</h3>
          <p className="text-2xl font-bold text-blue-400">{(summary.advances + summary.supplierPayments).toLocaleString()} {t('currency')}</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <form onSubmit={handleCloseShift} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-emerald-400 mb-2">{t('eod.actual_cash')}</label>
              <div className="relative">
                <Calculator size={20} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="number" 
                  min="0"
                  required
                  value={actualAmount} 
                  onChange={(e) => setActualAmount(e.target.value)}
                  className="w-full bg-slate-950 border-2 border-emerald-900/50 rounded-lg py-4 ps-12 pe-4 text-white focus:outline-none focus:border-emerald-500 text-2xl font-bold transition-colors"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> أَدخل المبلغ الإجمالي المتواجد في درج النقود حالياً.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.notes')}</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder="ملاحظات حول الإغلاق أو فوارق الدرج..."
              ></textarea>
            </div>
          </div>

          <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h3 className="text-slate-400 mb-2">{t('eod.today_sales')}</h3>
              <p className={`text-5xl font-bold ${todaySales > 0 ? 'text-emerald-400' : todaySales < 0 ? 'text-red-500' : 'text-slate-300'}`}>
                {todaySales > 0 ? '+' : ''}{todaySales.toLocaleString()} <span className="text-2xl text-slate-500">{t('currency')}</span>
              </p>
            </div>
            
            <button 
              type="submit"
              disabled={actualAmount === ''}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition duration-200 flex justify-center items-center gap-2 text-lg shadow-lg shadow-red-900/20"
            >
              <Lock size={24} /> {t('eod.save_btn')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
```

---

## `frontend\src\components\ExpensesPieChart.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ExpensesPieChart() {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (window.api && window.api.getExpenses) {
          const expenses = await window.api.getExpenses();
          
          // تجميع المصاريف حسب التصنيف
          const grouped = expenses.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
            return acc;
          }, {});

          // تحويل البيانات لشكل يقبله Recharts مع دمج الترجمة الذكية
          const formattedData = Object.keys(grouped).map(key => {
            const translated = t(`expenses.categories.${key}`);
            // تخطي مفتاح الترجمة إذا لم يكن موجوداً (مثل كلمة "رواتب" القديمة)
            const finalName = translated.includes('expenses.categories') ? key : translated;
            
            return {
              name: finalName, 
              value: grouped[key],
              category: key
            };
          });

          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Failed to load expenses for pie chart:", error);
      }
    };
    
    loadData();
  }, [t]); // إضافة t لتحديث المخطط فور تغيير اللغة

  // الألوان المخصصة حسب التصنيف (بما في ذلك التصنيفات الجديدة)
  const getCategoryColor = (category) => {
    switch (category) {
      case 'advance': return '#a855f7'; // Purple
      case 'supplier_payment': return '#f97316'; // Orange
      case 'utilities': return '#3b82f6'; // Blue
      case 'maintenance': return '#f59e0b'; // Amber
      case 'supplies': return '#10b981'; // Emerald
      case 'salaries':
      case 'رواتب': return '#ef4444'; // Red
      default: return '#64748b'; // Slate
    }
  };

  // إعدادات الـ Tooltip المظلمة
  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
  };

  if (chartData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-slate-500 text-sm">
        {t('common.noResults')}
      </div>
    );
  }

  return (
    <div className="h-full w-full" dir="ltr"> {/* فرض الاتجاه ltr ليحافظ المخطط على تنسيقه */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value.toLocaleString()} DA`, '']}
            contentStyle={customTooltipStyle}
            itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ color: '#cbd5e1', fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

## `frontend\src\components\UsersManagement.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, UserPlus, Trash2, Users, Key, AlertCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';

export default function Settings() {
  const { t } = useTranslation();
  const currentUser = useAuthStore(state => state.user);
  
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cashier'); // الافتراضي هو كاشير
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getUsers) {
        const data = await window.api.getUsers();
        setUsers(data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    try {
      if (window.api && window.api.addUser) {
        const res = await window.api.addUser({ username, password, role });
        if (res.success) {
          setUsername('');
          setPassword('');
          setRole('cashier');
          fetchUsers();
        } else {
          setError(res.message || 'حدث خطأ أثناء إضافة المستخدم');
        }
      }
    } catch (err) {
      setError('خطأ في الاتصال بقاعدة البيانات');
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (name === 'admin' || name === currentUser?.username) {
      alert('لا يمكنك حذف حسابك الحالي أو حساب المدير الأساسي.');
      return;
    }
    
    if (window.confirm(`هل أنت متأكد من حذف حساب (${name})؟`)) {
      try {
        if (window.api && window.api.deleteUser) {
          const res = await window.api.deleteUser(id);
          if (res.success) {
            fetchUsers();
          } else {
            alert(res.error || 'حدث خطأ أثناء الحذف');
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // حماية الصفحة: لا نسمح بدخول غير المدير
  if (currentUser?.role !== 'admin' && currentUser?.role !== 'superadmin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-red-500 text-xl font-bold gap-3">
        <AlertCircle size={32} /> عذراً، ليس لديك صلاحية للوصول إلى هذه الصفحة.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Shield className="text-blue-500" /> إدارة الحسابات والصلاحيات
        </h1>
        <p className="text-slate-500">إضافة وتعديل حسابات النظام (كاشير / مدير)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* فورم إضافة مستخدم جديد */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserPlus size={20} className="text-emerald-500" /> مستخدم جديد
            </h2>
            
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">اسم المستخدم</label>
                <div className="relative">
                  <Users size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-blue-500"
                    placeholder="مثال: cashier1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">كلمة المرور</label>
                <div className="relative">
                  <Key size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">الصلاحية (الرتبة)</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="cashier">كاشير (صلاحيات محدودة)</option>
                  <option value="admin">مدير (صلاحيات كاملة)</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                إضافة الحساب
              </button>
            </form>
          </div>
        </div>

        {/* جدول المستخدمين */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500">جاري التحميل...</div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 bg-slate-950/50 uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-start">اسم المستخدم</th>
                    <th className="px-6 py-4 text-start">الرتبة</th>
                    <th className="px-6 py-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-white text-start flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${u.role === 'admin' ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-900/50 text-emerald-400'}`}>
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        {u.username}
                      </td>
                      <td className="px-6 py-4 text-start">
                        {u.role === 'admin' ? (
                          <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">مدير عام</span>
                        ) : (
                          <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">كاشير</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleDeleteUser(u.id, u.username)}
                          disabled={u.username === 'admin' || u.username === currentUser?.username}
                          className="text-slate-500 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                          title="حذف الحساب"
                        >
                          <Trash2 size={18} className="mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-slate-500">لا يوجد مستخدمين.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
```

---

## `frontend\src\components\layout\MainLayout.jsx`

```javascript
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout() {
  const { i18n } = useTranslation();

  // تغيير اتجاه صفحة الويب بالكامل بناءً على لغة التطبيق
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans" dir={i18n.dir()}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

---

## `frontend\src\components\layout\Sidebar.jsx`

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, Briefcase, Receipt, Calendar, Banknote, Settings } from 'lucide-react';
import useAuthStore from "../../store/authStore"; // استيراد حالة المستخدم

export default function Sidebar() {
  const { t } = useTranslation();
  
  // معرفة هل المستخدم الحالي يمتلك صلاحيات مدير
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  // إضافة خاصية adminOnly للتحكم في ظهور الرابط
  const menuItems = [
    { path: '/', name: t('sidebar.dashboard'), icon: <LayoutDashboard size={20} />, adminOnly: true },
    { path: '/suppliers', name: t('sidebar.suppliers'), icon: <Users size={20} />, adminOnly: true },
    { path: '/hr', name: t('sidebar.hr'), icon: <Briefcase size={20} />, adminOnly: true },
    { path: '/expenses', name: t('sidebar.expenses'), icon: <Receipt size={20} />, adminOnly: true },
    { path: '/payroll', name: t('sidebar.payroll'), icon: <Banknote size={20} />, adminOnly: true },
    { path: '/agenda', name: t('sidebar.agenda'), icon: <Calendar size={20} />, adminOnly: true },
    { path: '/end-of-day', name: t('sidebar.end_of_day'), icon: <Calendar size={20} />, adminOnly: false }, // الكاشير يمكنه رؤية هذا
    { path: '/settings', name: t('sidebar.settings'), icon: <Settings size={20} />, adminOnly: true }, // صفحة الإعدادات للمدير فقط
  ];

  // فلترة القائمة بناءً على صلاحيات المستخدم
  const visibleItems = menuItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-wider">
          POS<span className="text-blue-500">Manager</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
```

---

## `frontend\src\components\layout\Topbar.jsx`

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, UserCircle, Globe, LogOut } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-64">
        <Search size={18} className="text-slate-500 mx-2" />
        <input 
          type="text" 
          placeholder={t('common.search')} 
          className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder-slate-600"
        />
      </div>

      <div className="flex items-center gap-4 text-slate-400">
        <button onClick={toggleLanguage} className="relative hover:text-white transition-colors bg-slate-900 p-2 rounded-lg border border-slate-800">
          <Globe size={18} />
        </button>

        <button className="relative hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-slate-950"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-800"></div>
        
        <div className="flex items-center gap-2">
          <UserCircle size={24} className="text-white" />
          <div className="text-sm">
            <p className="font-medium text-white leading-none">{t('common.superAdmin')}</p>
          </div>
        </div>

        {/* زر تسجيل الخروج */}
        <button 
          onClick={handleLogout}
          className="ml-2 p-2 hover:bg-red-950/50 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-900/50"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
```

---

## `frontend\src\components\pages\Agenda.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Calendar as CalendarIcon, CheckCircle2, Clock, Truck, Banknote, Wrench, Trash2, CalendarClock, AlertCircle } from 'lucide-react';
import Modal from '../ui/Modal';

export default function Agenda() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('all'); 
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const d = new Date();
  const todayString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  
  const currentMonthName = d.toLocaleString(i18n.language, { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const currentDay = d.getDate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (window.api && window.api.getAgendaTasks) {
          const data = await window.api.getAgendaTasks();
          // توحيد أسماء المتغيرات لتتوافق مع قاعدة البيانات
          const normalizedData = data.map(task => ({
            ...task,
            date: task.task_date || task.date,
            time: task.task_time || task.time
          }));
          setTasks(normalizedData);
        }
      } catch (error) {
        console.error("Failed to fetch agenda tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    const timeValue = e.target[3].value;
    let formattedTime = '';
    
    if (timeValue) {
      const timeParts = timeValue.split(':');
      let hours = parseInt(timeParts[0]);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; 
      formattedTime = `${hours.toString().padStart(2, '0')}:${timeParts[1]} ${ampm}`;
    }

    const newTask = {
      title: e.target[0].value,
      type: e.target[1].value,
      date: e.target[2].value,
      time: formattedTime,
      task_date: e.target[2].value,  // لتوافق الباك إند
      task_time: formattedTime,      // لتوافق الباك إند
      status: 'pending'
    };

    try {
      if (window.api && window.api.addAgendaTask) {
        const addedTask = await window.api.addAgendaTask(newTask);
        const normalizedTask = {
          ...addedTask,
          date: addedTask.task_date || newTask.date,
          time: addedTask.task_time || newTask.time
        };
        setTasks(prev => {
          const updated = [...prev, normalizedTask];
          return updated.sort((a, b) => new Date(`${a.date} ${a.time || '00:00'}`) - new Date(`${b.date} ${b.time || '00:00'}`));
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      if (window.api && window.api.toggleAgendaTaskStatus) {
        await window.api.toggleAgendaTaskStatus(id, newStatus);
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, status: newStatus } : task
        ));
      }
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
      try {
        if (window.api && window.api.deleteAgendaTask) {
          await window.api.deleteAgendaTask(id);
          setTasks(tasks.filter(task => task.id !== id));
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleReschedule = async (id, newDate) => {
    if (!newDate) return;
    try {
      if (window.api && window.api.rescheduleAgendaTask) {
        await window.api.rescheduleAgendaTask(id, newDate);
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, date: newDate, task_date: newDate } : task
        ));
      }
    } catch (error) {
      console.error("Error rescheduling task:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const overdueTasks = filteredTasks.filter(task => task.date && task.date < todayString && task.status === 'pending');
  const todayTasks = filteredTasks.filter(task => task.date === todayString);
  const upcomingTasks = filteredTasks.filter(task => task.date && task.date > todayString);

  const getTypeConfig = (type) => {
    switch (type) {
      case 'delivery': return { icon: <Truck size={16} />, color: 'text-blue-400 bg-blue-950 border-blue-900' };
      case 'payment': return { icon: <Banknote size={16} />, color: 'text-red-400 bg-red-950 border-red-900' };
      case 'maintenance': return { icon: <Wrench size={16} />, color: 'text-amber-400 bg-amber-950 border-amber-900' };
      default: return { icon: <Clock size={16} />, color: 'text-slate-400 bg-slate-800 border-slate-700' };
    }
  };

  const TaskCard = ({ task, isOverdue }) => {
    const typeConfig = getTypeConfig(task.type);
    const isCompleted = task.status === 'completed';
    const displayTime = task.time && task.time !== 'undefined' ? task.time : 'طوال اليوم';

    const cardStyle = isCompleted 
      ? 'bg-slate-900/50 border-slate-800/50 opacity-60' 
      : isOverdue
      ? 'bg-red-950/20 border-red-900/50 hover:border-red-800'
      : 'bg-slate-900 border-slate-800 hover:border-slate-700';

    return (
      <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${cardStyle}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => toggleTaskStatus(task.id, task.status)}
            className={`transition-colors ${isCompleted ? 'text-emerald-500' : isOverdue ? 'text-red-400 hover:text-red-300' : 'text-slate-600 hover:text-emerald-400'}`}
          >
            {isOverdue && !isCompleted ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
          </button>
          
          <div>
            <h4 className={`font-medium ${isCompleted ? 'text-slate-500 line-through' : isOverdue ? 'text-red-200' : 'text-white'}`}>
              {task.title}
            </h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}>
                <Clock size={14} /> {displayTime} {task.date !== todayString && `| ${task.date}`}
              </span>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${typeConfig.color}`}>
                {typeConfig.icon}
                {t(`agenda.types.${task.type}`)}
              </span>
              {task.amount > 0 && (
                <span className="font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">
                  {task.amount.toLocaleString()} DA
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isCompleted && (
            <div className="relative" title="تأجيل المهمة">
              <input 
                type="date" 
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" 
                onChange={(e) => handleReschedule(task.id, e.target.value)}
              />
              <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors">
                <CalendarClock size={18} />
              </button>
            </div>
          )}
          <button 
            onClick={() => handleDeleteTask(task.id)}
            title="حذف المهمة"
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('agenda.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('agenda.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          <span>{t('agenda.addTask')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4 text-white font-medium border-b border-slate-800 pb-3 capitalize">
              <CalendarIcon size={18} className="text-blue-400" />
              {currentMonthName}
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {[...Array(daysInMonth)].map((_, i) => (
                <div key={i} className={`p-1.5 rounded-md cursor-pointer hover:bg-slate-800 ${
                  i + 1 === currentDay ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 shadow-lg">
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-start px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === f ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                {t(`agenda.filters.${f}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          
          {overdueTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-red-400 mb-4 flex items-center gap-2 border-b border-red-900/50 pb-2">
                <AlertCircle size={18} />
                مهام متأخرة
              </h3>
              <div className="space-y-3">
                {overdueTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={true} />)}
              </div>
            </div>
          )}

          {todayTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                {t('agenda.sections.today')}
              </h3>
              <div className="space-y-3">
                {todayTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={false} />)}
              </div>
            </div>
          )}

          {upcomingTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-slate-400 mb-4 border-b border-slate-800 pb-2 mt-8">
                {t('agenda.sections.upcoming')}
              </h3>
              <div className="space-y-3">
                {upcomingTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={false} />)}
              </div>
            </div>
          )}

          {filteredTasks.length === 0 && (
            <div className="text-center p-12 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
              {t('common.noResults')}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('agenda.addTask')}>
        <form className="space-y-4" onSubmit={handleAddTask} dir="auto">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.taskTitleLabel')}</label>
            <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.taskTypeLabel')}</label>
            <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
              <option value="delivery">{t('agenda.types.delivery')}</option>
              <option value="payment">{t('agenda.types.payment')}</option>
              <option value="maintenance">{t('agenda.types.maintenance')}</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.dateLabel')}</label>
              <input type="date" defaultValue={todayString} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.timeLabel')} (اختياري)</label>
              <input type="time" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800">{t('agenda.modal.cancelBtn')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">{t('agenda.modal.saveBtn')}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
```

---

## `frontend\src\components\pages\Attendance.jsx`

```javascript
import React, { useState, useEffect } from "react";
import { Clock, LogIn, LogOut, AlertCircle, CheckCircle2 } from "lucide-react";
import useAttendanceStore from "../store/attendanceStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Attendance = () => {
  const { todayRecords, fetchTodayRecords, submitPin, isLoading } = useAttendanceStore();
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  // جلب سجلات اليوم عند فتح الصفحة
  useEffect(() => {
    fetchTodayRecords();
    
    // تحديث السجلات تلقائياً كل دقيقة (اختياري)
    const interval = setInterval(fetchTodayRecords, 60000);
    return () => clearInterval(interval);
  }, [fetchTodayRecords]);

  // دالة إرسال الرمز
  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput) return;

    const result = await submitPin(pinInput);
    
    if (result.success) {
      const actionText = result.action === 'check_in' ? 'تم تسجيل الدخول' : 'تم تسجيل الخروج';
      setFeedback({ 
        type: 'success', 
        message: `${actionText} بنجاح: ${result.employeeName} (${result.time})` 
      });
      fetchTodayRecords(); // تحديث الجدول فوراً
    } else {
      setFeedback({ type: 'error', message: result.message });
    }

    setPinInput(""); // تفريغ الحقل
    
    // إخفاء الرسالة بعد 4 ثوانٍ
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="flex gap-6 p-6 w-full text-slate-100 h-[calc(100vh-100px)]">
      
      {/* القسم الأيمن: إدخال الرمز (Terminal) */}
      <div className="w-1/3 bg-slate-900/80 rounded-xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* خلفية جمالية */}
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        
        <div className="bg-slate-800/50 p-4 rounded-full mb-6">
          <Clock size={48} className="text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">تسجيل الدخول / الخروج</h2>
        <p className="text-slate-400 mb-8 text-center text-sm">
          أدخل رمز PIN الخاص بك لتسجيل حضورك أو انصرافك
        </p>

        <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-4">
          <Input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="****"
            className="text-center text-4xl py-8 tracking-[1em] bg-slate-950 border-slate-700 shadow-inner"
            autoFocus
          />
          <Button 
            type="submit" 
            size="lg"
            className="w-full text-lg bg-blue-600 hover:bg-blue-700 h-14"
          >
            تأكيد الرمز
          </Button>
        </form>

        {/* رسائل التنبيه والنجاح */}
        {feedback && (
          <div className={`mt-6 w-full p-4 rounded-lg flex items-center justify-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-4
            ${feedback.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* القسم الأيسر: سجل اليوم */}
      <div className="w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h3 className="font-bold text-lg">سجل حركة الموظفين لليوم</h3>
          <span className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
            {new Date().toLocaleDateString('ar-DZ')}
          </span>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <Table dir="rtl">
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-right text-slate-400">الموظف</TableHead>
                <TableHead className="text-center text-slate-400">وقت الدخول</TableHead>
                <TableHead className="text-center text-slate-400">وقت الخروج</TableHead>
                <TableHead className="text-left text-slate-400">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">جاري التحديث...</TableCell>
                </TableRow>
              ) : todayRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                    لا توجد حركات تسجيل دخول حتى الآن اليوم.
                  </TableCell>
                </TableRow>
              ) : (
                todayRecords.map((record) => (
                  <TableRow key={record.id} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-right">
                      <div>{record.name}</div>
                      <div className="text-xs text-slate-400">{record.role}</div>
                    </TableCell>
                    
                    <TableCell className="text-center text-green-400">
                      <div className="flex items-center justify-center gap-2">
                        <LogIn size={14} /> {record.time_in}
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center text-orange-400">
                      {record.time_out ? (
                        <div className="flex items-center justify-center gap-2">
                          <LogOut size={14} /> {record.time_out}
                        </div>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </TableCell>

                    <TableCell className="text-left">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${!record.time_out 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                        {!record.time_out ? 'متواجد حالياً' : 'أنهى الدوام'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  );
};

export default Attendance;
```

---

## `frontend\src\components\pages\Dashboard.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, AlertCircle, Users, Wallet, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import ExpensesPieChart from '../ExpensesPieChart';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.dir() === 'rtl';
  const [urgentTasks, setUrgentTasks] = useState([]);
  const [stats, setStats] = useState({
    totalDebts: 0,
    totalExpenses: 0,
    presentEmployees: 0,
    totalEmployees: 0,
    topCreditors: [],
    dueThisWeek: 0,
  });
  

useEffect(() => {
    const fetchAndNotifyUrgentData = async () => {
      try {
        if (window.api && window.api.getAgendaTasks) {
          const tasks = await window.api.getAgendaTasks();
          
          const todayString = new Date().toISOString().split('T')[0];
          
          const urgent = tasks.filter(task => 
            ((task.task_date && task.task_date <= todayString) || 
             (task.date && task.date <= todayString)) && 
             task.status === 'pending'
          );
          
          setUrgentTasks(urgent);

if (urgent.length > 0) {
  const hasNotified = sessionStorage.getItem('notified_urgent_tasks');
  
  if (!hasNotified && window.api.showNotification) {
    // تجهيز النصوص صراحة لضمان عدم إرسال قيم فارغة
    const notifTitle = t('dashboard.alerts.systemTitle') || 'تنبيهات عاجلة';
    const notifBody = t('dashboard.alerts.urgentBody', { count: urgent.length }) || `لديك ${urgent.length} مهام متأخرة اليوم!`;

    window.api.showNotification({
      title: String(notifTitle),
      body: String(notifBody)
    });
    sessionStorage.setItem('notified_urgent_tasks', 'true');
  }
}
        }
      } catch (error) {
        console.error("Error fetching urgent tasks:", error);
      }
    };

    fetchAndNotifyUrgentData();
  }, [t]); // أضفنا t كمراقب ليتحدث الإشعار إذا تغيرت اللغة



  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (window.api) {
          const todayString = new Date().toISOString().split('T')[0];
          
          const [suppliers, expenses, attendance, dueAmount] = await Promise.all([
            window.api.getSuppliers(),
            window.api.getExpenses(),
            window.api.getTodayAttendance(todayString),
            window.api.getDueThisWeek()
          ]);

          const totalDebts = suppliers.reduce((sum, s) => sum + (s.total_debt || s.totalDebt || 0), 0);
          
          const topCreditors = [...suppliers]
            .filter(s => (s.total_debt || s.totalDebt || 0) > 0)
            .sort((a, b) => (b.total_debt || b.totalDebt || 0) - (a.total_debt || a.totalDebt || 0))
            .slice(0, 5)
            .map(s => ({ name: s.name, debt: s.total_debt || s.totalDebt || 0 }));

          const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
          const presentEmployees = attendance.filter(emp => emp.status === 'present').length;
          
          let totalEmployees = 0;
          if (window.api.getEmployees) {
             const employeesObj = await window.api.getEmployees();
             const empArray = Array.isArray(employeesObj) ? employeesObj : Object.values(employeesObj).filter(e => typeof e === 'object' && e !== null);
             totalEmployees = empArray.length;
          }

          setStats({
            totalDebts,
            totalExpenses,
            presentEmployees,
            totalEmployees,
            topCreditors,
            dueThisWeek: dueAmount || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [t]);

  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
  };

  return (

    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <button 
          onClick={() => navigate('/expenses')}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors"
        >
          <Plus size={18} />
          <span>{t('dashboard.quickActionExpense')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.totalDebts')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats.totalDebts.toLocaleString()} DA
              </h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-red-900/30 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.dueThisWeek')}</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">
                {stats.dueThisWeek.toLocaleString()} DA 
              </h3>
            </div>
            <div className="p-2 bg-red-950/50 rounded-lg text-red-400">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.activeEmployees')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats.presentEmployees} / {stats.totalEmployees || 0}
              </h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <Users size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.expenses')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats.totalExpenses.toLocaleString()} DA
              </h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <Wallet size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-6">{t('dashboard.charts.topCreditors')}</h3>
          <div className="flex-1 w-full" dir="ltr"> 
            {stats.topCreditors.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topCreditors} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <RechartsTooltip cursor={{fill: '#1e293b'}} contentStyle={customTooltipStyle} formatter={(value) => [`${value.toLocaleString()} DA`, t('suppliers.table.totalDebt') || 'Debt']} />
                  <Bar dataKey="debt" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">
                {t('common.noResults')}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-2">{t('dashboard.charts.expensesDist')}</h3>
          <div className="flex-1 w-full h-full relative">
             <ExpensesPieChart />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-4">
            {t('dashboard.lists.urgentAlerts')}
          </h3>
          
          <div className="space-y-3">
            {urgentTasks.length === 0 ? (
              <p className="text-slate-500 text-sm">
                {t('dashboard.alerts.noTasks')}
              </p>
            ) : (
              urgentTasks.slice(0, 5).map(task => (
                <div key={task.id} className="p-3 bg-red-950/20 border border-red-900/50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-red-200 text-sm">{task.title}</p>
                    <p className="text-xs text-red-400 mt-1">{task.date || task.task_date}</p>
                  </div>
                  {task.amount > 0 && (
                    <span className="font-bold text-slate-300 text-sm">
                      {task.amount.toLocaleString()} DA
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.lists.recentAudit')} ({t('dashboard.lists.comingSoon')})</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg border-dashed">
              <div>
                <p className="text-sm font-medium text-slate-400">System Status</p>
                <p className="text-xs text-slate-500">{t('dashboard.lists.auditDesc')}</p>
              </div>
              <span className="text-sm text-amber-400 border border-amber-900/50 bg-amber-950/30 px-2 py-1 rounded">{t('dashboard.lists.inDevelopment')}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
```

---

## `frontend\src\components\pages\Employees.jsx`

```javascript
import React, { useState, useEffect } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import useEmployeeStore from "../store/employeeStore"; // تأكد من مسار الملف

// افترضت أنك تستخدم هذا المسار لمكونات shadcn. قم بتعديله إذا لزم الأمر
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Employees = () => {
  // جلب البيانات والدوال من مخزن Zustand
  const { employees, fetchEmployees, addEmployee, isLoading } = useEmployeeStore();

  // حالات الواجهة (States)
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    pinCode: "",
  });

  // جلب الموظفين عند تحميل الصفحة
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // فلترة الموظفين حسب البحث
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // التعامل مع إدخال البيانات في النموذج
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // إرسال النموذج لإضافة موظف جديد
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pinCode) return; // تحقق بسيط

    const success = await addEmployee(formData);
    if (success) {
      setIsDialogOpen(false); // إغلاق النافذة عند النجاح
      setFormData({ name: "", role: "", pinCode: "" }); // تفريغ الحقول
    } else {
      alert("حدث خطأ. قد يكون رمز الدخول (PIN) مستخدماً بالفعل لموظف آخر.");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 w-full text-slate-100">
      {/* الترويسة (Header) */}
      <div className="flex justify-between items-end">
        <div className="text-right">
          <h1 className="text-3xl font-bold mb-2">الموارد البشرية</h1>
          <p className="text-slate-400">إدارة حسابات الموظفين ورموز الدخول (PIN)</p>
        </div>
      </div>

      {/* شريط الإجراءات والبحث */}
      <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2 items-center bg-white text-black hover:bg-slate-200">
              <Plus size={18} />
              موظف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-slate-950 text-slate-100 border-slate-800" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-right">إضافة موظف جديد</DialogTitle>
              <DialogDescription className="text-right text-slate-400">
                أدخل بيانات الموظف. يجب أن يكون رمز (PIN) فريداً لكل موظف.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right col-span-1">
                  الاسم الكامل
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-3 bg-slate-900 border-slate-800"
                  placeholder="مثال: فاتح حمة"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right col-span-1">
                  المنصب
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="col-span-3 bg-slate-900 border-slate-800"
                  placeholder="مثال: كاشير"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pinCode" className="text-right col-span-1">
                  رمز PIN
                </Label>
                <Input
                  id="pinCode"
                  name="pinCode"
                  type="password" // إخفاء الرمز أثناء الكتابة
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="col-span-3 bg-slate-900 border-slate-800"
                  placeholder="أرقام فقط (مثال: 1234)"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  حفظ الموظف
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* حقل البحث */}
        <div className="relative w-1/3">
          <Input
            placeholder="ابحث عن موظف بالاسم..."
            className="pr-10 bg-slate-900 border-slate-800 text-right w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            dir="rtl"
          />
          <Search className="absolute right-3 top-2.5 text-slate-500" size={18} />
        </div>
      </div>

      {/* جدول الموظفين */}
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-right text-slate-400">اسم الموظف</TableHead>
              <TableHead className="text-right text-slate-400">المنصب</TableHead>
              <TableHead className="text-center text-slate-400">الحالة</TableHead>
              <TableHead className="text-left text-slate-400">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  جاري تحميل البيانات...
                </TableCell>
              </TableRow>
            ) : filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  لا يوجد موظفين حالياً.
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell className="font-medium text-right">{emp.name}</TableCell>
                  <TableCell className="text-right text-slate-300">{emp.role}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        emp.status === "active"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {emp.status === "active" ? "نشط" : "غير نشط"}
                    </span>
                  </TableCell>
                  <TableCell className="text-left">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <MoreHorizontal size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Employees;
```

---

## `frontend\src\components\pages\Expenses.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Receipt, ArrowDownCircle, Wallet, Edit, Trash2, ShieldAlert } from 'lucide-react';
import Modal from '../ui/Modal';
import useEmployeeStore from '../../store/employeeStore';
import useSupplierStore from '../../store/supplierStore';
import useAuthStore from '../../store/authStore';

export default function Expenses() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const { employees, fetchEmployees } = useEmployeeStore();
  const { suppliers, fetchSuppliers } = useSupplierStore();
  const user = useAuthStore(state => state.user);

  const [formData, setFormData] = useState({
    description: '',
    category: 'utilities',
    amount: '',
    employeeId: '',
    supplierId: ''
  });
  
  const fetchExpensesList = async () => {
    try {
      if (window.api && window.api.getExpenses) {
        const data = await window.api.getExpenses();
        setExpenses(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpensesList();
    fetchEmployees();
    fetchSuppliers();
  }, [fetchEmployees, fetchSuppliers]);

  const openAddModal = () => {
    setEditingExpense(null);
    setFormData({ description: '', category: 'utilities', amount: '', employeeId: '', supplierId: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setFormData({ description: expense.description, category: expense.category, amount: expense.amount, employeeId: '', supplierId: '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('expenses.deleteConfirm'))) {
      try {
        if (window.api && window.api.deleteExpense) {
          const result = await window.api.deleteExpense(id);
          if (result && result.success) {
            setExpenses(prev => prev.filter(exp => !(exp.id === id && exp.source === 'expense')));
          }
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  // دالة تحديد اسم الكاشير (الدافع) بذكاء
  const getCaisseName = () => {
    if (user?.role === 'superadmin' || user?.username === 'admin') {
      return t('common.superAdmin');
    }
    return user?.username || 'Cashier';
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount) || 0;
    const dateStr = editingExpense ? editingExpense.date : new Date().toISOString().split('T')[0];

    try {
      if (formData.category === 'advance') {
        if (window.api && window.api.addAdvance) {
          await window.api.addAdvance({
            employeeId: formData.employeeId,
            amount: amountNum,
            date: dateStr,
            caisseSource: getCaisseName(), // استخدام الاسم الحقيقي
            note: formData.description
          });
        }
      } 
      else if (formData.category === 'supplier_payment') {
        if (window.api && window.api.addPayment) {
          await window.api.addPayment({
            supplierId: formData.supplierId,
            amount: amountNum,
            date: dateStr,
            caisseSource: getCaisseName(), // استخدام الاسم الحقيقي
            note: formData.description
          });
        }
      } 
      else {
        if (editingExpense) {
          await window.api.updateExpense(editingExpense.id, {
            description: formData.description,
            category: formData.category,
            amount: amountNum
          });
        } else {
          await window.api.addExpense({
            description: formData.description,
            category: formData.category,
            amount: amountNum,
            date: dateStr
          });
        }
      }

      setIsModalOpen(false);
      setEditingExpense(null);
      fetchExpensesList();
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const filteredExpenses = expenses?.filter(exp => {
    const description = exp.description || "";
    const search = searchTerm || "";
    return description.toLowerCase().includes(search.toLowerCase());
  }) || []; 

  const todayString = new Date().toISOString().split('T')[0];
  const todayTotal = expenses?.filter(exp => exp.date === todayString)?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;
  const monthTotal = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'advance': return 'bg-purple-950 text-purple-400 border-purple-900';
      case 'supplier_payment': return 'bg-orange-950 text-orange-400 border-orange-900';
      case 'utilities': return 'bg-blue-950 text-blue-400 border-blue-900';
      case 'maintenance': return 'bg-amber-950 text-amber-400 border-amber-900';
      case 'supplies': return 'bg-emerald-950 text-emerald-400 border-emerald-900';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // دالة للتعامل مع الترجمات المفقودة أو القديمة مثل "رواتب"
  const getCategoryTranslation = (category) => {
    const translated = t(`expenses.categories.${category}`);
    return translated.includes('expenses.categories') ? category : translated;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('expenses.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('expenses.subtitle')}</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
          <Plus size={18} /><span>{t('expenses.addExpense')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.today')}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{todayTotal.toLocaleString()} DA</h3>
          </div>
          <div className="p-3 bg-red-950/30 rounded-lg text-red-400"><ArrowDownCircle size={24} /></div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.month')}</p>
            <h3 className="text-2xl font-bold text-slate-300 mt-1">{monthTotal.toLocaleString()} DA</h3>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg text-slate-400"><Wallet size={24} /></div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('expenses.searchPlaceholder')} className="w-full bg-slate-950 border border-slate-800 rounded-lg ps-10 pe-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors" dir={isRTL ? "rtl" : "ltr"} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.date')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.description')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.category')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.amount')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('expenses.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={`${exp.source}-${exp.id}`} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                  <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap text-start">{exp.date}</td>
                  <td className="px-6 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-white">
                        {/* ترجمة البوادئ ديناميكياً */}
                        {exp.source === 'advance' && <span className="text-purple-400 font-bold mx-1">{t('expenses.prefixes.advance')}:</span>}
                        {exp.source === 'supplier_payment' && <span className="text-orange-400 font-bold mx-1">{t('expenses.prefixes.supplier')}:</span>}
                        {exp.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-start">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(exp.category)}`}>
                      {getCategoryTranslation(exp.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-start">
                    <span className="font-bold text-white">{exp.amount.toLocaleString()} DA</span>
                  </td>
                  <td className="px-6 py-4">
                    {exp.source === 'expense' ? (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEditModal(exp)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-xs text-slate-500 gap-1" title={t('expenses.table.managedElsewhere')}>
                        <ShieldAlert size={14} /> {t('expenses.table.locked')}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">{t('common.noResults')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingExpense(null); }} title={editingExpense ? t('expenses.editExpense') : t('expenses.addExpense')}>
        <form className="space-y-4" onSubmit={handleSubmitExpense} dir={isRTL ? "rtl" : "ltr"}>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.category')}</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start"
              disabled={!!editingExpense}
            >
              <option value="utilities">{t('expenses.categories.utilities')}</option>
              <option value="maintenance">{t('expenses.categories.maintenance')}</option>
              <option value="supplies">{t('expenses.categories.supplies')}</option>
              <option value="advance">{t('expenses.categories.advance')}</option>
              <option value="supplier_payment">{t('expenses.categories.supplier_payment')}</option>
            </select>
          </div>

          {formData.category === 'advance' && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('payroll.selectEmployee')}</label>
              <select required value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                <option value="" disabled>{t('payroll.selectEmployee')}</option>
                {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
              </select>
            </div>
          )}

          {formData.category === 'supplier_payment' && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('suppliers.modal.nameLabel')}</label>
              <select required value={formData.supplierId} onChange={e => setFormData({...formData, supplierId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                <option value="" disabled>{t('suppliers.modal.selectSupplier')}</option>
                {suppliers.map(sup => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.amount')} (DA)</label>
            <input type="number" min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{formData.category === 'advance' || formData.category === 'supplier_payment' ? t('suppliers.details.note') : t('expenses.table.description')}</label>
            <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => { setIsModalOpen(false); setEditingExpense(null); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">
              {t('common.cancel')}
            </button>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              {editingExpense ? t('expenses.saveChanges') : t('expenses.addExpense')}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
```

---

## `frontend\src\components\pages\HR.jsx`

```javascript
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Search, Plus, MoreHorizontal, UserCheck, AlertCircle, ScanLine, Users, X, Clock } from "lucide-react";

import useEmployeeStore from "../../store/employeeStore";
import useAttendanceStore from "../../store/attendanceStore";

const HR = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [activeTab, setActiveTab] = useState('attendance');

  // --- حالة الموظفين ---
  const { employees, fetchEmployees, addEmployee, isLoading: empLoading } = useEmployeeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", pinCode: "" });

  // --- حالة الحضور ---
  const { todayRecords, fetchTodayRecords, submitPin, isLoading: attLoading } = useAttendanceStore();
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);
  
  const today = new Date().toISOString().split('T')[0];
  const [attendanceDate, setAttendanceDate] = useState(today);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // دالة لجلب الحضور حسب التاريخ المختار لجدول العرض
  const fetchAttendanceForDate = async (date) => {
    try {
      const data = await window.api.getTodayAttendance(date);
      setAttendanceRecords(data || []);
    } catch (error) {
      console.error("Error fetching attendance for date:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceForDate(attendanceDate);
  }, [attendanceDate]);

  useEffect(() => {
    fetchEmployees();
    fetchTodayRecords(); // من أجل إحصائيات اليوم (KPIs)
  }, [fetchEmployees, fetchTodayRecords]);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pinCode) return;
    const success = await addEmployee(formData);
    if (success) {
      setIsDialogOpen(false);
      setFormData({ name: "", role: "", pinCode: "" });
      fetchEmployees();
    } else {
      alert(t('hr.messages.error'));
    }
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    
    const result = await submitPin(pinInput.trim());
    
    if (result && result.success) {
       const actionText = result.action === 'check_in' ? t('hr.messages.checkIn') : t('hr.messages.checkOut');
       setFeedback({ type: 'success', message: `${actionText}: ${result.employeeName}` });
       fetchTodayRecords(); // تحديث إحصائيات اليوم
       fetchAttendanceForDate(attendanceDate); // تحديث الجدول فوراً
    } else if (result) {
       setFeedback({ type: 'error', message: result.message });
    }
    
    setPinInput("");
    if(inputRef.current) inputRef.current.focus();
    setTimeout(() => setFeedback(null), 4000);
  };

  const presentCount = todayRecords.filter(r => !r.time_out).length;
  const absentCount = employees.length - presentCount > 0 ? employees.length - presentCount : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans flex flex-col gap-6">
      
      {/* الترويسة العلوية */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('hr.title')}</h1>
          <p className="text-slate-400">{t('hr.subtitle')}</p>
        </div>
      </div>

      {/* التبويبات */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1">
        <button 
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <ScanLine size={18} />
          {t('hr.tabs.attendance')}
        </button>
        <button 
          onClick={() => setActiveTab('employees')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'employees' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <Users size={18} />
          {t('hr.tabs.employees')}
        </button>
      </div>

      {/* تبويب الحضور */}
      {activeTab === 'attendance' && (
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:h-[calc(100vh-220px)]">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-slate-800 p-2 rounded-lg text-blue-400"><ScanLine size={24} /></div>
                <h3 className="text-xl font-bold">{t('hr.scanner.title')}</h3>
              </div>
              <form onSubmit={handleAttendanceSubmit} className="flex flex-col gap-4">
                <input
                  ref={inputRef}
                  type="password"
                  placeholder={t('hr.scanner.placeholder')}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center text-xl py-6 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 tracking-widest"
                  autoFocus
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 rounded-lg font-medium transition-colors">
                  {t('hr.scanner.submit')}
                </button>
              </form>
              
              {feedback && (
                <div className={`mt-4 p-3 rounded-lg text-sm text-center border ${feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  {feedback.message}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center shadow-lg">
                <UserCheck className="text-emerald-500 mb-2" size={32} />
                <span className="text-3xl font-bold">{presentCount}</span>
                <span className="text-slate-400 text-sm mt-1">{t('hr.kpi.present')}</span>
              </div>
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center shadow-lg">
                <AlertCircle className="text-red-500 mb-2" size={32} />
                <span className="text-3xl font-bold">{absentCount}</span>
                <span className="text-slate-400 text-sm mt-1">{t('hr.kpi.absent')}</span>
              </div>
            </div>
          </div>

          {/* سجل الحضور بالتواريخ */}
          <div className="w-full lg:w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" /> {t('hr.attendanceLog')}
              </h3>
              <input 
                type="date" 
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="flex-1 overflow-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                    <th className="px-6 py-4 font-medium text-start">{t('hr.table.nameWithRole')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.timeIn')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.timeOut')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {attLoading ? (
                    <tr><td colSpan={4} className="text-center py-12 text-slate-500">{t('hr.table.loading')}</td></tr>
                  ) : attendanceRecords.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-12 text-slate-500">{t('hr.table.emptyRecord')}</td></tr>
                  ) : (
                    attendanceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                        <td className="px-6 py-4 font-medium text-start text-white">
                          {record.employee_name || record.name} 
                          {record.role && <span className="text-xs text-slate-500 ml-2">({record.role})</span>}
                        </td>
                        <td className="px-6 py-4 text-center text-emerald-400 font-medium">{record.time_in || '--:--'}</td>
                        <td className="px-6 py-4 text-center text-orange-400 font-medium">{record.time_out || '--:--'}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${!record.time_out ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                            {!record.time_out ? t('hr.status.present') : t('hr.status.departed')}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* تبويب الموظفين */}
      {activeTab === 'employees' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-lg">
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              {t('hr.employees.addBtn')}
            </button>
            
            <div className="relative w-1/3 text-start">
              <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={t('hr.employees.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.name')}</th>
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.role')}</th>
                  <th className="px-6 py-4 font-medium text-center">{t('hr.employees.table.status')}</th>
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {empLoading ? (
                  <tr><td colSpan={4} className="text-center py-8 text-slate-500">{t('hr.table.loading')}</td></tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-8 text-slate-500">{t('hr.employees.empty')}</td></tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                      <td className="px-6 py-4 font-medium text-start text-white">{emp.name}</td>
                      <td className="px-6 py-4 text-slate-400 text-start">{emp.role}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{t('hr.employees.status.active')}</span>
                      </td>
                      <td className="px-6 py-4 text-start">
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* نافذة إضافة الموظف */}
          {isDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="bg-slate-950 border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">{t('hr.dialog.title')}</h2>
                    <p className="text-sm text-slate-400 mt-1">{t('hr.dialog.desc')}</p>
                  </div>
                  <button onClick={() => setIsDialogOpen(false)} className="text-slate-500 hover:text-white"><X size={20}/></button>
                </div>
                
                <form onSubmit={handleAddEmployee} className="flex flex-col gap-4 text-start">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.name')}</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" placeholder={t('hr.dialog.namePlaceholder')} dir={isRTL ? "rtl" : "ltr"} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.role')}</label>
                    <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" placeholder={t('hr.dialog.rolePlaceholder')} dir={isRTL ? "rtl" : "ltr"} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.pin')}</label>
                    <input type="password" value={formData.pinCode} onChange={(e) => setFormData({...formData, pinCode: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 tracking-widest text-start" placeholder="****" required />
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">{t('hr.dialog.cancel')}</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">{t('hr.dialog.save')}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default HR;
```

---

## `frontend\src\components\pages\Login.jsx`

```javascript
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (window.api && window.api.login) {
        const user = await window.api.login({ username, password });
        
        if (user) {
          login(user);
          navigate('/');
        } else {
          setError(t('login.error'));
        }
      } else {
        if(username === 'admin' && password === 'admin123') {
           login({ username: 'admin', role: 'superadmin' });
           navigate('/');
        } else {
           setError(t('login.error'));
        }
      }
    } catch (err) {
      setError(t('login.serverError'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative" dir={i18n.language.startsWith('ar') ? 'rtl' : 'ltr'}>
      
      <button 
        onClick={toggleLanguage}
        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors text-sm font-medium"
      >
        {i18n.language.startsWith('en') ? 'العربية' : 'English'}
      </button>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={32} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('login.title')}</h1>
          <p className="text-slate-500 text-sm">{t('login.subtitle')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-900 rounded-lg flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('login.username')}</label>
            <div className="relative flex items-center">
              {/* تم استخدام start-3 بدلاً من left/right ليتبدل مكان الأيقونة تلقائياً */}
              <User size={18} className="absolute start-4 text-slate-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /* تم استخدام ps-10 (Padding Start) لدفع النص بعيداً عن الأيقونة */
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('login.password')}</label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute start-4 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('login.loading') : t('login.submit')}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-8">
          POSManager v1.0.0 &copy; 2026
        </p>
      </div>
    </div>
  );
}
```

---

## `frontend\src\components\pages\Payroll.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calculator, Banknote, Clock, Users, Calendar, 
  MinusCircle, CheckCircle, Plus, AlertCircle, FileText
} from 'lucide-react';

import useEmployeeStore from '../../store/employeeStore';
import usePayrollStore from '../../store/payrollStore';
import Modal from '../ui/Modal';

export default function Payroll() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [activeTab, setActiveTab] = useState('calculator');

  const { employees, fetchEmployees } = useEmployeeStore();
  const { 
    advances, salaries, fetchAdvances, fetchSalaries, addAdvance, 
    calculatePayroll, payrollResult, paySalary, clearPayrollResult 
  } = usePayrollStore();

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startDate, setStartDate] = useState(lastWeek.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const [hourlyRate, setHourlyRate] = useState('');
  
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [advanceData, setAdvanceData] = useState({ 
    employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' 
  });

  useEffect(() => {
    fetchEmployees();
    fetchAdvances();
    fetchSalaries();
  }, [fetchEmployees, fetchAdvances, fetchSalaries]);

  useEffect(() => {
    clearPayrollResult();
  }, [selectedEmployee, clearPayrollResult]);

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();
    if (!selectedEmployee || !hourlyRate || !startDate || !endDate) return;
    await calculatePayroll({
      employeeId: selectedEmployee,
      startDate,
      endDate,
      hourlyRate: Number(hourlyRate)
    });
  };

const handleSaveAdvance = async (e) => {
    e.preventDefault();
    if (!advanceData.employeeId || !advanceData.caisseSource) return;
    const success = await addAdvance({
      employeeId: advanceData.employeeId,
      amount: Number(advanceData.amount),
      date: advanceData.date,
      caisseSource: advanceData.caisseSource,
      note: advanceData.note
    });
    if (success) {
      setIsAdvanceModalOpen(false);
      setAdvanceData({ employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' });
      if (payrollResult) handleCalculate(); // إعادة الحساب لتحديث القيمة
    }
  };

const handlePaySalary = async () => {
  if (!payrollResult) return;
  
  // استخدام الترجمة لرسائل التأكيد
  if (payrollResult.netSalary < 0) {
     if (!window.confirm(t('payroll.rolloverConfirm'))) return;
  } else {
     if (!window.confirm(t('payroll.standardConfirm'))) return;
  }

  // جلب اسم الموظف لطباعته في الملاحظة
  const employeeName = employees.find(e => e.id === Number(selectedEmployee))?.name || '';

  // تجهيز البيانات مع الملاحظات المترجمة
  const payload = { 
    ...payrollResult, 
    date: today.toISOString().split('T')[0],
    rolloverNote: t('payroll.rolloverNote', { start: payrollResult.startDate, end: payrollResult.endDate }),
    expenseNote: t('payroll.expenseNote', { name: employeeName, start: payrollResult.startDate, end: payrollResult.endDate })
  };
  
// التعديل هنا لطباعة الخطأ الحقيقي إن وجد
      const res = await paySalary(payload);
      if (res.success) {
        alert(t('common.success'));
        setActiveTab('salaries');
      } else {
        alert('فشلت العملية. السبب التقني: \n' + res.error);
      }
};


  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex flex-col gap-6">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Banknote className="text-emerald-500" />
            {t('payroll.title')}
          </h1>
          <p className="text-sm text-slate-500">{t('payroll.subtitle')}</p>
        </div>
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1 overflow-x-auto">
        <button onClick={() => setActiveTab('calculator')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'calculator' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <Calculator size={18} /> {t('payroll.tabs.calculator')}
        </button>
        <button onClick={() => setActiveTab('advances')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'advances' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <MinusCircle size={18} /> {t('payroll.tabs.advances')}
        </button>
        <button onClick={() => setActiveTab('salaries')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'salaries' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <FileText size={18} /> {t('payroll.tabs.salaries')}
        </button>
      </div>

      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-xl font-bold text-white mb-6">{t('payroll.calculator')}</h2>
            <form onSubmit={handleCalculate} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.selectEmployee')}</label>
                <select required value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" dir={isRTL ? "rtl" : "ltr"}>
                  <option value="" disabled>{t('payroll.selectEmployee')}</option>
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.startDate')}</label>
                <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.endDate')}</label>
                <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.hourlyRate')}</label>
                <input type="number" step="0.01" min="1" required value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="مثال: 130" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div className="col-span-2 mt-4">
                <button type="submit" disabled={!selectedEmployee} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                  <Calculator size={20} /> {t('payroll.calculateBtn')}
                </button>
              </div>
            </form>
          </div>

          {payrollResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg border-t-4 border-t-emerald-500 animate-in fade-in h-fit">
              <h2 className="text-xl font-bold text-white mb-6">{t('payroll.results')}</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                  <Clock className="mx-auto text-blue-400 mb-2" size={24} />
                  <p className="text-sm text-slate-400 mb-1">{t('payroll.totalHours')}</p>
                  <p className="text-xl font-bold text-white">{payrollResult.totalHours}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                  <Banknote className="mx-auto text-slate-400 mb-2" size={24} />
                  <p className="text-sm text-slate-400 mb-1">{t('payroll.grossSalary')}</p>
                  <p className="text-xl font-bold text-white">{payrollResult.grossSalary.toLocaleString()}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-red-900/30 text-center col-span-2 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <MinusCircle className="text-red-400" size={24} />
                    <p className="text-slate-400 font-medium">{t('payroll.deductions')}</p>
                  </div>
                  <p className="text-xl font-bold text-red-400">-{payrollResult.totalAdvances.toLocaleString()}</p>
                </div>
                <div className={`p-5 rounded-lg border text-center col-span-2 ${payrollResult.netSalary < 0 ? 'bg-red-950/30 border-red-900/50 ring-1 ring-red-500/50' : 'bg-emerald-950/30 border-emerald-900/50 ring-1 ring-emerald-500/50'}`}>
                  <p className="text-sm text-slate-300 mb-2">{t('payroll.netSalary')}</p>
                  <p className={`text-4xl font-bold ${payrollResult.netSalary < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                    {payrollResult.netSalary.toLocaleString()} DA
                  </p>
                  {payrollResult.netSalary < 0 && <p className="text-xs text-red-400 mt-2">{t('payroll.negativeSalaryError')}</p>}
                </div>
              </div>
            <button 
                onClick={handlePaySalary} 
                // الزر سيصبح برتقالياً إذا كان بالسالب ليدل على الترحيل، وأخضر إذا كان دفعاً عادياً
                className={`w-full text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors ${payrollResult.netSalary < 0 ? 'bg-orange-600 hover:bg-orange-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                <CheckCircle size={24} /> 
                {payrollResult.netSalary < 0 ? t('payroll.rolloverBtn') : t('payroll.payBtn')}
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'advances' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
            <h3 className="font-bold text-white flex items-center gap-2"><MinusCircle size={18} className="text-red-400" /> {t('payroll.tabs.advances')}</h3>
            <button onClick={() => setIsAdvanceModalOpen(true)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors">
              <Plus size={18} /> {t('payroll.addAdvance')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.name')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.date')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.caisse')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.amount')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.note')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('hr.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {advances.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.noResults')}</td></tr>
                ) : (
                  advances.map(adv => (
                    <tr key={adv.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-medium text-white">{adv.employee_name}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{adv.date}</td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{adv.caisse_source || '-'}</td>
                      <td className="px-6 py-4 font-bold text-red-400">{adv.amount.toLocaleString()} DA</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{adv.note || '-'}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${adv.status === 'pending' ? 'bg-orange-950 text-orange-400 border-orange-900' : 'bg-emerald-950 text-emerald-400 border-emerald-900'}`}>
                          {adv.status === 'pending' ? t('payroll.statusPending') : t('payroll.statusPaid')}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'salaries' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 bg-slate-950/30">
            <h3 className="font-bold text-white flex items-center gap-2"><FileText size={18} className="text-blue-400" /> {t('payroll.tabs.salaries')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.name')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.period')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.totalHours')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.grossSalary')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.deductions')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.netSalary')}</th>
                </tr>
              </thead>
              <tbody>
                {salaries.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.noResults')}</td></tr>
                ) : (
                  salaries.map(sal => (
                    <tr key={sal.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-medium text-white">
                        {sal.employee_name}
                        <div className="text-xs text-slate-500 mt-1">{t('payroll.date')}: {sal.payment_date}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm text-center">{sal.start_date} <br/> {sal.end_date}</td>
                      <td className="px-6 py-4 text-blue-400 font-medium text-center">{sal.total_hours}</td>
                      <td className="px-6 py-4 text-slate-300 text-center">{sal.total_hours * sal.hourly_rate}</td>
                      <td className="px-6 py-4 text-red-400 font-medium text-center">-{sal.total_advances}</td>
                      <td className="px-6 py-4 font-bold text-emerald-400 text-center bg-slate-950/50">{sal.net_salary.toLocaleString()} DA</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={isAdvanceModalOpen} onClose={() => setIsAdvanceModalOpen(false)} title={t('payroll.addAdvance')}>
        <form onSubmit={handleSaveAdvance} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.selectEmployee')}</label>
            <select required value={advanceData.employeeId} onChange={e => setAdvanceData({...advanceData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" dir={isRTL ? "rtl" : "ltr"}>
              <option value="" disabled>{t('payroll.selectEmployee')}</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.caisse')}</label>
            <select required value={advanceData.caisseSource} onChange={e => setAdvanceData({...advanceData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" dir={isRTL ? "rtl" : "ltr"}>
              <option value="" disabled>{t('payroll.selectCaisse')}</option>
              {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name} ({emp.role})</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.amount')} (DA)</label>
            <input type="number" min="1" required value={advanceData.amount} onChange={e => setAdvanceData({...advanceData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.date')}</label>
            <input type="date" required value={advanceData.date} onChange={e => setAdvanceData({...advanceData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.note')}</label>
            <input type="text" value={advanceData.note} onChange={e => setAdvanceData({...advanceData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div className="pt-4 flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsAdvanceModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">{t('common.cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">{t('payroll.addAdvance')}</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
```

---

## `frontend\src\components\pages\Suppliers.jsx`

```javascript
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getSortedRowModel, 
  flexRender 
} from '@tanstack/react-table';
import { 
  Plus, Search, ArrowUpDown, ArrowRight, ArrowLeft, 
  FileText, Banknote, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar 
} from 'lucide-react';

import useSupplierStore from '../../store/supplierStore';
import useEmployeeStore from '../../store/employeeStore'; 
import Modal from '../ui/Modal';

export default function Suppliers() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const { 
    suppliers, fetchSuppliers, addSupplier, 
    currentSupplier, fetchSupplierDetails, clearCurrentSupplier,
    addReceipt, addPayment
  } = useSupplierStore();

  const { employees, fetchEmployees } = useEmployeeStore();

  const [globalFilter, setGlobalFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', phone: '', initialDebt: 0 });
  const [transactionData, setTransactionData] = useState({ 
    amount: '', 
    date: new Date().toISOString().split('T')[0], 
    note: '', 
    caisseSource: '' 
  });
  const [scheduleData, setScheduleData] = useState({ 
    amount: '', 
    date: new Date().toISOString().split('T')[0], 
    time: '10:00',
    note: '' 
  });

  useEffect(() => {
    fetchSuppliers();
    fetchEmployees(); 
  }, [fetchSuppliers, fetchEmployees]);

  const handleSaveSupplier = async (e) => {
    e.preventDefault();
    const success = await addSupplier(formData);
    if (success) {
      setIsAddModalOpen(false);
      setFormData({ name: '', phone: '', initialDebt: 0 });
    }
  };

  const handleSaveReceipt = async (e) => {
    e.preventDefault();
    const payload = { ...transactionData, supplierId: currentSupplier.id, amount: Number(transactionData.amount) };
    const success = await addReceipt(payload);
    if (success) setIsReceiptModalOpen(false);
  };

  const handleSavePayment = async (e) => {
    e.preventDefault();
    const payload = { ...transactionData, supplierId: currentSupplier.id, amount: Number(transactionData.amount) };
    const success = await addPayment(payload);
    if (success) setIsPaymentModalOpen(false);
  };

  const handleSchedulePayment = async (e) => {
    e.preventDefault();
    const taskData = {
      title: `${t('agenda.scheduledPaymentTitle')} ${currentSupplier.name}`,
      type: 'payment',
      date: scheduleData.date,
      time: scheduleData.time,
      task_date: scheduleData.date, // إضافة ضرورية للباك إند
      task_time: scheduleData.time, // إضافة ضرورية للباك إند
      amount: Number(scheduleData.amount),
    };
    try {
      if (window.api && window.api.addAgendaTask) {
        await window.api.addAgendaTask(taskData);
        setIsScheduleModalOpen(false);
        setScheduleData({ amount: '', date: new Date().toISOString().split('T')[0], time: '10:00', note: '' });
        alert(t('common.success'));
      }
    } catch (error) {
      console.error("Error scheduling payment:", error);
      alert(t('common.errorScheduling'));
    }
  };

  const openTransactionModal = (type) => {
    setTransactionData({ amount: '', date: new Date().toISOString().split('T')[0], note: '', caisseSource: '' });
    if (type === 'receipt') setIsReceiptModalOpen(true);
    else setIsPaymentModalOpen(true);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button className="flex items-center gap-2 hover:text-white outline-none transition-colors" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          {t('suppliers.table.name')} <ArrowUpDown size={14} />
        </button>
      ),
      cell: (info) => <span className="font-medium text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'phone',
      header: t('suppliers.table.phone'),
      cell: (info) => <span className="text-slate-400">{info.getValue() || '-'}</span>,
    },
    {
      accessorKey: 'total_debt',
      header: t('suppliers.table.totalDebt'),
      cell: (info) => {
        const amount = info.getValue() || 0;
        return <span className={`font-bold ${amount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{amount.toLocaleString()} DA</span>;
      },
    },
    {
      id: 'status',
      header: t('suppliers.table.status'),
      cell: ({ row }) => {
        const amount = row.original.total_debt || 0;
        const isClear = amount <= 0;
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${isClear ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-red-950 text-red-400 border-red-900'}`}>
            {isClear ? t('suppliers.status.clear') : t('suppliers.status.indebted')}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: t('suppliers.table.actions'),
      cell: ({ row }) => (
        <button onClick={() => fetchSupplierDetails(row.original.id)} className="text-xs bg-blue-600/20 text-blue-400 border border-blue-900/50 px-4 py-1.5 rounded hover:bg-blue-600 hover:text-white transition-colors">
          {t('suppliers.actions.view')}
        </button>
      ),
    },
  ], [t, fetchSupplierDetails]);

  const table = useReactTable({
    data: suppliers, columns, state: { globalFilter }, onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(),
  });

  if (currentSupplier) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <button onClick={clearCurrentSupplier} className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              {isRTL ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">{currentSupplier.name}</h1>
              <p className="text-sm text-slate-500 mt-1">{currentSupplier.phone || '-'}</p>
            </div>
          </div>
          <div className="text-end">
            <p className="text-sm text-slate-400 mb-1">{t('suppliers.table.totalDebt')}</p>
            <h2 className={`text-3xl font-bold ${currentSupplier.total_debt > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {currentSupplier.total_debt.toLocaleString()} DA
            </h2>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => openTransactionModal('receipt')} className="flex-1 flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 hover:border-red-900 hover:bg-red-950/30 text-white py-4 rounded-xl transition-all shadow-sm">
            <div className="p-2 bg-red-500/20 text-red-400 rounded-lg"><ArrowUpRight size={20} /></div>
            <span className="font-medium text-lg">{t('suppliers.details.addReceipt')}</span>
          </button>
          <button onClick={() => openTransactionModal('payment')} className="flex-1 flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 hover:border-emerald-900 hover:bg-emerald-950/30 text-white py-4 rounded-xl transition-all shadow-sm">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><ArrowDownRight size={20} /></div>
            <span className="font-medium text-lg">{t('suppliers.details.addPayment')}</span>
          </button>
          <button onClick={() => setIsScheduleModalOpen(true)} className="flex-1 flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 hover:border-blue-900 hover:bg-blue-950/30 text-white py-4 rounded-xl transition-all shadow-sm">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Calendar size={20} /></div>
            <span className="font-medium text-lg">{t('suppliers.details.schedulePayment')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[450px]">
            <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-slate-400" />
              <h3 className="font-bold text-white">{t('suppliers.details.receipts')}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(!currentSupplier.receipts || currentSupplier.receipts.length === 0) ? (
                <div className="text-center p-8 text-slate-500 flex flex-col items-center gap-2"><FileText size={32} className="opacity-20 mb-2" />{t('common.noResults')}</div>
              ) : (
                currentSupplier.receipts.map(r => (
                  <div key={r.id} className="p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-slate-400">{r.date}</span>
                      <span className="font-bold text-red-400">+{r.amount.toLocaleString()} DA</span>
                    </div>
                    <p className="text-sm text-slate-300">{r.note || '-'}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[450px]">
            <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2">
              <Banknote size={18} className="text-slate-400" />
              <h3 className="font-bold text-white">{t('suppliers.details.payments')}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(!currentSupplier.payments || currentSupplier.payments.length === 0) ? (
                <div className="text-center p-8 text-slate-500 flex flex-col items-center gap-2"><Banknote size={32} className="opacity-20 mb-2" />{t('common.noResults')}</div>
              ) : (
                currentSupplier.payments.map(p => (
                  <div key={p.id} className="p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-slate-400">{p.date} • <span className="text-emerald-500/70"> {t('suppliers.details.caisseLabel')} {p.caisse_source}</span></span>
                      <span className="font-bold text-emerald-400">-{p.amount.toLocaleString()} DA</span>
                    </div>
                    <p className="text-sm text-slate-300">{p.note || '-'}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <Modal isOpen={isReceiptModalOpen} onClose={() => setIsReceiptModalOpen(false)} title={t('suppliers.details.addReceipt')}>
          <form onSubmit={handleSaveReceipt} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} (DA)</label>
              <input type="number" min="1" required value={transactionData.amount} onChange={e => setTransactionData({...transactionData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
              <input type="date" required value={transactionData.date} onChange={e => setTransactionData({...transactionData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.note')}</label>
              <input type="text" value={transactionData.note} onChange={e => setTransactionData({...transactionData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsReceiptModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">{t('suppliers.modal.cancelBtn')}</button>
              <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">{t('suppliers.details.addReceipt')}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title={t('suppliers.details.addPayment')}>
          <form onSubmit={handleSavePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} (DA)</label>
              <input type="number" min="1" max={currentSupplier.total_debt > 0 ? currentSupplier.total_debt : undefined} required value={transactionData.amount} onChange={e => setTransactionData({...transactionData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.caisse')}</label>
              <select required value={transactionData.caisseSource} onChange={e => setTransactionData({...transactionData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" dir={isRTL ? "rtl" : "ltr"}>
                <option value="" disabled>{t('suppliers.modal.selectEmployee')}</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name} ({emp.role})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
              <input type="date" required value={transactionData.date} onChange={e => setTransactionData({...transactionData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.note')}</label>
              <input type="text" value={transactionData.note} onChange={e => setTransactionData({...transactionData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">{t('suppliers.modal.cancelBtn')}</button>
              <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">{t('suppliers.details.addPayment')}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title={t('suppliers.modal.scheduleTitle')}>
          <form onSubmit={handleSchedulePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} (DA)</label>
              <input type="number" min="1" max={currentSupplier.total_debt > 0 ? currentSupplier.total_debt : undefined} required value={scheduleData.amount} onChange={e => setScheduleData({...scheduleData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
                <input type="date" required value={scheduleData.date} onChange={e => setScheduleData({...scheduleData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.time')}</label>
<input 
  type="time" 
  value={scheduleData.time} 
  onChange={e => setScheduleData({...scheduleData, time: e.target.value})} 
  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" 
/>              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.note')}</label>
              <input type="text" value={scheduleData.note} onChange={e => setScheduleData({...scheduleData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder={t('suppliers.modal.notePlaceholder')} />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">{t('suppliers.modal.cancelBtn')}</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">{t('suppliers.modal.confirmScheduleBtn')}</button>
            </div>
          </form>
        </Modal>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('suppliers.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('suppliers.subtitle')}</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors shadow-sm">
          <Plus size={18} /><span>{t('suppliers.addSupplier')}</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 flex items-center bg-slate-950/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={globalFilter ?? ''} onChange={e => setGlobalFilter(e.target.value)} placeholder={t('suppliers.searchPlaceholder')} className="w-full bg-slate-900 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" dir={i18n.dir()}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-slate-800 bg-slate-950/80">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className={`px-6 py-4 text-sm font-medium text-slate-400 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 text-sm whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {table.getRowModel().rows.length === 0 && (
          <div className="p-12 flex flex-col items-center justify-center text-slate-500"><Search size={48} className="opacity-20 mb-4" /><p>{t('common.noResults')}</p></div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('suppliers.addSupplier')}>
        <form onSubmit={handleSaveSupplier} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.nameLabel')}</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.phoneLabel')}</label>
            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.debtLabel')}</label>
            <input type="number" min="0" required value={formData.initialDebt} onChange={e => setFormData({...formData, initialDebt: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors font-medium">{t('suppliers.modal.cancelBtn')}</button>
            <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md">{t('suppliers.modal.saveBtn')}</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
```

---

## `frontend\src\components\ui\Modal.jsx`

```javascript
import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
      {/* حاوية النافذة */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* رأس النافذة (Header) */}
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950/50">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-800/50 p-1.5 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* محتوى النافذة (Body) */}
        <div className="p-5 overflow-y-auto">
          {children}
        </div>
        
      </div>
    </div>
  );
}
```

---

## `frontend\src\locales\ar\translation.json`

```json
{
  "common": {
    "search": "بحث...",
    "superAdmin": "المدير العام",
    "systemOwner": "مالك النظام",
    "noResults": "لا توجد نتائج مطابقة لبحثك.",
    "success": "تمت العملية بنجاح",
    "errorScheduling": "حدث خطأ أثناء الجدولة",
    "cancel": "إلغاء"
  },
  "sidebar": {
"dashboard": "لوحة التحكم",
    "suppliers": "الموردين",
    "hr": "الموارد البشرية",
    "expenses": "المصاريف",
    "payroll": "الرواتب",
    "agenda": "الأجندة",
    "end_of_day": "إغلاق الوردية",
    "settings": "إدارة الحسابات"
  },
  "currency": "د.ج",
  "eod": {
    "title": "إغلاق الوردية",
    "open_shift_title": "فتح وردية جديدة",
    "open_shift_desc": "أدخل الصرف الافتتاحي لبدء وردية:",
    "open_shift_btn": "بدء الوردية",
    "active_shift": "الوردية النشطة",
    "closure_date": "تاريخ الإغلاق",
    "total_expenses": "إجمالي المصاريف",
    "supplier_payments": "دفعات الموردين",
    "advances": "سلف العمال",
    "opening_balance": "الرصيد الافتتاحي (الصرف)",
    "actual_cash": "النقد الفعلي (الموجود في الدرج)",
    "total_deducted": "إجمالي المبالغ الخارجة",
    "today_sales": "المداخيل المحصلة (صافي المبيعات)",
    "notes": "ملاحظات الإغلاق",
    "save_btn": "تأكيد وإغلاق الوردية",
    "confirmClose": "هل أنت متأكد من إنهاء هذه الوردية وإغلاق الصندوق؟",
    "closeSuccess": "تم إغلاق الوردية بنجاح وتسجيل المبيعات."
  },
  "dashboard": {
    "title": "لوحة القيادة",
    "subtitle": "نظرة عامة على النظام والمؤشرات المالية",
    "quickAction": "إجراء سريع",
    "quickActionExpense": "إضافة مصروف سريع",
    "kpi": {
      "totalDebts": "إجمالي ديون الموردين",
      "dueThisWeek": "مستحقة هذا الأسبوع",
      "activeEmployees": "العمال النشطون",
      "expenses": "المصاريف والسلفيات"
    },
    "charts": {
      "topCreditors": "أكبر 5 دائنين",
      "expensesDist": "توزيع المصاريف"
    },
    "actions": {
      "payNow": "دفع الآن"
    },
    "lists": {
      "urgentAlerts": "تنبيهات عاجلة",
      "recentAudit": "سجل النشاطات الأخير",
      "comingSoon": "قريباً",
      "auditDesc": "سيتم تفعيله لاحقاً لمراقبة نشاط المحاسب",
      "inDevelopment": "قيد التطوير"
    },
    "alerts": {
      "systemTitle": "تنبيهات النظام عاجلة ⚠️",
      "urgentBody": "لديك {{count}} مهام (دفعات أو استلام) مستحقة اليوم أو متأخرة!",
      "noTasks": "لا توجد مهام مستحقة أو متأخرة حالياً."
    }
  },
  "suppliers": {
    "title": "الموردين والديون",
    "subtitle": "إدارة حسابات الموردين والفواتير غير المدفوعة",
    "addSupplier": "مورد جديد",
    "searchPlaceholder": "ابحث عن مورد بالاسم أو الهاتف...",
    "table": {
      "name": "اسم المورد",
      "phone": "رقم الهاتف",
      "totalDebt": "إجمالي الدين",
      "status": "الحالة",
      "actions": "الإجراءات"
    },
    "status": {
      "clear": "صافي (لا يوجد دين)",
      "indebted": "مدين"
    },
    "actions": {
      "view": "التفاصيل",
      "pay": "تسديد دفعة"
    },
    "details": {
      "caisse": "مصدر الصندوق (الكاشير)",
      "caisseLabel": "صندوق: ",
      "receipts": "فواتير الاستلام",
      "payments": "الدفعات المسددة",
      "addReceipt": "إضافة فاتورة (Bon)",
      "addPayment": "تسديد دفعة",
      "schedulePayment": "جدولة دفعة (أجندة)",
      "amount": "المبلغ",
      "date": "التاريخ",
      "time": "الوقت",
      "note": "ملاحظة / بيان"
    },
    "modal": {
      "selectEmployee": "-- حدد اسم العامل --",
      "selectSupplier": "-- حدد اسم المورد --",
      "nameLabel": "اسم المورد",
      "phoneLabel": "رقم الهاتف",
      "debtLabel": "الدين الأولي (د.ج)",
      "saveBtn": "حفظ المورد",
      "cancelBtn": "إلغاء",
      "scheduleTitle": "جدولة دفعة قادمة",
      "notePlaceholder": "ملاحظة للتنبيه...",
      "confirmScheduleBtn": "تأكيد الجدولة"
    }
  },
  "payroll": {
    "title": "الرواتب والسلفيات",
    "subtitle": "إدارة ساعات العمل، السلف، ودفع الرواتب الأسبوعية",
    "tabs": {
      "calculator": "حاسبة الرواتب",
      "advances": "سجل السلفيات العام",
      "salaries": "سجل الرواتب المدفوعة"
    },
    "calculator": "حاسبة الرواتب",
    "selectEmployee": "-- اختر الموظف --",
    "selectCaisse": "-- اختر الكاشير --",
    "caisse": "الكاشير (الدافع)",
    "period": "الفترة (من - إلى)",
    "startDate": "من تاريخ (بداية الأسبوع)",
    "endDate": "إلى تاريخ (نهاية الأسبوع)",
    "hourlyRate": "سعر الساعة (د.ج)",
    "calculateBtn": "حساب الراتب",
    "results": "النتيجة النهائية",
    "totalHours": "إجمالي ساعات العمل",
    "grossSalary": "الراتب الإجمالي",
    "deductions": "الخصومات (السلفيات)",
    "netSalary": "الصافي للدفع",
    "negativeSalaryError": "لا يمكن دفع الراتب! السلفيات والخصومات تتجاوز الراتب الإجمالي.",
    "payBtn": "اعتماد ودفع الراتب",
    "advancesTitle": "سجل السلفيات",
    "addAdvance": "إضافة سلفة",
    "noAdvances": "لا توجد سلفيات مسجلة",
    "statusPending": "معلقة",
    "statusPaid": "تم الخصم",
    "amount": "المبلغ",
    "date": "التاريخ",
    "rolloverConfirm": "الصافي بالسالب! هل تريد تأكيد السجل؟ \n(سيتم حفظ الراتب في السجل، ولن يُصرف نقد، وسيتم ترحيل الباقي كسلفة تلقائياً للأسبوع القادم)",
    "standardConfirm": "هل أنت متأكد من دفع الراتب واعتماده؟",
    "rolloverBtn": "تأكيد السجل وترحيل السلفة المتبقية",
    "rolloverNote": "ترحيل ديون سلفيات بعد اقتطاع راتب ({{start}} إلى {{end}})",
    "expenseNote": "راتب الموظف {{name}} (أسبوع: {{start}} إلى {{end}})",
    "note": "ملاحظة"
  },
  "hr": {
    "title": "الموارد البشرية",
    "subtitle": "إدارة الحضور، الورديات، وسجلات العمال",
    "attendanceLog": "سجل الحضور والانصراف",
    "tabs": {
      "attendance": "سجل الحضور اليومي",
      "employees": "إدارة الموظفين"
    },
    "scanner": {
      "title": "سجل الدخول والخروج",
      "placeholder": "أدخل الرمز أو امسح الباركود...",
      "submit": "تسجيل"
    },
    "kpi": {
      "present": "حاضر اليوم",
      "absent": "غائب"
    },
    "table": {
      "name": "اسم العامل",
      "nameWithRole": "اسم الموظف (المنصب)",
      "timeIn": "وقت الدخول",
      "timeOut": "وقت الخروج",
      "status": "الحالة",
      "empty": "لا توجد سجلات لليوم",
      "emptyRecord": "لا توجد سجلات حضور لهذا التاريخ",
      "loading": "جاري التحميل..."
    },
    "status": {
      "present": "حاضر الآن",
      "departed": "انصرف"
    },
    "employees": {
      "addBtn": "موظف جديد",
      "search": "ابحث عن موظف بالاسم...",
      "empty": "لا يوجد موظفين",
      "table": {
        "name": "اسم الموظف",
        "role": "المنصب",
        "status": "الحالة",
        "actions": "الإجراءات"
      },
      "status": {
        "active": "نشط"
      }
    },
    "dialog": {
      "title": "إضافة موظف جديد",
      "desc": "أدخل بيانات الموظف. يجب أن يكون رمز (PIN) فريداً لكل موظف.",
      "name": "الاسم الكامل",
      "namePlaceholder": "مثال: فاتح حمة",
      "role": "المنصب",
      "rolePlaceholder": "مثال: بائع",
      "pin": "رمز الدخول (PIN)",
      "cancel": "إلغاء",
      "save": "حفظ الموظف"
    },
    "messages": {
      "checkIn": "تم تسجيل الدخول",
      "checkOut": "تم تسجيل الخروج",
      "error": "حدث خطأ. قد يكون رمز الدخول مستخدماً بالفعل."
    }
  },
  "expenses": {
    "title": "المصاريف والسلفيات",
    "subtitle": "تتبع مصاريف المتجر اليومية وسلفيات العمال",
    "addExpense": "إضافة مصروف",
    "editExpense": "تعديل المصروف",
    "saveChanges": "حفظ التعديلات",
    "deleteConfirm": "هل أنت متأكد من حذف هذا المصروف؟ لا يمكن التراجع عن هذا الإجراء.",
    "searchPlaceholder": "ابحث في الوصف...",
    "kpi": {
      "today": "مصاريف اليوم",
      "month": "مصاريف هذا الشهر"
    },
    "prefixes": {
      "advance": "سلفة",
      "supplier": "دفعة مورد"
    },
    "table": {
      "date": "التاريخ",
      "description": "الوصف",
      "category": "التصنيف",
      "amount": "المبلغ",
      "actions": "الإجراءات",
      "locked": "مقفلة",
      "managedElsewhere": "لا يمكن التعديل من هنا. يجب الذهاب إلى صفحة السلف أو الموردين لضمان دقة الحسابات."
    },
    "categories": {
      "utilities": "فواتير ومرافق",
      "maintenance": "صيانة",
      "supplies": "مستلزمات المتجر",
      "advance": "سلفة عامل",
      "supplier_payment": "تسديد دفعة مورد",
      "salaries": "رواتب"
    }
  },
  "agenda": {
    "title": "أجندة المتجر",
    "subtitle": "إدارة مواعيد الاستلام، المدفوعات القادمة، والمهام",
    "addTask": "مهمة جديدة",
    "scheduledPaymentTitle": "دفعة مجدولة للمورد:",
    "scheduledPaymentDesc": "دفعة مجدولة بتاريخ {{date}} لمورد {{name}} بمبلغ {{amount}} د.ج",
    "dueThisWeek": "مستحق هذا الأسبوع",
    "filters": {
      "all": "كل المهام",
      "pending": "قيد الانتظار",
      "completed": "مكتملة"
    },
    "types": {
      "delivery": "استلام سلع",
      "payment": "تسديد مستحقات",
      "maintenance": "صيانة"
    },
    "sections": {
      "today": "جدول اليوم",
      "upcoming": "المهام القادمة"
    },
    "modal": {
      "taskTitleLabel": "عنوان المهمة",
      "taskTypeLabel": "نوع المهمة",
      "dateLabel": "التاريخ",
      "timeLabel": "الوقت",
      "saveBtn": "إضافة المهمة",
      "cancelBtn": "إلغاء"
    }
  },
  "login": {
    "title": "مرحباً بعودتك",
    "subtitle": "قم بتسجيل الدخول للوصول إلى لوحة التحكم",
    "username": "اسم المستخدم",
    "password": "كلمة المرور",
    "submit": "تسجيل الدخول",
    "loading": "جاري التحقق...",
    "error": "اسم المستخدم أو كلمة المرور غير صحيحة",
    "serverError": "حدث خطأ في الاتصال بقاعدة البيانات"
  }
}
```

---

## `frontend\src\locales\en\translation.json`

```json
{
  "common": {
    "search": "Search...",
    "superAdmin": "Super Admin",
    "systemOwner": "System Owner",
    "noResults": "No results found.",
    "success": "Operation successful",
    "errorScheduling": "Error scheduling payment",
    "cancel": "Cancel"
  },
  "currency": "DZD",
  "eod": {
    "title": "Close Shift",
    "open_shift_title": "Open New Shift",
    "open_shift_desc": "Enter opening balance to start shift for:",
    "open_shift_btn": "Start Shift",
    "active_shift": "Active Shift",
    "closure_date": "Closure Date",
    "total_expenses": "Total Expenses",
    "supplier_payments": "Supplier Payments",
    "advances": "Employee Advances",
    "opening_balance": "Opening Balance",
    "actual_cash": "Actual Cash (in drawer)",
    "total_deducted": "Total Deductions (Out)",
    "today_sales": "Collected Income (Net Sales)",
    "notes": "Closure Notes",
    "save_btn": "Confirm & Close Shift",
    "confirmClose": "Are you sure you want to end this shift and close the register?",
    "closeSuccess": "Shift closed successfully."
  },
  "sidebar": {
    "dashboard": "Dashboard",
    "suppliers": "Suppliers",
    "hr": "Human Resources",
    "expenses": "Expenses",
    "payroll": "Payroll",
    "agenda": "Agenda",
    "end_of_day": "End of Day",
    "settings": "Users & Settings"
  },
  "dashboard": {
    "title": "Dashboard",
    "subtitle": "System overview & financial metrics",
    "quickAction": "Quick Action",
    "quickActionExpense": "Quick Expense",
    "kpi": {
      "totalDebts": "Total Debts (Suppliers)",
      "dueThisWeek": "Due This Week",
      "activeEmployees": "Active Employees",
      "expenses": "Expenses & Advances"
    },
    "charts": {
      "topCreditors": "Top 5 Creditors",
      "expensesDist": "Expenses Distribution"
    },
    "actions": {
      "payNow": "Pay Now"
    },
    "lists": {
      "urgentAlerts": "Urgent Agenda Alerts",
      "recentAudit": "Recent Audit Logs",
      "comingSoon": "Coming Soon",
      "auditDesc": "Will be activated later to monitor accountant activity",
      "inDevelopment": "In Development"
    },
    "alerts": {
      "systemTitle": "Urgent System Alerts ⚠️",
      "urgentBody": "You have {{count}} urgent tasks (payments or receipts) due today or overdue!",
      "noTasks": "No urgent tasks found at the moment."
    }
  },
  "suppliers": {
    "title": "Suppliers & Debts",
    "subtitle": "Manage supplier accounts and unpaid invoices",
    "addSupplier": "New Supplier",
    "searchPlaceholder": "Search suppliers by name or phone...",
    "table": {
      "name": "Supplier Name",
      "phone": "Phone Number",
      "totalDebt": "Total Debt",
      "status": "Status",
      "actions": "Actions"
    },
    "status": {
      "clear": "Clear (No Debt)",
      "indebted": "Indebted"
    },
    "actions": {
      "view": "View Details",
      "pay": "Make Payment"
    },
    "details": {
      "caisse": "Caisse Source (Cashier)",
      "caisseLabel": "Caisse: ",
      "receipts": "Receipts",
      "payments": "Payments",
      "addReceipt": "Add Receipt",
      "addPayment": "Make Payment",
      "schedulePayment": "Schedule Payment",
      "amount": "Amount",
      "date": "Date",
      "time": "Time",
      "note": "Note"
    },
    "modal": {
      "selectEmployee": "-- Select Employee --",
      "selectSupplier": "-- Select Supplier --",
      "nameLabel": "Supplier Name",
      "phoneLabel": "Phone Number",
      "debtLabel": "Initial Debt (DA)",
      "saveBtn": "Save",
      "cancelBtn": "Cancel",
      "scheduleTitle": "Schedule Upcoming Payment",
      "notePlaceholder": "Note for reminder...",
      "confirmScheduleBtn": "Confirm Schedule"
    }
  },
  "payroll": {
    "title": "Payroll & Advances",
    "subtitle": "Manage work hours, advances, and weekly salary payments",
    "tabs": {
      "calculator": "Payroll Calculator",
      "advances": "Advances Log",
      "salaries": "Salaries Log"
    },
    "calculator": "Payroll Calculator",
    "selectEmployee": "-- Select Employee --",
    "selectCaisse": "-- Select Cashier --",
    "caisse": "Cashier (Source)",
    "period": "Period (From - To)",
    "startDate": "From Date (Start of Week)",
    "endDate": "To Date (End of Week)",
    "hourlyRate": "Hourly Rate (DA)",
    "calculateBtn": "Calculate Payroll",
    "results": "Final Result",
    "totalHours": "Total Hours",
    "grossSalary": "Gross Salary",
    "deductions": "Deductions (Advances)",
    "netSalary": "Net to Pay",
    "negativeSalaryError": "Cannot confirm payment: Net salary is negative. Deductions exceed gross salary.",
    "payBtn": "Confirm & Pay Salary",
    "advancesTitle": "Advances Log",
    "addAdvance": "Add Advance",
    "noAdvances": "No advances recorded",
    "statusPending": "Pending",
    "statusPaid": "Deducted",
    "amount": "Amount",
    "date": "Date",
    "rolloverConfirm": "Net salary is negative! Do you want to confirm the record?\n(The salary will be logged, no cash will be paid, and the remaining debt will automatically roll over as a new advance for next week.)",
    "standardConfirm": "Are you sure you want to confirm and pay this salary?",
    "rolloverBtn": "Confirm Record & Rollover Debt",
    "rolloverNote": "Debt rollover after salary deduction ({{start}} to {{end}})",
    "expenseNote": "{{name}}'s Salary (Week: {{start}} to {{end}})",
    "note": "Note"
  },
  "hr": {
    "title": "HR & Staff",
    "subtitle": "Manage attendance, shifts, and employee records",
    "attendanceLog": "Attendance & Departure Log",
    "tabs": {
      "attendance": "Daily Attendance",
      "employees": "Manage Employees"
    },
    "scanner": {
      "title": "Check-In / Out",
      "placeholder": "Enter PIN or scan barcode...",
      "submit": "Record"
    },
    "kpi": {
      "present": "Present Today",
      "absent": "Absent"
    },
    "table": {
      "name": "Employee Name",
      "nameWithRole": "Employee Name (Position)",
      "timeIn": "Time In",
      "timeOut": "Time Out",
      "status": "Status",
      "empty": "No records for today",
      "emptyRecord": "No records found for this date",
      "loading": "Loading..."
    },
    "status": {
      "present": "Present Now",
      "departed": "Departed"
    },
    "employees": {
      "addBtn": "New Employee",
      "search": "Search employee...",
      "empty": "No employees found",
      "table": {
        "name": "Employee Name",
        "role": "Position",
        "status": "Status",
        "actions": "Actions"
      },
      "status": {
        "active": "Active"
      }
    },
    "dialog": {
      "title": "Add New Employee",
      "desc": "Enter employee details and a unique PIN code.",
      "name": "Full Name",
      "namePlaceholder": "e.g. John Doe",
      "role": "Position",
      "rolePlaceholder": "e.g. Cashier",
      "pin": "PIN Code",
      "cancel": "Cancel",
      "save": "Save Employee"
    },
    "messages": {
      "checkIn": "Checked IN",
      "checkOut": "Checked OUT",
      "error": "Error occurred. PIN might be in use."
    }
  },
  "expenses": {
    "title": "Expenses & Advances",
    "subtitle": "Track daily store expenses and employee salary advances",
    "addExpense": "Add Expense",
    "editExpense": "Edit Expense",
    "saveChanges": "Save Changes",
    "deleteConfirm": "Are you sure you want to delete this expense?",
    "searchPlaceholder": "Search by description...",
    "kpi": {
      "today": "Today's Expenses",
      "month": "This Month (Total)"
    },
    "prefixes": {
      "advance": "Advance",
      "supplier": "Supplier Payment"
    },
    "table": {
      "date": "Date",
      "description": "Description",
      "category": "Category",
      "amount": "Amount",
      "actions": "Actions",
      "locked": "Locked",
      "managedElsewhere": "Cannot edit here. Manage via Payroll or Suppliers page for data integrity."
    },
    "categories": {
      "utilities": "Utilities & Bills",
      "maintenance": "Maintenance",
      "supplies": "Store Supplies",
      "advance": "Employee Advance",
      "supplier_payment": "Supplier Payment",
      "salaries": "Salaries"
    }
  },
  "agenda": {
    "title": "Store Agenda",
    "subtitle": "Manage scheduled deliveries, upcoming payments, and tasks",
    "addTask": "New Task",
    "scheduledPaymentTitle": "Scheduled payment for:",
    "scheduledPaymentDesc": "Scheduled payment on {{date}} for {{name}} amount {{amount}} DA",
    "dueThisWeek": "Due This Week",
    "filters": {
      "all": "All Tasks",
      "pending": "Pending",
      "completed": "Completed"
    },
    "types": {
      "delivery": "Delivery",
      "payment": "Payment",
      "maintenance": "Maintenance"
    },
    "sections": {
      "today": "Today's Schedule",
      "upcoming": "Upcoming"
    },
    "modal": {
      "taskTitleLabel": "Task Title",
      "taskTypeLabel": "Task Type",
      "dateLabel": "Date",
      "timeLabel": "Time",
      "saveBtn": "Add Task",
      "cancelBtn": "Cancel"
    }
  },
  "login": {
    "title": "Welcome Back",
    "subtitle": "Sign in to access your dashboard",
    "username": "Username",
    "password": "Password",
    "submit": "Sign In",
    "loading": "Authenticating...",
    "error": "Invalid username or password",
    "serverError": "Database connection error"
  }
}
```

---

## `frontend\src\store\attendanceStore.js`

```javascript
import { create } from 'zustand';

const useAttendanceStore = create((set) => ({
  todayRecords: [],
  isLoading: false,
  error: null,

  fetchTodayRecords: async () => {
    set({ isLoading: true });
    try {
      if (window.api && window.api.getTodayAttendance) {
        const data = await window.api.getTodayAttendance();
        set({ todayRecords: data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  submitPin: async (pin) => {
    try {
      if (window.api && window.api.handlePinEntry) {
        const result = await window.api.handlePinEntry(pin);
        return result; // نُرجع النتيجة لمعالجتها في الواجهة (لإظهار تنبيه أو رسالة نجاح)
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}));

export default useAttendanceStore;
```

---

## `frontend\src\store\authStore.js`

```javascript
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  
  login: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  }
}));

export default useAuthStore;
```

---

## `frontend\src\store\employeeStore.js`

```javascript
import { create } from 'zustand';

const useEmployeeStore = create((set) => ({
  employees: [],
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      if (window.api && window.api.getEmployees) {
        const data = await window.api.getEmployees();
        set({ employees: data, isLoading: false });
      } else {
        set({ employees: [], isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addEmployee: async (employeeData) => {
    try {
      if (window.api && window.api.addEmployee) {
        const newEmployee = await window.api.addEmployee(employeeData);
        set((state) => ({ employees: [newEmployee, ...state.employees] }));
        return true; 
      }
      return false;
    } catch (error) {
      set({ error: error.message });
      return false; 
    }
  }
}));

export default useEmployeeStore;
```

---

## `frontend\src\store\expenseStore.js`

```javascript
import { create } from 'zustand';

const useExpenseStore = create((set) => ({
  // 1. الأهم: القيمة الافتراضية يجب أن تكون مصفوفة فارغة وليس null
  expenses: [], 
  isLoading: false,
  error: null,

  // جلب المصاريف من قاعدة البيانات
  fetchExpenses: async () => {
    set({ isLoading: true, error: null });
    try {
      // استدعاء الدالة من الجسر (preload.js)
      const data = await window.api.getExpenses(); 
      // التأكد من أن القيمة المرجعة هي مصفوفة دائماً
      set({ expenses: data || [], isLoading: false });
    } catch (err) {
      console.error("Error fetching expenses:", err);
      set({ error: err.message, isLoading: false, expenses: [] });
    }
  },

  // إضافة مصروف جديد
  addExpense: async (expenseData) => {
    try {
      const result = await window.api.addExpense(expenseData);
      if (result && result.success) {
        // تحديث القائمة تلقائياً بعد الإضافة
        const data = await window.api.getExpenses();
        set({ expenses: data || [] });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding expense:", err);
      return false;
    }
  }
}));

export default useExpenseStore;
```

---

## `frontend\src\store\payrollStore.js`

```javascript
import { create } from 'zustand';

const usePayrollStore = create((set, get) => ({
  advances: [],
  salaries: [],
  payrollResult: null,
  isLoading: false,

  fetchAdvances: async (employeeId = null) => {
    try {
      const data = await window.api.getAdvances(employeeId);
      set({ advances: data || [] });
    } catch (error) {
      console.error('Error fetching advances:', error);
    }
  },

  fetchSalaries: async () => {
    try {
      const data = await window.api.getSalaries();
      set({ salaries: data || [] });
    } catch (error) {
      console.error('Error fetching salaries:', error);
    }
  },

  addAdvance: async (data) => {
    try {
      const res = await window.api.addAdvance(data);
      if (res.success) {
        get().fetchAdvances(); // تحديث القائمة العامة
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding advance:', error);
      return false;
    }
  },

  calculatePayroll: async (params) => {
    set({ isLoading: true });
    try {
      const result = await window.api.calculatePayroll(params);
      set({ payrollResult: result, isLoading: false });
      return result;
    } catch (error) {
      console.error('Error calculating payroll:', error);
      set({ isLoading: false });
      return null;
    }
  },

  paySalary: async (data) => {
    try {
      const res = await window.api.paySalary(data);
      if (res.success) {
        set({ payrollResult: null }); 
        get().fetchAdvances();
        get().fetchSalaries();
        return { success: true };
      }
      return { success: false, error: res.error };
    } catch (error) {
      console.error('Error paying salary:', error);
      return { success: false, error: error.message };
    }
  },
  clearPayrollResult: () => set({ payrollResult: null })
}));

export default usePayrollStore;
```

---

## `frontend\src\store\supplierStore.js`

```javascript
import { create } from 'zustand';

const useSupplierStore = create((set, get) => ({
  suppliers: [],
  currentSupplier: null, // سيحمل بيانات المورد المحدد مع فواتيره ودفعاته
  isLoading: false,
  error: null,

  fetchSuppliers: async () => {
    set({ isLoading: true, error: null });
    try {
      if (window.api && window.api.getSuppliers) {
        const data = await window.api.getSuppliers();
        set({ suppliers: data, isLoading: false });
      } else {
        set({ suppliers: [], isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addSupplier: async (supplierData) => {
    try {
      if (window.api && window.api.addSupplier) {
        const newSupplier = await window.api.addSupplier(supplierData);
        set((state) => ({ suppliers: [newSupplier, ...state.suppliers] }));
        return true;
      }
      return false;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
  },

  // --- الدوال الجديدة الخاصة بالتفاصيل والعمليات المحاسبية ---

  fetchSupplierDetails: async (id) => {
    set({ isLoading: true, error: null });
    try {
      if (window.api && window.api.getSupplierDetails) {
        const data = await window.api.getSupplierDetails(id);
        set({ currentSupplier: data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  clearCurrentSupplier: () => set({ currentSupplier: null }),

addReceipt: async (receiptData) => {
    try {
      if (window.api && window.api.addReceipt) {
        const result = await window.api.addReceipt(receiptData);
        if (result.success) {
          // تحديث تفاصيل المورد الحالي وتحديث القائمة الرئيسية ليعكس الدين الجديد
          await get().fetchSupplierDetails(receiptData.supplierId);
          await get().fetchSuppliers();
          return true;
        } else {
          alert("فشلت إضافة الفاتورة. السبب التقني:\n" + result.error);
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  addPayment: async (paymentData) => {
    try {
      if (window.api && window.api.addPayment) {
        const result = await window.api.addPayment(paymentData);
        if (result.success) {
          // تحديث تفاصيل المورد الحالي وتحديث القائمة الرئيسية
          await get().fetchSupplierDetails(paymentData.supplierId);
          await get().fetchSuppliers();
          return true;
        } else {
          alert("فشلت إضافة الدفعة. السبب التقني:\n" + result.error);
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}));

export default useSupplierStore;
```

---

