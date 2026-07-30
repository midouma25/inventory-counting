# Project Structure

```text
inventory-counting/
    ├── README.md
    ├── extract_code.py
    ├── project_structure.md
    ├── project_structure1.md
    ├── project_structure10.md
    ├── project_structure11.md
    ├── project_structure12.md
    ├── project_structure13.md
    ├── project_structure14.md
    ├── project_structure15.md
    ├── project_structure16.md
    ├── project_structure17.md
    ├── project_structure18.md
    ├── project_structure19.md
    ├── project_structure2.md
    ├── project_structure20.md
    ├── project_structure21.md
    ├── project_structure22.md
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
    ├── splash.html
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
        ├── networkApi.js
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
                ├── POS.jsx
                ├── Payroll.jsx
                ├── PrintPreview.jsx
                ├── Suppliers.jsx
            ├── ui/
                ├── ConfirmAlert.jsx
                ├── Modal.jsx
                ├── PrintablePayrollReport.jsx
                ├── PrintablePayslip.jsx
                ├── PrintableTicket.jsx
            ├── utils/
        ├── locales/
            ├── ar/
                ├── translation.json
            ├── en/
                ├── translation.json
        ├── store/
            ├── attendanceStore.js
            ├── auditStore.js
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

OUTPUT_FILE = "project_structure22.md"
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

## `project_structure22.md`

```markdown

```

---

## `backend\database.js`

```javascript
const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const ExcelJS = require('exceljs');
const dbPath = path.join(app.getPath('userData'), 'pos_manager3.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

function initDatabase() {
  try {
    db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'admin')`).run();
    try { 
      db.prepare("UPDATE users SET role = 'superadmin' WHERE username = 'admin'").run(); 
      db.prepare("UPDATE employees SET role = 'superadmin' WHERE name = 'admin'").run(); 
    } catch(e) {}
    const checkAdmin = db.prepare("SELECT COUNT(*) as count FROM users WHERE username = 'admin'").get();
    if (checkAdmin.count === 0) {
      db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run('admin', 'admin', 'superadmin');
    }
    db.prepare(`CREATE TABLE IF NOT EXISTS suppliers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT, initial_debt REAL DEFAULT 0, total_debt REAL DEFAULT 0, status TEXT DEFAULT 'clear', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS receipts (id INTEGER PRIMARY KEY AUTOINCREMENT, supplier_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, note TEXT, pdf_path TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (supplier_id) REFERENCES suppliers(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS payments (id INTEGER PRIMARY KEY AUTOINCREMENT, supplier_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT, note TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (supplier_id) REFERENCES suppliers(id))`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, role TEXT, pin_code TEXT UNIQUE, status TEXT DEFAULT 'active', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, date TEXT NOT NULL, time_in TEXT, time_out TEXT, status TEXT DEFAULT 'present', FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    
    // 🔴 تم التحديث هنا: إضافة caisse_source لجدول المصاريف
    db.prepare(`CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, category TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT DEFAULT 'admin', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    try { db.prepare("ALTER TABLE expenses ADD COLUMN caisse_source TEXT DEFAULT 'admin'").run(); } catch(e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS agenda_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, type TEXT NOT NULL, task_date TEXT NOT NULL, task_time TEXT, status TEXT DEFAULT 'pending', amount REAL DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    try { db.prepare("ALTER TABLE agenda_tasks ADD COLUMN amount REAL DEFAULT 0").run(); } catch (e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS advances (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT, note TEXT, status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS salaries (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, total_hours REAL NOT NULL, hourly_rate REAL NOT NULL, total_advances REAL NOT NULL, net_salary REAL NOT NULL, payment_date TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS shifts (id INTEGER PRIMARY KEY AUTOINCREMENT, cashier_name TEXT NOT NULL, opening_balance REAL NOT NULL, start_time DATETIME DEFAULT CURRENT_TIMESTAMP, end_time DATETIME, actual_cash REAL, difference REAL, status TEXT DEFAULT 'open', note TEXT)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, action TEXT NOT NULL, details TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();

  } catch (error) { console.error('خطأ أثناء تهيئة قاعدة البيانات:', error); }
}

function getUsers() { return db.prepare("SELECT id, username, role FROM users").all(); }

function addUser(data) {
  try {
    let finalUsername = data.username.trim();
    let finalRole = data.role || 'cashier';
    if (finalUsername.startsWith('boss_')) {
      finalRole = 'superadmin';
      finalUsername = finalUsername.replace('boss_', '');
    }
    const existingUser = db.prepare("SELECT * FROM users WHERE username = ?").get(finalUsername);
    const existingEmp = db.prepare("SELECT * FROM employees WHERE pin_code = ? OR name = ?").get(data.password, finalUsername);
    if (existingUser || existingEmp) return { success: false, message: 'اسم المستخدم أو رمز PIN مستخدم بالفعل.' };
    const insertTx = db.transaction(() => {
      const userInfo = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(finalUsername, data.password, finalRole);
      db.prepare("INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)").run(finalUsername, finalRole, data.password);
      return userInfo.lastInsertRowid;
    });
    return { success: true, id: insertTx() };
  } catch (error) { return { success: false, message: error.message }; }
}

function deleteUser(id) {
  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!user || user.username === 'admin') return { success: false };
    const emp = db.prepare("SELECT * FROM employees WHERE name = ?").get(user.username);
    if (emp) return deleteEmployee(emp.id); 
    db.prepare("DELETE FROM users WHERE id = ?").run(id);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getEmployees() { return db.prepare("SELECT * FROM employees WHERE status = 'active' OR status IS NULL ORDER BY id DESC").all(); }

function addEmployee(data) {
  try {
    const exist = db.prepare("SELECT * FROM employees WHERE pin_code = ? OR name = ?").get(data.pinCode, data.name);
    if (exist) return { error: 'اسم الموظف أو رمز PIN مستخدم بالفعل!' };
    const insertTx = db.transaction(() => {
      const info = db.prepare(`INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)`).run(data.name, data.role, data.pinCode);
      try { db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(data.name, data.pinCode, data.role); } catch(e) {}
      return info.lastInsertRowid;
    });
    return db.prepare("SELECT * FROM employees WHERE id = ?").get(insertTx());
  } catch (error) { return { error: error.message }; }
}

function updateEmployee(id, data) {
  try {
    const oldEmp = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);
    if (oldEmp) {
      let finalName = data.name.trim();
      let finalRole = data.role;
      if (finalName.startsWith('boss_')) { finalRole = 'superadmin'; finalName = finalName.replace('boss_', ''); }
      const exist = db.prepare("SELECT * FROM employees WHERE (pin_code = ? OR name = ?) AND id != ?").get(data.pinCode, finalName, id);
      if (exist) return { error: 'اسم الموظف أو رمز PIN مستخدم بالفعل من قبل شخص آخر!' };
      db.prepare("UPDATE employees SET name = ?, role = ?, pin_code = ? WHERE id = ?").run(finalName, finalRole, data.pinCode, id);
      db.prepare("UPDATE users SET username = ?, password = ?, role = ? WHERE username = ?").run(finalName, data.pinCode, finalRole, oldEmp.name);
    }
    return { success: true };
  } catch (error) { return { error: error.message }; }
}

function deleteEmployee(id) {
  try {
    const emp = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);
    if (!emp) return { success: false, error: 'Not found' };
    const hasAtt = db.prepare("SELECT COUNT(*) as c FROM attendance WHERE employee_id = ?").get(id).c;
    const hasSal = db.prepare("SELECT COUNT(*) as c FROM salaries WHERE employee_id = ?").get(id).c;
    const hasAdv = db.prepare("SELECT COUNT(*) as c FROM advances WHERE employee_id = ?").get(id).c;
    if (hasAtt > 0 || hasSal > 0 || hasAdv > 0) {
      db.prepare("UPDATE employees SET status = 'inactive', name = name || ' (محذوف ' || id || ')', pin_code = pin_code || '_del_' || id WHERE id = ?").run(id);
      db.prepare("DELETE FROM users WHERE username = ? AND username != 'admin'").run(emp.name);
      return { success: true, isSoftDeleted: true };
    } else {
      db.prepare("DELETE FROM users WHERE username = ? AND username != 'admin'").run(emp.name);
      db.prepare("DELETE FROM employees WHERE id = ?").run(id);
      return { success: true };
    }
  } catch (error) { return { success: false, error: error.message }; }
}

function getSalaries() {
  const salaries = db.prepare("SELECT s.*, e.name as employee_name FROM salaries s JOIN employees e ON s.employee_id = e.id ORDER BY s.payment_date DESC, s.id DESC").all();
  for (let i = 0; i < salaries.length; i++) {
    const logs = db.prepare("SELECT date, time_in, time_out FROM attendance WHERE employee_id = ? AND date >= ? AND date <= ? ORDER BY date ASC").all(salaries[i].employee_id, salaries[i].start_date, salaries[i].end_date);
    salaries[i].daily_logs = logs;
  }
  return salaries;
}

// 🔴 تم التحديث: جلب المصاريف مع ميزة التصفية حسب الصندوق
function getExpenses(caisseFilter) { 
  let filterQuery = "";
  let queryParams = [];
  
  if (caisseFilter && caisseFilter !== 'all') {
    filterQuery = " WHERE caisse_source = ?";
    queryParams.push(caisseFilter);
  }

  return db.prepare(`
    SELECT * FROM (
      SELECT id, description, category, amount, date, 'expense' as source, caisse_source FROM expenses 
      UNION ALL 
      SELECT a.id, e.name || (CASE WHEN a.note != '' THEN ' - ' || a.note ELSE '' END) as description, 'advance' as category, a.amount, a.date, 'advance' as source, a.caisse_source FROM advances a JOIN employees e ON a.employee_id = e.id 
      UNION ALL 
      SELECT p.id, s.name || (CASE WHEN p.note != '' THEN ' - ' || p.note ELSE '' END) as description, 'supplier_payment' as category, p.amount, p.date, 'supplier_payment' as source, p.caisse_source FROM payments p JOIN suppliers s ON p.supplier_id = s.id
    )
    ${filterQuery}
    ORDER BY date DESC, id DESC
  `).all(...queryParams); 
}

// 🔴 تم التحديث: إضافة المصروف مع تسجيل مصدر الصندوق تلقائياً
function addExpense(expense) { 
  const stmt = db.prepare('INSERT INTO expenses (description, category, amount, date, caisse_source) VALUES (?, ?, ?, ?, ?)'); 
  const date = expense.date || new Date().toISOString().split('T')[0]; 
  const caisse = expense.caisseSource || 'admin';
  const info = stmt.run(expense.description, expense.category, expense.amount, date, caisse); 
  return { success: true, id: info.lastInsertRowid }; 
}

function openShift(data) { const activeShift = db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(data.cashierName); if (activeShift) return { success: false, message: 'لديك وردية مفتوحة بالفعل.' }; const info = db.prepare('INSERT INTO shifts (cashier_name, opening_balance) VALUES (?, ?)').run(data.cashierName, data.openingBalance); return { success: true, shiftId: info.lastInsertRowid }; }
function getActiveShift(cashierName) { return db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(cashierName); }
function closeShift(data) { const endTime = new Date().toISOString(); db.prepare(`UPDATE shifts SET end_time = actual_cash = ?, difference = ?, status = 'closed', note = ? WHERE id = ?`).run(endTime, data.actualCash, data.difference, data.note, data.shiftId); return { success: true }; }
function getShiftSummary(cashierName, startTime) { try { let paymentsRow, advancesRow, expensesRow; if (cashierName === 'المدير العام' || cashierName === 'Super Admin' || cashierName === 'admin') { expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ?").get(startTime); paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ?").get(startTime); advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ?").get(startTime); } else { expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime); paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime); advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime); } return { success: true, data: { expenses: expensesRow.total || 0, supplierPayments: paymentsRow.total || 0, advances: advancesRow.total || 0, totalOut: (expensesRow.total || 0) + (paymentsRow.total || 0) + (advancesRow.total || 0) } }; } catch (error) { return { success: false, error: error.message }; } }
async function generateExcelBackup(outputPath) { const workbook = new ExcelJS.Workbook(); await workbook.xlsx.writeFile(outputPath); }
function updateExpense(id, expense) { 
  try {
    const result = db.prepare('UPDATE expenses SET description = ?, category = ?, amount = ?, date = ?, caisse_source = ? WHERE id = ?')
      .run(expense.description, expense.category, expense.amount, expense.date, expense.caisseSource, id);
    return { success: result.changes > 0 };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


function updateAdvance(id, advanceData) {
  try {
    // 1. جلب بيانات السلفة القديمة للبحث عن المصروف المرتبط بها
    const oldAdvance = db.prepare('SELECT * FROM advances WHERE id = ?').get(id);
    if (!oldAdvance) return { success: false, error: 'Advance not found' };

    // 2. تحديث السلفة في جدول السلفيات
    db.prepare('UPDATE advances SET amount = ?, date = ?, note = ?, caisse_source = ? WHERE id = ?')
      .run(advanceData.amount, advanceData.date, advanceData.note, advanceData.caisseSource, id);

    // 3. تحديث المصروف المرتبط في جدول المصاريف (بناءً على البيانات القديمة)
    db.prepare(`
      UPDATE expenses 
      SET amount = ?, date = ?, description = ?, caisse_source = ?
      WHERE category = 'advance' AND employee_id = ? AND amount = ? AND date = ?
    `).run(
      advanceData.amount, 
      advanceData.date, 
      advanceData.note, 
      advanceData.caisseSource, 
      oldAdvance.employee_id, 
      oldAdvance.amount, 
      oldAdvance.date
    );

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function deleteAdvance(id) {
  try {
    const advance = db.prepare('SELECT * FROM advances WHERE id = ?').get(id);
    if (!advance) return { success: false, error: 'Advance not found' };

    // لا يمكن حذف سلفة تم خصمها بالفعل من الراتب
    if (advance.status === 'deducted') {
      return { success: false, error: 'Cannot delete a deducted advance.' };
    }

    // 1. حذف المصروف المرتبط من الصندوق أولاً لكي تعود الأموال
    db.prepare(`
      DELETE FROM expenses 
      WHERE category = 'advance' AND employee_id = ? AND amount = ? AND date = ?
    `).run(advance.employee_id, advance.amount, advance.date);

    // 2. حذف السلفة من جدول السلفيات
    db.prepare('DELETE FROM advances WHERE id = ?').run(id);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


function verifyLogin(username, password) { try { const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password); if (user) return { success: true, user: { id: user.id, username: user.username, role: user.role } }; return { success: false, message: 'Invalid username or password' }; } catch (error) { return { success: false, message: error.message }; } }
function handlePinEntry(pinCode) { const employee = db.prepare("SELECT * FROM employees WHERE pin_code = ? AND status = 'active'").get(pinCode); if (!employee) return { success: false, message: 'رمز PIN غير صحيح أو حساب معطل' }; const today = new Date().toISOString().split('T')[0]; const now = new Date().toLocaleTimeString('en-US', { hour12: false }); const record = db.prepare("SELECT * FROM attendance WHERE employee_id = ? AND date = ?").get(employee.id, today); if (!record) { db.prepare("INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)").run(employee.id, today, now); return { success: true, action: 'check_in', employeeName: employee.name, time: now }; } else if (!record.time_out) { db.prepare("UPDATE attendance SET time_out = ? WHERE id = ?").run(now, record.id); return { success: true, action: 'check_out', employeeName: employee.name, time: now }; } else { return { success: false, message: `الموظف ${employee.name} أتم تسجيل الحضور والانصراف اليوم` }; } }
function getTodayAttendance(date) { return db.prepare(`SELECT a.*, e.name as employee_name, e.role FROM attendance a JOIN employees e ON a.employee_id = e.id WHERE a.date = ? ORDER BY a.time_in DESC`).all(date); }
function getSuppliers() { return db.prepare("SELECT * FROM suppliers ORDER BY id DESC").all(); }
function addSupplier(supplierData) { const status = supplierData.initialDebt > 0 ? 'indebted' : 'clear'; const info = db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`).run(supplierData.name, supplierData.phone, supplierData.initialDebt, supplierData.initialDebt, status); return db.prepare("SELECT * FROM suppliers WHERE id = ?").get(info.lastInsertRowid); }
function getSupplierDetails(supplierId) { const supplier = db.prepare('SELECT * FROM suppliers WHERE id = ?').get(supplierId); if (!supplier) return null; const receipts = db.prepare('SELECT * FROM receipts WHERE supplier_id = ? ORDER BY date DESC').all(supplierId); const payments = db.prepare('SELECT * FROM payments WHERE supplier_id = ? ORDER BY date DESC').all(supplierId); return { ...supplier, receipts, payments }; }
const updateReceipt = db.transaction((id, data) => { const old = db.prepare('SELECT * FROM receipts WHERE id = ?').get(id); if(!old) return { success: false, error: 'Not found' }; const diff = Number(data.amount) - old.amount; db.prepare('UPDATE receipts SET amount = ?, date = ?, note = ? WHERE id = ?').run(Number(data.amount), data.date, data.note, id); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = CASE WHEN (total_debt + ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, old.supplier_id); return { success: true }; });
const updatePayment = db.transaction((id, data) => { const old = db.prepare('SELECT * FROM payments WHERE id = ?').get(id); if(!old) return { success: false, error: 'Not found' }; const diff = Number(data.amount) - old.amount; db.prepare('UPDATE payments SET amount = ?, date = ?, note = ? WHERE id = ?').run(Number(data.amount), data.date, data.note, id); db.prepare("UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, old.supplier_id); return { success: true }; });
function updateSupplier(id, data) { try { const old = db.prepare('SELECT initial_debt, total_debt FROM suppliers WHERE id = ?').get(id); if (!old) return { success: false, error: 'Not found' }; const diff = Number(data.initialDebt) - old.initial_debt; db.prepare('UPDATE suppliers SET name = ?, phone = ?, initial_debt = ? WHERE id = ?').run(data.name, data.phone, data.initialDebt, id); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = CASE WHEN (total_debt + ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, id); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteSupplier(id) { try { const receipts = db.prepare("SELECT COUNT(*) as c FROM receipts WHERE supplier_id = ?").get(id).c; const payments = db.prepare("SELECT COUNT(*) as c FROM payments WHERE supplier_id = ?").get(id).c; if (receipts > 0 || payments > 0) return { success: false, errorKey: 'deleteProtected' }; db.prepare('DELETE FROM suppliers WHERE id = ?').run(id); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteReceipt(id) { try { const receipt = db.prepare('SELECT amount, supplier_id FROM receipts WHERE id = ?').get(id); if (!receipt) return { success: false, error: 'Receipt not found' }; const transaction = db.transaction(() => { db.prepare('UPDATE suppliers SET total_debt = total_debt - ? WHERE id = ?').run(receipt.amount, receipt.supplier_id); db.prepare("UPDATE suppliers SET status = CASE WHEN total_debt <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(receipt.supplier_id); db.prepare('DELETE FROM receipts WHERE id = ?').run(id); }); transaction(); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deletePayment(id) { try { const payment = db.prepare('SELECT amount, supplier_id FROM payments WHERE id = ?').get(id); if (!payment) return { success: false, error: 'Payment not found' }; const transaction = db.transaction(() => { db.prepare('UPDATE suppliers SET total_debt = total_debt + ? WHERE id = ?').run(payment.amount, payment.supplier_id); db.prepare("UPDATE suppliers SET status = CASE WHEN total_debt <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(payment.supplier_id); db.prepare('DELETE FROM payments WHERE id = ?').run(id); }); transaction(); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteAgendaTask(id) { db.prepare("DELETE FROM agenda_tasks WHERE id = ?").run(id); return { success: true }; }
function rescheduleAgendaTask(id, newDate) { db.prepare("UPDATE agenda_tasks SET task_date = ? WHERE id = ?").run(newDate, id); return { success: true }; }
const addReceipt = db.transaction((data) => { const supplierId = Number(data.supplierId); const amount = Number(data.amount) || 0; const date = data.date || new Date().toISOString().split('T')[0]; const info = db.prepare('INSERT INTO receipts (supplier_id, amount, date, note) VALUES (?, ?, ?, ?)').run(supplierId, amount, date, data.note || ''); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = 'indebted' WHERE id = ?").run(amount, supplierId); return info.lastInsertRowid; });
const addPayment = db.transaction((data) => { const info = db.prepare('INSERT INTO payments (supplier_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.supplierId, data.amount, data.date, data.caisseSource || 'admin', data.note); db.prepare(`UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?`).run(data.amount, data.amount, data.supplierId); return info.lastInsertRowid; });
function getAdvances(employeeId) { if (employeeId) return db.prepare("SELECT * FROM advances WHERE employee_id = ? ORDER BY date DESC").all(employeeId); return db.prepare("SELECT a.*, e.name as employee_name FROM advances a JOIN employees e ON a.employee_id = e.id ORDER BY a.date DESC").all(); }
function addAdvance(data) { const info = db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.employeeId, data.amount, data.date, data.caisseSource || 'admin', data.note || ''); return { success: true, id: info.lastInsertRowid }; }
function calculateEmployeePayroll(employeeId, startDate, endDate, hourlyRate) { const attendances = db.prepare(`SELECT * FROM attendance WHERE employee_id = ? AND date >= ? AND date <= ?`).all(employeeId, startDate, endDate); let totalHours = 0; attendances.forEach(record => { if (record.time_in && record.time_out) { const tIn = record.time_in.split(':'); const tOut = record.time_out.split(':'); const dIn = new Date(2000, 0, 1, tIn[0], tIn[1], tIn[2] || 0); const dOut = new Date(2000, 0, 1, tOut[0], tOut[1], tOut[2] || 0); let diff = (dOut - dIn) / (1000 * 60 * 60); if (diff < 0) diff += 24; totalHours += diff; } }); const pendingAdvances = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE employee_id = ? AND status = 'pending'`).get(employeeId).total || 0; const grossSalary = totalHours * hourlyRate; const netSalary = grossSalary - pendingAdvances; return { employeeId, startDate, endDate, totalHours: Number(totalHours.toFixed(2)), hourlyRate, grossSalary: Number(grossSalary.toFixed(2)), totalAdvances: pendingAdvances, netSalary: Number(netSalary.toFixed(2)) }; }
const paySalary = db.transaction((data) => { try { const empId = Number(data.employeeId); const pDate = data.date || new Date().toISOString().split('T')[0]; db.prepare(`INSERT INTO salaries (employee_id, start_date, end_date, total_hours, hourly_rate, total_advances, net_salary, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(empId, data.startDate || '', data.endDate || '', Number(data.totalHours) || 0, Number(data.hourlyRate) || 0, Number(data.totalAdvances) || 0, Number(data.netSalary) || 0, pDate); db.prepare(`UPDATE advances SET status = 'paid' WHERE employee_id = ? AND status = 'pending'`).run(empId); if (Number(data.netSalary) < 0) { db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note, status) VALUES (?, ?, ?, ?, ?, ?)').run(empId, Math.abs(Number(data.netSalary)), pDate, 'admin', data.rolloverNote || `ترحيل ديون سلفيات`, 'pending'); } else if (Number(data.netSalary) > 0) { db.prepare(`INSERT INTO expenses (description, category, amount, date, caisse_source) VALUES (?, ?, ?, ?, ?)`).run(data.expenseNote || `راتب`, 'salaries', Number(data.netSalary), pDate, 'admin'); } return { success: true }; } catch (error) { return { success: false, error: error.message }; } });
function getAgendaTasks() { return db.prepare("SELECT * FROM agenda_tasks ORDER BY task_date ASC, task_time ASC").all(); }
function addAgendaTask(data) { const info = db.prepare('INSERT INTO agenda_tasks (title, type, task_date, task_time, amount) VALUES (?, ?, ?, ?, ?)').run(data.title, data.type, data.date, data.time || '', data.amount || 0); return { ...data, id: info.lastInsertRowid, status: 'pending' }; }
function toggleAgendaTaskStatus(id, status) { db.prepare('UPDATE agenda_tasks SET status = ? WHERE id = ?').run(status, id); return { success: true }; }
function getDueThisWeek() { const today = new Date(); const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7); return db.prepare(`SELECT SUM(amount) as total FROM agenda_tasks WHERE type = 'payment' AND status = 'pending' AND task_date >= ? AND task_date <= ?`).get(today.toISOString().split('T')[0], nextWeek.toISOString().split('T')[0]).total || 0; }
function getDailySummary(date) { try { const expenses = db.prepare(`SELECT SUM(amount) as total FROM expenses WHERE date = ?`).get(date).total || 0; const payments = db.prepare(`SELECT SUM(amount) as total FROM payments WHERE date = ?`).get(date).total || 0; const advances = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE date = ?`).get(date).total || 0; return { success: true, data: { expenses, supplierPayments: payments, advances, totalOut: expenses + payments + advances } }; } catch (error) { return { success: false, error: error.message }; } }
function logAudit(username, action, details) { try { db.prepare("INSERT INTO audit_logs (username, action, details) VALUES (?, ?, ?)").run(username, action, details || ''); } catch (error) {} }
function getAuditLogs() { return db.prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100").all(); }
function deleteExpense(id, username) { const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(id); if (expense) logAudit(username || 'Unknown', 'DELETE_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount })); return { success: db.prepare('DELETE FROM expenses WHERE id = ?').run(id).changes > 0 }; }
async function backupDatabase(destPath) { try { await db.backup(destPath); return { success: true }; } catch (error) { throw error; } }
async function importSuppliersFromExcel(filePath) { try { const workbook = new ExcelJS.Workbook(); await workbook.xlsx.readFile(filePath); const worksheet = workbook.worksheets[0]; let importedCount = 0; const insertSupplier = db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`); db.transaction(() => { worksheet.eachRow((row, rowNumber) => { if (rowNumber === 1) return; const name = row.getCell(1).value?.toString() || ''; const phone = row.getCell(2).value?.toString() || ''; const initialDebtStr = row.getCell(3).value?.toString() || '0'; const initialDebt = parseFloat(initialDebtStr.replace(/[^0-9.-]+/g, "")) || 0; if (name.trim() !== '') { const status = initialDebt > 0 ? 'indebted' : 'clear'; insertSupplier.run(name.trim(), phone.trim(), initialDebt, initialDebt, status); importedCount++; } }); })(); return { success: true, count: importedCount }; } catch (error) { return { success: false, error: error.message }; } }

module.exports = {
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, addEmployee, 
  handlePinEntry, getExpenses, addExpense, deleteExpense, updateExpense, getTodayAttendance,
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary, updateReceipt, updatePayment,
  getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek, deleteAgendaTask,
  rescheduleAgendaTask, getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,
  getUsers, addUser, deleteUser,
  updateEmployee, deleteEmployee, logAudit, getAuditLogs, generateExcelBackup, backupDatabase, importSuppliersFromExcel, deleteSupplier, updateSupplier , deleteReceipt, deletePayment, updateAdvance, deleteAdvance
};
```

---

## `backend\main.js`

```javascript
const { app, BrowserWindow, ipcMain , Notification, dialog } = require('electron');
const db = require('./database'); 
const path = require('path');
const fs = require('fs');
// أضف هذا السطر لإخفاء تحذيرات الأمان أثناء التطوير
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const { 
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, 
  addEmployee, handlePinEntry, getExpenses, addExpense, deleteExpense, 
  updateExpense, getTodayAttendance, 
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary , getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask , getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,
  getUsers, addUser, deleteUser, updateEmployee, deleteEmployee ,logAudit , getAuditLogs, backupDatabase, generateExcelBackup, updateSupplier, deleteSupplier, updateAdvance, deleteAdvance  // أضفنا هذه الدوال هنا
} = require('./database');
const express = require('express');
const cors = require('cors');

function createWindow() {
  // 1. إنشاء شاشة الإقلاع أولاً
  const splash = new BrowserWindow({
    width: 650,
    height: 400,
    transparent: true, // الشفافية مفعلة لكي يظهر الحواف المنحنية فقط
    frame: false,      // بدون إطار علوي (أزرار الإغلاق والتكبير)
    alwaysOnTop: true, // تبقى فوق النوافذ الأخرى
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  // تحميل ملف HTML الخاص بشاشة الإقلاع
  splash.loadFile(path.join(__dirname, 'splash.html'));

  // 2. إنشاء النافذة الرئيسية (في الخلفية ومخفية)
  const win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    show: false, // تبقى مخفية أثناء التحميل
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.loadURL('http://localhost:5173'); // (قم بتغييرها للمسار المحلي لاحقاً عند عمل Build)

  // 3. عندما تجهز النافذة الرئيسية تماماً
  win.once('ready-to-show', () => {
    // نضع تأخير زمني بسيط (3 ثوانٍ) لكي يستمتع العميل برؤية اللوجو الخاص بك واسمك
    setTimeout(() => {
      if (!splash.isDestroyed()) {
        splash.close(); // إغلاق شاشة الإقلاع
      }
      win.show(); // إظهار البرنامج
    }, 3000); // يمكنك تقليلها إلى 1000 إذا أردت تسريع الفتح
  });
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

  ipcMain.handle('get-expenses', (event, caisseFilter) => getExpenses(caisseFilter));
  ipcMain.handle('add-expense', (event, data) => addExpense(data));
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

ipcMain.handle('get-users', () => getUsers());
  ipcMain.handle('add-user', (event, data) => addUser(data));
  ipcMain.handle('delete-user', (event, id) => deleteUser(id));


  ipcMain.handle('update-employee', (event, id, data) => updateEmployee(id, data));
  ipcMain.handle('delete-employee', (event, id) => deleteEmployee(id));

  ipcMain.handle('get-audit-logs', () => getAuditLogs());

  ipcMain.handle('delete-expense', (event, id, username) => deleteExpense(id, username));
  
  
// هذه الدالة ستحول حاسوب المدير إلى سيرفر يخدم الكاشيرات
function startLocalNetworkServer() {
  const apiApp = express();
  apiApp.use(cors());
  apiApp.use(express.json());

  // دالة ذكية تستقبل أي طلب من الكاشير وتنفذه في قاعدة البيانات
  apiApp.post('/api/:method', async (req, res) => {
    const method = req.params.method;
    const args = req.body.args || [];
    
    try {
      // التحقق من وجود الدالة في database.js
      if (typeof db[method] === 'function') {
        const result = await db[method](...args);
        res.json({ success: true, data: result });
      } else {
        res.status(404).json({ success: false, error: 'Method not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // بث الواجهة الأمامية (Frontend) ليتمكن الكاشير من فتحها بمتصفح كروم
  const frontendPath = path.join(__dirname, '..', 'frontend', 'dist'); // المسار بعد عمل Build للـ Vite
  if (fs.existsSync(frontendPath)) {
    apiApp.use(express.static(frontendPath));
  }

  // تشغيل السيرفر على البورت 3000 لجميع الأجهزة المتصلة بالراوتر
  apiApp.listen(3000, '0.0.0.0', () => {
    console.log('✅ Local Network Server is running on port 3000');
  });
}

app.whenReady().then(() => {
  initDatabase();
  setupIpcHandlers();
  startLocalNetworkServer();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.handle('backup-database', async (event) => {
  try {
    const defaultName = `POS_Backup_${new Date().toISOString().split('T')[0]}`;
    
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'حفظ النسخة الاحتياطية (قاعدة البيانات + تقرير الإكسيل)',
      defaultPath: defaultName,
      buttonLabel: 'حفظ (Save)'
    });

    if (canceled || !filePath) return { success: false, canceled: true };

    // تنظيف المسار لضمان إنشاء ملفين بنفس الاسم
    const basePath = filePath.replace(/\.[^/.]+$/, ""); 
    const dbOutputPath = `${basePath}.db`;
    const excelOutputPath = `${basePath}.xlsx`;

    // 1. توليد نسخة قاعدة البيانات (الطريقة الآمنة المخصصة لـ SQLite)
    await backupDatabase(dbOutputPath);

    // 2. توليد وحفظ تقرير الإكسيل
    await generateExcelBackup(excelOutputPath);

    return { success: true };
  } catch (error) {
    console.error("Backup Error:", error);
    return { success: false, error: error.message };
  }
});

  // 2. استعادة البيانات
  ipcMain.handle('restore-database', async () => {
    const dbPath = path.join(app.getPath('userData'), 'pos_manager2.db');
    
    // فتح نافذة للمستخدم لاختيار ملف النسخة الاحتياطية
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'اختيار ملف النسخة الاحتياطية',
      properties: ['openFile'],
      filters: [{ name: 'SQLite Database', extensions: ['sqlite'] }]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    try {
      const sourcePath = filePaths[0];
      fs.copyFileSync(sourcePath, dbPath);
      // يجب إعادة تشغيل التطبيق ليقرأ قاعدة البيانات الجديدة
      app.relaunch();
      app.exit(0);
      return { success: true };
    } catch (error) {
      console.error('Restore Error:', error);
      return { success: false, error: error.message };
    }
  });

ipcMain.handle('import-suppliers-excel', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'استيراد الموردين من ملف إكسيل',
      properties: ['openFile'],
      filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    return await db.importSuppliersFromExcel(filePaths[0]);
  });


ipcMain.handle('update-receipt', (event, id, data) => { try { return db.updateReceipt(id, data); } catch (e) { return { success: false, error: e.message }; }});
  ipcMain.handle('update-payment', (event, id, data) => { try { return db.updatePayment(id, data); } catch (e) { return { success: false, error: e.message }; }});
  ipcMain.handle('delete-receipt', (event, id) => { try { return db.deleteReceipt(id); } catch(e) { return {success: false, error: e.message}; }});
  ipcMain.handle('delete-payment', (event, id) => { try { return db.deletePayment(id); } catch(e) { return {success: false, error: e.message}; }});

  ipcMain.handle('update-supplier', async (event, id, data) => {
    return updateSupplier(id, data);
  });

  ipcMain.handle('delete-supplier', async (event, id) => {
    return deleteSupplier(id);
  });

 
  ipcMain.handle('update-advance', (event, id, data) => updateAdvance(id, data));
  ipcMain.handle('delete-advance', (event, id) => deleteAdvance(id));
  
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
    "better-sqlite3": "^12.11.1",
    "cors": "^2.8.6",
    "exceljs": "^4.4.0",
    "express": "^5.2.1"
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

  updateEmployee: (id, data) => ipcRenderer.invoke('update-employee', id, data),
  deleteEmployee: (id) => ipcRenderer.invoke('delete-employee', id),

  getAuditLogs: () => ipcRenderer.invoke('get-audit-logs'),
  deleteExpense: (id, username) => ipcRenderer.invoke('delete-expense', id, username),
  
  updateReceipt: (id, data) => ipcRenderer.invoke('update-receipt', id, data),
  updatePayment: (id, data) => ipcRenderer.invoke('update-payment', id, data),
  deleteReceipt: (id) => ipcRenderer.invoke('delete-receipt', id),
  deletePayment: (id) => ipcRenderer.invoke('delete-payment', id),
  importSuppliersExcel: () => ipcRenderer.invoke('import-suppliers-excel'),
  // Database Management
  backupDatabase: () => ipcRenderer.invoke('backup-database'),
  restoreDatabase: () => ipcRenderer.invoke('restore-database'),
  updateSupplier: (id, data) => ipcRenderer.invoke('update-supplier', id, data),
  deleteSupplier: (id) => ipcRenderer.invoke('delete-supplier', id),
  getExpenses: (caisseFilter) => ipcRenderer.invoke('get-expenses', caisseFilter),
  updateAdvance: (id, data) => ipcRenderer.invoke('update-advance', { id, data }),
  deleteAdvance: (id) => ipcRenderer.invoke('delete-advance', id)


});
```

---

## `backend\splash.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Loading POSManager...</title>
  <style>
    /* جعل الخلفية الأساسية شفافة لكي تظهر الشاشة بدون إطار مربع */
    body {
      margin: 0;
      padding: 0;
      background: transparent;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    /* الحاوية الرئيسية للشاشة */
    .splash-container {
      width: 650px;
      height: 400px;
      background-color: #020617; /* Slate 950 */
      border-radius: 20px;
      display: flex;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      border: 1px solid #1e293b;
    }

    /* القسم الأيسر (النصي) */
    .left-pane {
      flex: 1;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #f8fafc;
    }

    /* القسم الأيمن (الرسومي التجريدي) */
    .right-pane {
      flex: 1;
      position: relative;
      background: linear-gradient(-45deg, #0ea5e9, #6366f1, #3b82f6, #020617);
      background-size: 400% 400%;
      animation: gradientBG 8s ease infinite;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* أشكال هندسية فوق الخلفية المتحركة */
    .shape {
      position: absolute;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
      border-radius: 50%;
    }
    .shape-1 { width: 150px; height: 150px; top: -20px; right: -20px; border: 1px solid rgba(255,255,255,0.2); }
    .shape-2 { width: 200px; height: 200px; bottom: -50px; left: -50px; }
    .shape-3 { width: 80px; height: 80px; top: 40%; right: 40%; background: rgba(255, 255, 255, 0.05); }

    .brand h1 {
      font-size: 32px;
      margin: 0;
      font-weight: 900;
      letter-spacing: 2px;
    }
    .brand h1 span { color: #3b82f6; }
    .brand p {
      color: #94a3b8;
      font-size: 11px;
      margin-top: 5px;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-weight: bold;
    }

    .loading-section { margin-top: auto; margin-bottom: 4px; }
    
    .loading-text {
      font-size: 14px;
      color: #cbd5e1;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* دائرة التحميل الدوارة */
    .spinner {
      width: 16px;
      height: 16px;
      border: 3px solid rgba(59, 130, 246, 0.3);
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* شريط التحميل */
    .progress-bar {
      width: 100%;
      height: 4px;
      background: #1e293b;
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      width: 0%;
      background: #3b82f6;
      animation: fillProgress 3s ease-in-out forwards;
    }
    @keyframes fillProgress {
      0% { width: 0%; }
      50% { width: 70%; }
      100% { width: 100%; }
    }

    .footer {
      font-size: 10px;
      color: #64748b;
      margin-top: 30px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .footer span { color: #cbd5e1; font-weight: bold; }
  </style>
</head>
<body>
  <div class="splash-container">
    <div class="left-pane">
      <div class="brand">
        <h1>GHERBI<span>.AI</span></h1>
        <p>Code • Multimedia • Algo Trading • AI</p>
      </div>

      <div>
        <div class="loading-section">
          <div class="loading-text">
            <div class="spinner"></div>
            Loading Database & Modules...
          </div>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>

        <div class="footer">
          Developed By <br><span>Gherbi Mohamed Cherif</span>
        </div>
      </div>
    </div>
    <div class="right-pane">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  </div>
</body>
</html>
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
import PrintPreview from './components/pages/PrintPreview';
import Attendance from './components/pages/Attendance';
import POS from './components/pages/POS'; // 🔴 شاشة البيع الجديدة

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const user = useAuthStore(state => state.user);
  const hasAccess = user?.role === 'admin' || user?.role === 'superadmin';
  if (!hasAccess) return <Navigate to="/pos" replace />; // 🔴 توجيه الكاشير للـ POS
  return children;
};

const SuperAdminRoute = ({ children }) => {
  const user = useAuthStore(state => state.user);
  const hasSuperAccess = user?.role === 'superadmin' || user?.username === 'admin' || user?.role === 'admin';
  if (!hasSuperAccess) return <Navigate to="/" replace />;
  return children;
};

const IndexRedirect = () => {
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  return isAdmin ? <Dashboard /> : <Navigate to="/pos" replace />; // 🔴 توجيه افتراضي للكاشير
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<IndexRedirect />} />
          
          {/* 🛒 مسارات مسموحة للجميع (الكاشير والمدير) */}
          <Route path="pos" element={<POS />} />
          <Route path="end-of-day" element={<EndOfDay />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="/preview" element={<PrintPreview />} />
          
          {/* 🛡️ مسارات الإدارة (المسير وصاحب المحل) */}
          <Route path="suppliers" element={<AdminRoute><Suppliers /></AdminRoute>} />
          <Route path="hr" element={<AdminRoute><HR /></AdminRoute>} />
          <Route path="payroll" element={<AdminRoute><Payroll /></AdminRoute>} />
          <Route path="agenda" element={<AdminRoute><Agenda /></AdminRoute>} />

          {/* 👑 مسارات السوبر أدمين فقط */}
          <Route path="settings" element={<SuperAdminRoute><Settings /></SuperAdminRoute>} /> 
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

// 🔴 1. استيراد دالة تفعيل جسر الشبكة (Network API)
import { setupNetworkApi } from './networkApi' 



setupNetworkApi();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## `frontend\src\networkApi.js`

```javascript
// frontend/src/networkApi.js
import i18n from './i18n'; // 🔴 استيراد ملف الترجمة لمعرفة اللغة الحالية

export const setupNetworkApi = () => {
  if (window.api) return;

  console.log('🌐 Running in Browser Mode (Cashier Client). Setting up Network API...');

  const SERVER_URL = window.location.origin;

  const fetchFromServer = async (methodName, args = []) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/${methodName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ args })
      });
      const data = await response.json();
      if (data.success) {
        return data.data; 
      } else {
        return { success: false, error: data.error, message: data.error };
      }
    } catch (error) {
      console.error(`Network Error in ${methodName}:`, error);
      // 🔴 استخدام الترجمة الذكية لخطأ انقطاع الاتصال
      return { success: false, error: i18n.t('common.networkError', 'Network connection error'), message: error.message };
    }
  };

  window.api = {
    login: (credentials) => fetchFromServer('verifyLogin', [credentials.username, credentials.password]),
    
    getSuppliers: () => fetchFromServer('getSuppliers'),
    addSupplier: (data) => fetchFromServer('addSupplier', [data]),
    updateSupplier: (id, data) => fetchFromServer('updateSupplier', [id, data]),
    deleteSupplier: (id) => fetchFromServer('deleteSupplier', [id]),
    getSupplierDetails: (id) => fetchFromServer('getSupplierDetails', [id]),
    
    addReceipt: async (data) => {
      const res = await fetchFromServer('addReceipt', [data]);
      return res.error ? res : { success: true, id: res };
    },
    addPayment: async (data) => {
      const res = await fetchFromServer('addPayment', [data]);
      return res.error ? res : { success: true, id: res };
    },
    updateReceipt: (id, data) => fetchFromServer('updateReceipt', [id, data]),
    updatePayment: (id, data) => fetchFromServer('updatePayment', [id, data]),
    deleteReceipt: (id) => fetchFromServer('deleteReceipt', [id]),
    deletePayment: (id) => fetchFromServer('deletePayment', [id]),
    
    getEmployees: () => fetchFromServer('getEmployees'),
    addEmployee: (data) => fetchFromServer('addEmployee', [data]),
    updateEmployee: (id, data) => fetchFromServer('updateEmployee', [id, data]),
    deleteEmployee: (id) => fetchFromServer('deleteEmployee', [id]),
    handlePinEntry: (pin) => fetchFromServer('handlePinEntry', [pin]),
    getTodayAttendance: (date) => fetchFromServer('getTodayAttendance', [date]),
    
    getExpenses: (caisseFilter) => fetchFromServer('getExpenses', [caisseFilter]),
    addExpense: (data) => fetchFromServer('addExpense', [data]),
    updateExpense: ({id, expense}) => fetchFromServer('updateExpense', [id, expense]),
    deleteExpense: (id, username) => fetchFromServer('deleteExpense', [id, username]),
    
    getAdvances: (empId) => fetchFromServer('getAdvances', [empId]),
    addAdvance: (data) => fetchFromServer('addAdvance', [data]),
    getSalaries: () => fetchFromServer('getSalaries'),
    calculatePayroll: (params) => fetchFromServer('calculateEmployeePayroll', [params.employeeId, params.startDate, params.endDate, params.hourlyRate]),
    paySalary: (data) => fetchFromServer('paySalary', [data]),
    
    getAgendaTasks: () => fetchFromServer('getAgendaTasks'),
    addAgendaTask: (data) => fetchFromServer('addAgendaTask', [data]),
    toggleAgendaTaskStatus: (id, status) => fetchFromServer('toggleAgendaTaskStatus', [id, status]),
    deleteAgendaTask: (id) => fetchFromServer('deleteAgendaTask', [id]),
    rescheduleAgendaTask: (id, date) => fetchFromServer('rescheduleAgendaTask', [id, date]),
    getDueThisWeek: () => fetchFromServer('getDueThisWeek'),
    getDailySummary: (date) => fetchFromServer('getDailySummary', [date]),
    
    openShift: (data) => fetchFromServer('openShift', [data]),
    getActiveShift: (cashierName) => fetchFromServer('getActiveShift', [cashierName]),
    closeShift: (data) => fetchFromServer('closeShift', [data]),
    getShiftSummary: (cashierName, startTime) => fetchFromServer('getShiftSummary', [cashierName, startTime]),
    
    getUsers: () => fetchFromServer('getUsers'),
    addUser: (data) => fetchFromServer('addUser', [data]),
    deleteUser: (id) => fetchFromServer('deleteUser', [id]),
    getAuditLogs: () => fetchFromServer('getAuditLogs'),
    
    // 🔴 استخدام الترجمة بدلاً من النصوص العربية الثابتة
    backupDatabase: () => Promise.resolve({ success: false, error: i18n.t('common.serverOnlyFeature', 'This feature only works on the main server.') }),
    restoreDatabase: () => Promise.resolve({ success: false, error: i18n.t('common.serverOnlyFeature', 'This feature only works on the main server.') }),
    importSuppliersExcel: () => Promise.resolve({ success: false, error: i18n.t('common.serverOnlyFeature', 'This feature only works on the main server.') }),
    
    showNotification: (data) => {
      if (Notification.permission === 'granted') new Notification(data.title, { body: data.body });
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => { if(p === 'granted') new Notification(data.title, { body: data.body }) });
      }
    }
  };
};
```

---

## `frontend\src\components\EndOfDay.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Lock, Calculator, Banknote, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Modal from './ui/Modal'; 

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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // 🔴 نظام الإشعارات الذكي بدلاً من Alert
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchShiftData = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getActiveShift) {
        const shift = await window.api.getActiveShift(cashierName);
        if (shift) {
          setActiveShift(shift);
          
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
          showToast('error', res.message || t('common.error')); // 🔴 استبدال الـ alert
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalOut = summary.totalOut || 0;
  const currentOpeningBalance = activeShift ? activeShift.opening_balance : 0;
  
  const todaySales = (actualAmount === '' || actualAmount === 0) 
    ? 0 
    : (Number(actualAmount) + totalOut) - Number(currentOpeningBalance);

  const handleCloseShiftClick = (e) => {
    e.preventDefault();
    if (actualAmount === '') return;
    setIsConfirmModalOpen(true);
  };

  const executeCloseShift = async () => {
    try {
      if (window.api && window.api.closeShift) {
        const res = await window.api.closeShift({
          shiftId: activeShift.id,
          actualCash: Number(actualAmount),
          difference: todaySales,
          note: notes
        });
        
        if (res.success) {
          setActiveShift(null);
          setActualAmount('');
          setNotes('');
        }
      }
    } catch (err) {
      console.error(err);
    }
    setIsConfirmModalOpen(false);
  };

  if (isLoading) {
    return <div className="p-6 text-center text-slate-500">{t('hr.table.loading')}</div>;
  }

  // وضع الإشعار في مستوى عام ليظهر في كلتا الحالتين
  const renderToast = () => toast && (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
      toast.type === 'success' ? 'bg-emerald-600 text-white' :
      toast.type === 'warning' ? 'bg-amber-600 text-white' :
      'bg-red-600 text-white'
    }`}>
      {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span className="font-bold">{toast.message}</span>
    </div>
  );

  if (!activeShift) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex items-center justify-center relative">
        {renderToast()}
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Play size={32} className="text-blue-500 ms-1" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('eod.open_shift_title')}</h1>
            <p className="text-slate-500 text-sm">{t('eod.open_shift_desc')} <span className="font-bold text-white">{cashierName}</span></p>
          </div>

          <form onSubmit={handleOpenShift} className="space-y-6 text-start" dir={isRTL ? "rtl" : "ltr"}>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.opening_balance')} ({t('currency')})</label>
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

  const shiftStartTime = new Date(activeShift.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative">
      {renderToast()}
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
        <form onSubmit={handleCloseShiftClick} className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-start" dir={isRTL ? "rtl" : "ltr"}>
          
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
                <AlertCircle size={12} /> {t('eod.actualCashHint')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.notes')}</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder={t('eod.notesPlaceholder')}
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

      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title={t('eod.title')}>
        <div className="p-4 text-start">
          <p className="text-white mb-6 text-lg">{t('eod.confirmClose')}</p>
          
          <div className="bg-slate-950 p-4 rounded-lg mb-6 text-center border border-slate-800">
             <p className="text-sm text-slate-400 mb-1">{t('eod.today_sales')}</p>
             <p className={`text-2xl font-bold ${todaySales > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{todaySales} {t('currency')}</p>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button onClick={() => setIsConfirmModalOpen(false)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              {t('common.cancel')}
            </button>
            <button onClick={executeCloseShift} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
              <Lock size={18} /> {t('eod.save_btn')}
            </button>
          </div>
        </div>
      </Modal>

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
import { Shield, UserPlus, Trash2, Users, Key, AlertCircle, Save, Upload, CheckCircle2 } from 'lucide-react';
import useAuthStore from '../store/authStore';
import ConfirmAlert from './ui/ConfirmAlert'; // 🔴 إضافة النافذة المخصصة

export default function UsersManagement() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const currentUser = useAuthStore(state => state.user);
  
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cashier');
  
  const [userToDelete, setUserToDelete] = useState(null); 
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false); 
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔴 نظام الإشعارات الذكي
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

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

  useEffect(() => { fetchUsers(); }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) { setError(t('settings.errorFillFields')); return; }
    try {
      if (window.api && window.api.addUser) {
        const res = await window.api.addUser({ username, password, role });
        if (res.success) {
          setUsername(''); setPassword(''); setRole('cashier');
          fetchUsers();
          showToast('success', t('common.success'));
        } else {
          setError(res.message || t('settings.addError'));
        }
      }
    } catch (err) { setError(t('settings.addError')); }
  };

  const handleDeleteUserClick = (id, name) => {
    if (name === 'admin' || name === currentUser?.username) {
      showToast('warning', t('settings.deleteAlert')); // 🔴 Toast بدل alert
      return;
    }
    setUserToDelete({ id, name }); 
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      if (window.api && window.api.deleteUser) {
        const res = await window.api.deleteUser(userToDelete.id);
        if (res.success) {
          if (res.isSoftDeleted) {
              showToast('warning', t('hr.employees.softDeleted', 'تم تعطيل الحساب لحماية سجلاته المالية.')); 
          } else {
              showToast('success', t('common.success'));
          }
          fetchUsers();
        } else { 
            showToast('error', res.error || t('settings.deleteError')); 
        }
      }
    } catch (err) { console.error(err); showToast('error', t('settings.deleteError')); }
    setUserToDelete(null); 
  };

  if (currentUser?.role !== 'admin' && currentUser?.role !== 'superadmin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-red-500 text-xl font-bold gap-3">
        <AlertCircle size={32} /> {t('settings.accessDenied')}
      </div>
    );
  }

  const handleBackup = async () => {
    try {
      const result = await window.api.backupDatabase();
      if (result.success) { 
          showToast('success', t('database.messages.backupSuccess')); 
      } 
      else if (!result.canceled) { 
          showToast('error', t('database.messages.error') + "\n" + (result.error || '')); 
      }
    } catch (error) { 
        showToast('error', t('database.messages.error')); 
    }
  };

  const confirmRestore = async () => {
      setIsRestoreModalOpen(false);
      try {
        const result = await window.api.restoreDatabase();
        if (result.success) { 
            showToast('success', t('database.messages.restoreSuccess')); 
        } 
        else if (!result.canceled) { 
            showToast('error', t('database.messages.error') + "\n" + (result.error || '')); 
        }
      } catch (error) { 
          showToast('error', t('database.messages.error')); 
      }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative">
      
      {/* 🔴 مكون الـ Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Shield className="text-blue-500" /> {t('settings.title')}
        </h1>
        <p className="text-slate-500">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserPlus size={20} className="text-emerald-500" /> {t('settings.newUser')}
            </h2>
            {error && <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm text-start">{error}</div>}

            <form onSubmit={handleAddUser} className="space-y-4 text-start">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('settings.username')}</label>
                <div className="relative">
                  <Users size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-blue-500 text-start" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('settings.password')}</label>
                <div className="relative">
                  <Key size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-blue-500 text-start" dir="ltr" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('settings.role')}</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 text-start" dir={isRTL ? "rtl" : "ltr"}>
                  <option value="cashier">{t('hr.roles.cashier')}</option>
                  <option value="scale">{t('hr.roles.scale')}</option>
                  <option value="stock">{t('hr.roles.stock')}</option>
                  <option value="admin">{t('hr.roles.admin')}</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                {t('settings.addAccountBtn')}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500">{t('settings.loading')}</div>
            ) : (
              <table className="w-full text-sm text-start" dir={i18n.dir()}>
                <thead className="text-xs text-slate-400 bg-slate-950/50 uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-start">{t('settings.table.username')}</th>
                    <th className="px-6 py-4 text-start">{t('settings.table.role')}</th>
                    <th className="px-6 py-4 text-center">{t('settings.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-white text-start flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${u.role === 'admin' || u.role === 'superadmin' ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-900/50 text-emerald-400'}`}>
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <span dir="ltr">{u.username}</span>
                      </td>
                      <td className="px-6 py-4 text-start">
                         <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-700">
                            {t(`hr.roles.${u.role}`, u.role)}
                          </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleDeleteUserClick(u.id, u.username)}
                          disabled={u.username === 'admin' || u.username === currentUser?.username}
                          className="text-slate-500 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                          title={t('settings.deleteTooltip')}
                        >
                          <Trash2 size={18} className="mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">{t('settings.noUsers')}</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6 lg:col-span-3">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">
            {t('database.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-5 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-4"><Save className="text-blue-500" size={28} /></div>
              <h3 className="text-lg font-bold text-white mb-2">{t('database.backup')}</h3>
              <p className="text-sm text-slate-400 mb-6 flex-1">{t('database.backupDesc')}</p>
              <button onClick={handleBackup} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors font-medium flex justify-center items-center gap-2">
                <Save size={18} />{t('database.backup')}
              </button>
            </div>
            <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-5 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mb-4"><Upload className="text-red-500" size={28} /></div>
              <h3 className="text-lg font-bold text-white mb-2">{t('database.restore')}</h3>
              <p className="text-sm text-slate-400 mb-6 flex-1">{t('database.restoreDesc')}</p>
              <button onClick={() => setIsRestoreModalOpen(true)} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg transition-colors font-medium flex justify-center items-center gap-2">
                <Upload size={18} />{t('database.restore')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔴 استخدام النافذة السوداء المخصصة بدلاً من Modal العادية */}
      <ConfirmAlert 
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDelete}
        title={t('suppliers.actions.delete')}
        message={t('settings.deleteConfirm', { name: userToDelete?.name })}
        confirmText={t('suppliers.actions.confirmDeleteBtn')}
      />

      {/* 🔴 استخدام النافذة السوداء المخصصة لاسترجاع النسخة الاحتياطية */}
      <ConfirmAlert 
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
        onConfirm={confirmRestore}
        title={t('database.restore')}
        message={t('database.messages.restoreConfirm')}
        confirmText={t('common.confirm')}
        confirmColor="bg-red-600 hover:bg-red-700"
      />

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
// 🔴 التصحيح هنا: رجعنا خطوتين فقط (../../)
import useAuthStore from '../../store/authStore'; 

export default function MainLayout() {
  const { i18n } = useTranslation();
  const user = useAuthStore(state => state.user);
  const isCashier = user?.role === 'cashier' || user?.role === 'scale' || user?.role === 'stock';

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans print:h-auto print:bg-white print:text-black" dir={i18n.dir()}>
      {!isCashier && (
        <div className="print:hidden">
          <Sidebar />
        </div>
      )}
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible">
        <div className="print:hidden">
          <Topbar />
        </div>
        <main className="flex-1 overflow-y-auto print:overflow-visible relative">
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
import { Bell, Search, UserCircle, Globe, LogOut, ShoppingCart, Receipt, Lock, Clock } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Topbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isCashier = user?.role === 'cashier' || user?.role === 'scale' || user?.role === 'stock';

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // تصميم الزر الخاص بالكاشير
  const CashierNavLink = ({ to, icon, label }) => (
    <NavLink to={to} className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
      {icon} <span className="hidden md:inline">{label}</span>
    </NavLink>
  );

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* القسم الأيسر: البحث للمدير، وروابط سريعة للكاشير */}
      <div className="flex items-center gap-2">
        {!isCashier ? (
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-64">
            <Search size={18} className="text-slate-500 mx-2" />
            <input type="text" placeholder={t('common.search')} className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder-slate-600" />
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
            <CashierNavLink to="/pos" icon={<ShoppingCart size={18}/>} label={t('pos.title', 'نقطة البيع')} />
            <CashierNavLink to="/expenses" icon={<Receipt size={18}/>} label={t('sidebar.expenses')} />
            <CashierNavLink to="/end-of-day" icon={<Lock size={18}/>} label={t('eod.title', 'الصندوق')} />
            <CashierNavLink to="/attendance" icon={<Clock size={18}/>} label={t('hr.tabs.attendance')} />
          </div>
        )}
      </div>

      {/* القسم الأيمن: البيانات الشخصية واللغة */}
      <div className="flex items-center gap-4 text-slate-400">
        <button onClick={toggleLanguage} className="relative hover:text-white transition-colors bg-slate-900 p-2 rounded-lg border border-slate-800">
          <Globe size={18} />
        </button>

        {!isCashier && (
          <button className="relative hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-slate-950"></span>
          </button>
        )}
        
        <div className="h-6 w-px bg-slate-800"></div>
        
        <div className="flex items-center gap-2">
          <UserCircle size={24} className={isCashier ? "text-blue-400" : "text-emerald-400"} />
          <div className="text-sm">
            <p className="font-medium text-white leading-none">
               {isCashier ? user?.username : t('common.superAdmin')}
            </p>
          </div>
        </div>

        <button onClick={handleLogout} className="ml-2 p-2 hover:bg-red-950/50 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-900/50" title="Logout">
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
import { Plus, Calendar as CalendarIcon, CheckCircle2, Clock, Truck, Banknote, Wrench, Trash2, CalendarClock, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmAlert from '../ui/ConfirmAlert'; // 🔴 استيراد نافذة التنبيه المخصصة

export default function Agenda() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [filter, setFilter] = useState('all'); 
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [taskToDelete, setTaskToDelete] = useState(null);

  // 🔴 نظام الإشعارات الذكي (Toast)
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  
  const todayString = new Date().toISOString().split('T')[0];
  const currentMonthName = currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  
  const isCurrentMonth = new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
  const currentDay = new Date().getDate();

  const prevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (window.api && window.api.getAgendaTasks) {
          const data = await window.api.getAgendaTasks();
          const normalizedData = data.map(task => ({
            ...task,
            date: task.task_date || task.date,
            time: task.task_time || task.time
          }));
          setTasks(normalizedData);
        }
      } catch (error) { console.error("Failed to fetch agenda tasks:", error); }
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
      title: e.target[0].value, type: e.target[1].value, date: e.target[2].value, time: formattedTime,
      task_date: e.target[2].value, task_time: formattedTime, status: 'pending', amount: Number(e.target[4]?.value || 0)
    };

    try {
      if (window.api && window.api.addAgendaTask) {
        const addedTask = await window.api.addAgendaTask(newTask);
        const normalizedTask = { ...addedTask, date: addedTask.task_date || newTask.date, time: addedTask.task_time || newTask.time };
        setTasks(prev => [...prev, normalizedTask].sort((a, b) => new Date(`${a.date} ${a.time || '00:00'}`) - new Date(`${b.date} ${b.time || '00:00'}`)));
        setIsModalOpen(false);
        showToast('success', t('common.success')); // 🔴 إشعار بدلاً من التنبيه الأصلي
      }
    } catch (error) { 
      console.error("Error adding task:", error); 
      showToast('error', t('common.error'));
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      if (window.api && window.api.toggleAgendaTaskStatus) {
        await window.api.toggleAgendaTaskStatus(id, newStatus);
        setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
      }
    } catch (error) { console.error("Error toggling task status:", error); }
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      if (window.api && window.api.deleteAgendaTask) {
        await window.api.deleteAgendaTask(taskToDelete.id);
        setTasks(tasks.filter(task => task.id !== taskToDelete.id));
        showToast('success', t('common.success'));
      }
    } catch (error) { console.error(error); showToast('error', t('common.error')); }
    setTaskToDelete(null);
  };

  const handleReschedule = async (id, newDate) => {
    if (!newDate) return;
    try {
      if (window.api && window.api.rescheduleAgendaTask) {
        await window.api.rescheduleAgendaTask(id, newDate);
        setTasks(tasks.map(task => task.id === id ? { ...task, date: newDate, task_date: newDate } : task));
        showToast('success', t('common.success'));
      }
    } catch (error) { console.error("Error rescheduling task:", error); }
  };

  const filteredTasks = tasks.filter(task => filter === 'all' ? true : task.status === filter);
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
    const displayTime = task.time && task.time !== 'undefined' ? task.time : t('agenda.allDay', 'طوال اليوم');
    const cardStyle = isCompleted ? 'bg-slate-900/50 border-slate-800/50 opacity-60' : isOverdue ? 'bg-red-950/20 border-red-900/50 hover:border-red-800' : 'bg-slate-900 border-slate-800 hover:border-slate-700';

    return (
      <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${cardStyle}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => toggleTaskStatus(task.id, task.status)} className={`transition-colors ${isCompleted ? 'text-emerald-500' : isOverdue ? 'text-red-400 hover:text-red-300' : 'text-slate-600 hover:text-emerald-400'}`}>
            {isOverdue && !isCompleted ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
          </button>
          
          <div>
            <h4 className={`font-medium ${isCompleted ? 'text-slate-500 line-through' : isOverdue ? 'text-red-200' : 'text-white'}`}>{task.title}</h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}><Clock size={14} /> {displayTime} {task.date !== todayString && `| ${task.date}`}</span>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${typeConfig.color}`}>{typeConfig.icon}{t(`agenda.types.${task.type}`, task.type)}</span>
              {task.amount > 0 && <span className="font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">{task.amount.toLocaleString()} {t('currency')}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isCompleted && (
            <div className="relative" title={t('agenda.rescheduleTask', 'تأجيل المهمة')}>
              <input type="date" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" onChange={(e) => handleReschedule(task.id, e.target.value)} />
              <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"><CalendarClock size={18} /></button>
            </div>
          )}
          <button onClick={() => setTaskToDelete(task)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors" title={t('suppliers.actions.delete')}><Trash2 size={18} /></button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative">
      
      {/* 🔴 مكون الـ Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8 text-start">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('agenda.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('agenda.subtitle')}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
          <Plus size={18} /><span>{t('agenda.addTask')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 text-white font-medium border-b border-slate-800 pb-3 capitalize">
              <button onClick={prevMonth} className="p-1 hover:bg-slate-800 rounded transition-colors">{isRTL ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}</button>
              <div className="flex items-center gap-2"><CalendarIcon size={18} className="text-blue-400" /> {currentMonthName}</div>
              <button onClick={nextMonth} className="p-1 hover:bg-slate-800 rounded transition-colors">{isRTL ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}</button>
            </div>
            
            <div dir="ltr">
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500 mb-2">
                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day}>{day}</div>)}
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {[...Array(firstDayOfMonth)].map((_, i) => (
                   <div key={`empty-prev-${i}`} className="p-1.5 text-slate-700">{prevMonthDays - firstDayOfMonth + i + 1}</div>
                ))}
                {[...Array(daysInMonth)].map((_, i) => (
                  <div key={i} className={`p-1.5 rounded-md cursor-pointer transition-colors ${isCurrentMonth && (i + 1 === currentDay) ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'}`}>
                    {i + 1}
                  </div>
                ))}
                {[...Array(42 - (firstDayOfMonth + daysInMonth))].map((_, i) => (
                   <div key={`empty-next-${i}`} className="p-1.5 text-slate-700">{i + 1}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 shadow-lg text-start">
            {['all', 'pending', 'completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`text-start px-4 py-2 rounded-lg text-sm transition-colors ${filter === f ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800/50'}`}>
                {t(`agenda.filters.${f}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {overdueTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-red-400 mb-4 flex items-center gap-2 border-b border-red-900/50 pb-2"><AlertCircle size={18} /> {t('agenda.sections.overdue', 'مهام متأخرة')}</h3>
              <div className="space-y-3">{overdueTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={true} />)}</div>
            </div>
          )}
          {todayTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>{t('agenda.sections.today')}</h3>
              <div className="space-y-3">{todayTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={false} />)}</div>
            </div>
          )}
          {upcomingTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-slate-400 mb-4 border-b border-slate-800 pb-2 mt-8">{t('agenda.sections.upcoming')}</h3>
              <div className="space-y-3">{upcomingTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={false} />)}</div>
            </div>
          )}
          {filteredTasks.length === 0 && <div className="text-center p-12 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">{t('common.noResults')}</div>}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('agenda.addTask')}>
        <form className="space-y-4 text-start" onSubmit={handleAddTask} dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.taskTitleLabel')}</label>
            <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.taskTypeLabel')}</label>
            <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
              <option value="delivery">{t('agenda.types.delivery')}</option>
              <option value="payment">{t('agenda.types.payment')}</option>
              <option value="maintenance">{t('agenda.types.maintenance')}</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.dateLabel')}</label>
              <input type="date" defaultValue={todayString} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.timeLabel')} ({t('common.optional')})</label>
              <input type="time" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" />
            </div>
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount', 'المبلغ')} ({t('common.optional')})</label>
             <input type="number" min="0" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" />
          </div>
          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('agenda.modal.cancelBtn', 'إلغاء')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{t('agenda.modal.saveBtn', 'حفظ المهمة')}</button>
          </div>
        </form>
      </Modal>

      {/* 🔴 استخدام النافذة السوداء المخصصة بدلاً من النافذة العادية */}
      <ConfirmAlert 
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={confirmDeleteTask}
        title={t('suppliers.actions.delete', 'حذف')}
        message={t('agenda.deleteConfirm', 'هل أنت متأكد من حذف هذه المهمة من الأجندة؟')}
        cancelText={t('common.cancel', 'إلغاء')}
        confirmText={t('suppliers.actions.confirmDeleteBtn', 'تأكيد الحذف')}
      />

    </div>
  );
}
```

---

## `frontend\src\components\pages\Attendance.jsx`

```javascript
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Clock, LogIn, LogOut, AlertCircle, CheckCircle2 } from "lucide-react";

const Attendance = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);

  // 🔴 إصلاح مشكلة التاريخ المشوه (2026-07-30 بدلاً من 302026/7/)
  const today = new Date();
  const dbDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
  const displayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // 🔴 جلب البيانات مباشرة من السيرفر لضمان عملها 100%
  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getTodayAttendance) {
        const data = await window.api.getTodayAttendance(dbDate);
        setRecords(data || []);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    // تحديث الجدول تلقائياً كل دقيقة
    const interval = setInterval(fetchRecords, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    try {
      if (window.api && window.api.handlePinEntry) {
        const result = await window.api.handlePinEntry(pinInput.trim());
        
        if (result && result.success) {
          const actionText = result.action === 'check_in' 
            ? t('hr.messages.checkIn', 'تم تسجيل الدخول') 
            : t('hr.messages.checkOut', 'تم تسجيل الخروج');
            
          setFeedback({ 
            type: 'success', 
            message: `${actionText}: ${result.employeeName} (${result.time})` 
          });
          
          fetchRecords(); // 🔴 تحديث الجدول فوراً بعد التسجيل
        } else {
          setFeedback({ type: 'error', message: result?.message || t('common.error') });
        }
      }
    } catch (err) {
      setFeedback({ type: 'error', message: t('common.error') });
    }

    setPinInput("");
    if(inputRef.current) inputRef.current.focus();
    
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full text-slate-100 min-h-[calc(100vh-100px)]" dir={i18n.dir()}>
      
      {/* القسم الجانبي: إدخال الرمز (Terminal) */}
      <div className="w-full lg:w-1/3 bg-slate-900/80 rounded-xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg h-fit">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        
        <div className="bg-slate-800/50 p-4 rounded-full mb-6">
          <Clock size={48} className="text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-center">{t('hr.scanner.title', 'تسجيل الدخول / الخروج')}</h2>
        <p className="text-slate-400 mb-8 text-center text-sm">
          {t('hr.scanner.placeholder', 'أدخل رمز PIN الخاص بك لتسجيل حضورك أو انصرافك')}
        </p>

        <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-4">
          <input
            ref={inputRef}
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="****"
            className="w-full text-center text-4xl py-6 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 tracking-[1em] shadow-inner"
            autoFocus
          />
          <button 
            type="submit" 
            className="w-full text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md"
          >
            {t('hr.scanner.submit', 'تأكيد الرمز')}
          </button>
        </form>

        {feedback && (
          <div className={`mt-6 w-full p-4 rounded-lg flex items-center justify-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-4
            ${feedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* القسم الرئيسي: سجل اليوم */}
      <div className="w-full lg:w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-lg h-fit">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Clock size={18} className="text-blue-400"/> 
            {t('hr.attendanceLog', 'سجل حركة الموظفين لليوم')}
          </h3>
          <span className="text-sm font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 tracking-widest">
            {displayDate}
          </span>
        </div>

        <div className="flex-1 overflow-x-auto p-0">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                <th className="py-4 px-6 font-medium text-start">{t('hr.table.nameWithRole', 'الموظف')}</th>
                <th className="py-4 px-6 font-medium text-center">{t('hr.table.timeIn', 'وقت الدخول')}</th>
                <th className="py-4 px-6 font-medium text-center">{t('hr.table.timeOut', 'وقت الخروج')}</th>
                <th className="py-4 px-6 font-medium text-center">{t('hr.table.status', 'الحالة')}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-slate-500">
                    {t('hr.table.emptyRecord', 'لا توجد حركات تسجيل دخول حتى الآن اليوم.')}
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 text-start">
                      <div className="font-medium text-white">{record.employee_name || record.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{t(`hr.roles.${record.role}`, record.role)}</div>
                    </td>
                    
                    <td className="py-4 px-6 text-center text-emerald-400 font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <LogIn size={14} /> {record.time_in || '--:--'}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 text-center text-orange-400 font-medium">
                      {record.time_out ? (
                        <div className="flex items-center justify-center gap-2">
                          <LogOut size={14} /> {record.time_out}
                        </div>
                      ) : (
                        <span className="text-slate-600">--:--</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border inline-block
                        ${!record.time_out 
                          ? 'bg-blue-950 text-blue-400 border-blue-900' 
                          : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                        {!record.time_out ? t('hr.status.present', 'متواجد حالياً') : t('hr.status.departed', 'أنهى الدوام')}
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
  );
};

export default Attendance;
```

---

## `frontend\src\components\pages\Dashboard.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, AlertCircle, Users, Wallet, Plus, Settings, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import ExpensesPieChart from '../ExpensesPieChart';
import useAuditStore from '../../store/auditStore';
import Modal from '../ui/Modal'; 

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
  
  const { logs, fetchLogs } = useAuditStore();

  // 🔴 نظام الإشعارات الذكي بدلاً من Alert
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const renderAuditDetails = (log) => {
    try {
      const parsedDetails = JSON.parse(log.details);
      return t(`audit.details.${log.action}`, parsedDetails);
    } catch (e) {
      return log.details;
    }
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [storeName, setStoreName] = useState(localStorage.getItem('storeName') || 'GHERBI.AI');

  const handleSaveStoreName = (e) => {
    e.preventDefault();
    localStorage.setItem('storeName', storeName);
    setIsSettingsOpen(false);
    showToast('success', t('settings.modal.saveSuccess', 'تم حفظ التغييرات بنجاح!')); // 🔴 استبدال الـ alert
  };

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
              const notifTitle = t('dashboard.alerts.systemTitle');
              const notifBody = t('dashboard.alerts.urgentBody', { count: urgent.length });
              window.api.showNotification({ title: String(notifTitle), body: String(notifBody) });
              sessionStorage.setItem('notified_urgent_tasks', 'true');
            }
          }
        }
      } catch (error) { console.error("Error fetching urgent tasks:", error); }
    };
    fetchAndNotifyUrgentData();
  }, [t]);

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

          setStats({ totalDebts, totalExpenses, presentEmployees, totalEmployees, topCreditors, dueThisWeek: dueAmount || 0 });
        }
      } catch (error) { console.error("Error fetching dashboard data:", error); }
    };
    fetchDashboardData();
  }, [t]);

  const customTooltipStyle = { backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative">
      
      {/* 🔴 مكون الـ Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors">
            <Settings size={18} /><span>{t('sidebar.settings')}</span>
          </button>
          <button onClick={() => navigate('/expenses')} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors">
            <Plus size={18} /><span>{t('dashboard.quickActionExpense')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.totalDebts')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.totalDebts.toLocaleString()} {t('currency')}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><TrendingUp size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-red-900/30 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.dueThisWeek')}</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">{stats.dueThisWeek.toLocaleString()} {t('currency')}</h3>
            </div>
            <div className="p-2 bg-red-950/50 rounded-lg text-red-400"><AlertCircle size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.activeEmployees')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.presentEmployees} / {stats.totalEmployees || 0}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><Users size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.expenses')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.totalExpenses.toLocaleString()} {t('currency')}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><Wallet size={20} /></div>
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
                  <RechartsTooltip cursor={{fill: '#1e293b'}} contentStyle={customTooltipStyle} formatter={(value) => [`${value.toLocaleString()} DA`, t('suppliers.table.totalDebt')]} />
                  <Bar dataKey="debt" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">{t('common.noResults')}</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-2">{t('dashboard.charts.expensesDist')}</h3>
          <div className="flex-1 w-full h-full relative"><ExpensesPieChart /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-4">{t('dashboard.lists.urgentAlerts')}</h3>
          <div className="space-y-3">
            {urgentTasks.length === 0 ? (
              <p className="text-slate-500 text-sm">{t('dashboard.alerts.noTasks')}</p>
            ) : (
              urgentTasks.slice(0, 5).map(task => (
                <div key={task.id} className="p-3 bg-red-950/20 border border-red-900/50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-red-200 text-sm">{task.title}</p>
                    <p className="text-xs text-red-400 mt-1">{task.date || task.task_date}</p>
                  </div>
                  {task.amount > 0 && <span className="font-bold text-slate-300 text-sm">{task.amount.toLocaleString()} {t('currency')}</span>}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {logs.length === 0 ? (
            <div className="text-center p-4 text-slate-500 text-sm border border-dashed border-slate-800 rounded-lg">
              {t('dashboard.lists.noAuditLogs')}
            </div>
          ) : (
            logs.slice(0, 8).map(log => (
              <div key={log.id} className="flex justify-between items-center p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-300">{renderAuditDetails(log)}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span className="text-blue-400 font-bold">{log.username}</span> 
                    • {new Date(log.created_at).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                  {t(`audit.actions.${log.action}`, { defaultValue: log.action })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title={t('settings.modal.title')}>
        <form onSubmit={handleSaveStoreName} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
               {t('settings.modal.storeNameLabel')}
            </label>
            <input 
              type="text" 
              value={storeName} 
              onChange={e => setStoreName(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" 
              placeholder={t('settings.modal.storeNamePlaceholder')}
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
               {t('common.cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">
               {t('settings.modal.saveBtn')}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
```

---

## `frontend\src\components\pages\Employees.jsx`

```javascript
import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, AlertCircle, CheckCircle2 } from "lucide-react"; 
import { useTranslation } from "react-i18next"; 
import useEmployeeStore from "../../store/employeeStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// 🔴 1. استيراد نافذة التنبيه المخصصة الجديدة
import ConfirmAlert from '../ui/ConfirmAlert'; 

const Employees = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const { employees, fetchEmployees, addEmployee, isLoading } = useEmployeeStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", pinCode: "" });
  
  const [employeeToDelete, setEmployeeToDelete] = useState(null); 
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);
  
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const unlockFocus = () => {
    if (document.activeElement) document.activeElement.blur();
    setTimeout(() => {
      window.focus();
      document.body.focus();
      document.body.style.pointerEvents = 'auto';
    }, 10);
  };

  const filteredEmployees = employees.filter((emp) =>
    (emp?.name || "").toLowerCase().includes((searchQuery || "").toLowerCase()) // 🔴 الحماية المضافة سابقاً
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddDialog = () => {
    setEditingEmployee(null);
    setFormData({ name: "", role: "", pinCode: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (emp) => {
    setEditingEmployee(emp);
    setFormData({ name: emp.name, role: emp.role, pinCode: emp.pin_code });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (emp) => {
    setEmployeeToDelete(emp);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    const store = useEmployeeStore.getState();
    const idToDelete = employeeToDelete.id;
    
    // إغلاق النافذة
    setEmployeeToDelete(null); 
    
    try {
      if (store.deleteEmployee) {
        const res = await window.api.deleteEmployee(idToDelete);
        if (res.success) {
          if (res.isSoftDeleted) {
            showToast('warning', t('hr.employees.softDeleted', 'تم تعطيل الحساب بنجاح لحماية السجلات.')); 
          } else {
            showToast('success', t('common.success', 'تمت العملية بنجاح'));
          }
          fetchEmployees();
        } else {
          showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
        }
      }
    } catch (err) {
      showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pinCode) return; 

    const dataToSubmit = { ...formData };
    const isEdit = !!editingEmployee;
    const editId = editingEmployee ? editingEmployee.id : null;

    unlockFocus(); 
    
    setIsDialogOpen(false); 
    setFormData({ name: "", role: "", pinCode: "" }); 
    setEditingEmployee(null);

    setTimeout(async () => {
      try {
        let res;
        if (isEdit) {
          res = await window.api.updateEmployee(editId, dataToSubmit);
        } else {
          res = await window.api.addEmployee(dataToSubmit);
        }

        if (res && res.error) {
          showToast('warning', res.error); 
        } else if (res) {
          fetchEmployees();
          showToast('success', t('common.success', 'تمت العملية بنجاح'));
        } else {
          showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
        }
      } catch (err) {
        showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
      }
    }, 150);
  };

  return (
    <div className={`flex flex-col gap-6 p-6 w-full text-slate-100 ${isRTL ? 'text-right' : 'text-left'} relative`}>
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('hr.tabs.employees', 'العمال')}</h1>
          <p className="text-slate-400">{t('hr.subtitle', 'إدارة الحضور والانصراف والعمال')}</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <Button onClick={openAddDialog} className="flex gap-2 items-center bg-blue-600 text-white hover:bg-blue-700">
          <Plus size={18} /> {t('hr.employees.addBtn', 'إضافة موظف')}
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) unlockFocus(); 
          setIsDialogOpen(open);
        }}>
          <DialogContent 
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            className={`sm:max-w-[425px] bg-slate-950 text-slate-100 border-slate-800 ${isRTL ? 'text-right' : 'text-left'}`} 
            dir={i18n.dir()}
          >
            <DialogHeader>
              <DialogTitle>{editingEmployee ? t('hr.dialog.editTitle', 'تعديل موظف') : t('hr.dialog.title', 'إضافة موظف جديد')}</DialogTitle>
              <DialogDescription className="text-slate-400">
                {t('hr.dialog.desc', 'أدخل تفاصيل الموظف ورمز PIN السري.')}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className={`col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('hr.dialog.name', 'الاسم الكامل')}</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3 bg-slate-900 border-slate-800" placeholder={t('hr.dialog.namePlaceholder', 'محمد أمين...')} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className={`col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('hr.dialog.role', 'المنصب')}</Label>
                <select id="role" name="role" value={formData.role} onChange={handleChange} className="col-span-3 bg-slate-900 border-slate-800 rounded-md p-2 text-sm text-white focus:outline-none focus:border-blue-500" required>
                  <option value="" disabled>{t('hr.dialog.rolePlaceholder', 'اختر منصباً')}</option>
                  <option value="cashier">{t('hr.roles.cashier', 'بائع (كاشير)')}</option>
                  <option value="scale">{t('hr.roles.scale', 'عامل ميزان')}</option>
                  <option value="stock">{t('hr.roles.stock', 'ترتيبات')}</option>
                  <option value="admin">{t('hr.roles.admin', 'مدير عام')}</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pinCode" className={`col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('hr.dialog.pin', 'رمز PIN')}</Label>
                <Input id="pinCode" name="pinCode" type="password" value={formData.pinCode} onChange={handleChange} className="col-span-3 bg-slate-900 border-slate-800 tracking-widest" placeholder="****" required />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                  {editingEmployee ? t('hr.dialog.saveChanges', 'حفظ التعديلات') : t('hr.dialog.save', 'حفظ بيانات الموظف')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="relative w-1/3">
          <Input placeholder={t('common.search', 'بحث...')} className={`bg-slate-900 border-slate-800 w-full ${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} dir={i18n.dir()} />
          <Search className={`absolute top-2.5 text-slate-500 ${isRTL ? 'right-3' : 'left-3'}`} size={18} />
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
        <Table dir={i18n.dir()}>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className={`${isRTL ? 'text-right' : 'text-left'} text-slate-400`}>{t('hr.employees.table.name', 'الاسم الكامل')}</TableHead>
              <TableHead className={`${isRTL ? 'text-right' : 'text-left'} text-slate-400`}>{t('hr.employees.table.role', 'المنصب')}</TableHead>
              <TableHead className="text-center text-slate-400">{t('hr.employees.table.status', 'الحالة')}</TableHead>
              <TableHead className="text-center text-slate-400">{t('hr.employees.table.actions', 'الإجراءات')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</TableCell></TableRow>
            ) : filteredEmployees.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500">{t('common.noResults', 'لا توجد نتائج')}</TableCell></TableRow>
            ) : (
              filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{emp.name}</TableCell>
                  <TableCell className={`${isRTL ? 'text-right' : 'text-left'} text-slate-300`}>
                    {t(`hr.roles.${emp.role}`, { defaultValue: emp.role })}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${emp.status === "active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                      {emp.status === "active" ? t('hr.status.active', 'نشط') : t('hr.status.inactive', 'معطل')}
                    </span>
                  </TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                    <Button onClick={() => openEditDialog(emp)} variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30" title={t('hr.employees.actions.edit', 'تعديل')}>
                      <Edit size={18} />
                    </Button>
                    <Button 
                      onClick={() => handleDeleteClick(emp)} 
                      variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-900/30" title={t('hr.employees.actions.delete', 'حذف')}>
                      <Trash2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔴 2. استخدام النافذة الجديدة بدلاً من القديمة */}
      <ConfirmAlert 
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={confirmDelete}
        title={t('hr.employees.actions.delete', 'حذف')}
        message={t('hr.employees.deleteConfirmMsg', { 
          name: employeeToDelete?.name, 
          defaultValue: `هل أنت متأكد من حذف الحساب الإداري للمستخدم:\n${employeeToDelete?.name}؟` 
        })}
        cancelText={t('common.cancel', 'إلغاء')}
        confirmText={t('suppliers.actions.confirmDeleteBtn', 'تأكيد الحذف')}
      />

    </div>
  );
};
export default Employees;
```

---

## `frontend\src\components\pages\Expenses.jsx`

```javascript
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, ArrowDownCircle, Wallet, Edit, Trash2, ShieldAlert, Filter, Info } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmAlert from '../ui/ConfirmAlert'; 
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
  
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const { employees, fetchEmployees } = useEmployeeStore();
  const { suppliers, fetchSuppliers } = useSupplierStore();
  const user = useAuthStore(state => state.user);

  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';
  const myCaisseName = isSuperAdmin ? 'admin' : (user?.username || 'Cashier');
  
  const [selectedCaisseFilter, setSelectedCaisseFilter] = useState(isSuperAdmin ? 'all' : myCaisseName);

  const [formData, setFormData] = useState({
    description: '', category: 'utilities', amount: '', employeeId: '', supplierId: '', caisseSource: myCaisseName, date: new Date().toISOString().split('T')[0]
  });
  
  const myEmployeeRecord = useMemo(() => {
    return employees.find(e => e.name === user?.username);
  }, [employees, user]);

  const fetchExpensesList = async () => {
    try {
      if (window.api && window.api.getExpenses) {
        const data = await window.api.getExpenses(selectedCaisseFilter);
        setExpenses(data || []);
      }
    } catch (error) { console.error("Failed to fetch expenses:", error); }
  };

  useEffect(() => {
    fetchExpensesList();
  }, [selectedCaisseFilter]);

  useEffect(() => {
    fetchEmployees();
    fetchSuppliers();
  }, []);

  const openAddModal = () => {
    setEditingExpense(null);
    setFormData({ 
      description: '', category: 'utilities', amount: '', 
      employeeId: isSuperAdmin ? '' : (myEmployeeRecord?.id || ''), 
      supplierId: '', caisseSource: myCaisseName, 
      date: new Date().toISOString().split('T')[0] 
    });
    setIsModalOpen(true);
  };

  // 🔴 دالة فتح نافذة التعديل (أعدناها من جديد!)
  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setFormData({
      description: expense.description,
      category: expense.category,
      amount: expense.amount,
      employeeId: '',
      supplierId: '',
      caisseSource: expense.caisse_source || myCaisseName, // جلب الصندوق السابق
      date: expense.date || new Date().toISOString().split('T')[0] // جلب التاريخ السابق
    });
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!expenseToDelete) return;
    try {
      if (window.api && window.api.deleteExpense) {
        const result = await window.api.deleteExpense(expenseToDelete, user?.username || 'Unknown');
        if (result && result.success) {
          fetchExpensesList();
        }
      }
    } catch (error) { console.error("Error deleting expense:", error); }
    setExpenseToDelete(null); 
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount) || 0;
    const dateStr = formData.date; 
    const finalCaisseSource = isSuperAdmin ? formData.caisseSource : myCaisseName;

    try {
      if (formData.category === 'advance') {
        const finalEmployeeId = isSuperAdmin ? formData.employeeId : myEmployeeRecord?.id;
        if (window.api && window.api.addAdvance) {
          await window.api.addAdvance({
            employeeId: finalEmployeeId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        }
      } else if (formData.category === 'supplier_payment') {
        if (window.api && window.api.addPayment) {
          await window.api.addPayment({
            supplierId: formData.supplierId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        }
      } else {
        if (editingExpense) {
          // 🔴 دعم التعديل الشامل
          await window.api.updateExpense(editingExpense.id, { 
            description: formData.description, 
            category: formData.category, 
            amount: amountNum,
            date: dateStr,
            caisseSource: finalCaisseSource 
          });
        } else {
          await window.api.addExpense({ description: formData.description, category: formData.category, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource });
        }
      }

      setIsModalOpen(false);
      setEditingExpense(null);
      fetchExpensesList(); 
    } catch (error) { console.error("Error saving transaction:", error); }
  };

  const filteredExpenses = expenses?.filter(exp => {
    const description = exp.description || "";
    return description.toLowerCase().includes(searchTerm.toLowerCase());
  }) || []; 

  const todayString = new Date().toISOString().split('T')[0];
  const todayTotal = expenses?.filter(exp => exp.date === todayString)?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;
  const monthTotal = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;

  const getCategoryTranslation = (category) => {
    const translated = t(`expenses.categories.${category}`);
    return translated.includes('expenses.categories') ? category : translated;
  };

  const availableCaisses = useMemo(() => {
      const caisses = new Set(['admin']);
      employees.forEach(emp => {
         if(emp.role === 'cashier' || emp.role === 'scale') caisses.add(emp.name);
      });
      return Array.from(caisses);
  }, [employees]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('expenses.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('expenses.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          {isSuperAdmin && (
             <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 shadow-sm">
               <Filter size={18} className="text-blue-400" />
               <select 
                 value={selectedCaisseFilter} 
                 onChange={(e) => setSelectedCaisseFilter(e.target.value)}
                 className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                 dir={isRTL ? "rtl" : "ltr"}
               >
                 <option value="all">{t('expenses.allCaisses', 'كل الصناديق')}</option>
                 {availableCaisses.map(c => (
                   <option key={c} value={c}>
                     {c === 'admin' ? t('expenses.adminCaisse', 'صندوق المدير (الرئيسي)') : t('expenses.cashierCaisse', { name: c, defaultValue: `صندوق الكاشير: ${c}` })}
                   </option>
                 ))}
               </select>
             </div>
          )}

          <button onClick={openAddModal} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
            <Plus size={18} /><span>{t('expenses.addExpense')}</span>
          </button>
        </div>
      </div>

      {!isSuperAdmin && (
        <div className="mb-6 bg-blue-900/20 border border-blue-800/50 rounded-lg p-3 flex items-center gap-3 text-blue-300 text-sm" dir={i18n.dir()}>
           <Info size={18} className="text-blue-400 shrink-0" />
           <p className="leading-relaxed">
             {t('expenses.cashierNotice', { name: myCaisseName, defaultValue: `You are viewing only the expenses and payments made from your own register (${myCaisseName}) across all days.` })}
           </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.today')}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{todayTotal.toLocaleString()} {t('currency')}</h3>
          </div>
          <div className="p-3 bg-red-950/30 rounded-lg text-red-400"><ArrowDownCircle size={24} /></div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.month')}</p>
            <h3 className="text-2xl font-bold text-slate-300 mt-1">{monthTotal.toLocaleString()} {t('currency')}</h3>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg text-slate-400"><Wallet size={24} /></div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 bg-slate-950/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('common.search')} className="w-full bg-slate-900 border border-slate-700 rounded-lg ps-10 pe-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner text-start" dir={isRTL ? "rtl" : "ltr"} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.date')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.description')}</th>
                {isSuperAdmin && <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('expenses.caisseSourceLabel', 'المصدر')}</th>}
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.amount')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={`${exp.source}-${exp.id}`} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap text-start">{exp.date}</td>
                  <td className="px-6 py-4 text-start">
                    <span className="font-medium text-white">{exp.description}</span>
                    <div className="text-xs text-slate-500 mt-1">{getCategoryTranslation(exp.category)}</div>
                  </td>
                  
                  {isSuperAdmin && (
                     <td className="px-6 py-4 text-center">
                       <span className={`px-2 py-1 rounded-md text-xs font-medium ${exp.caisse_source === 'admin' ? 'bg-blue-950 text-blue-400 border border-blue-900' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                         {exp.caisse_source === 'admin' ? t('common.superAdmin', 'المدير') : exp.caisse_source}
                       </span>
                     </td>
                  )}

                  <td className="px-6 py-4 text-start font-bold text-red-400">{exp.amount.toLocaleString()} {t('currency')}</td>
                  <td className="px-6 py-4 text-center">
                    {exp.source === 'expense' ? (
                      <div className="flex items-center justify-center gap-2">
                        {/* 🔴 زر التعديل أصبح بجانب زر الحذف للمصاريف العادية */}
                        <button onClick={() => openEditModal(exp)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('expenses.editExpense')}>
                          <Edit size={18} />
                        </button>
                        <button onClick={() => setExpenseToDelete(exp.id)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors" title={t('suppliers.actions.delete')}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-xs text-slate-500 gap-1" title="يُرجى الذهاب لصفحة الموردين أو الرواتب لتعديل هذا السجل">
                        <ShieldAlert size={14} /> {t('expenses.table.locked', 'مقفل')}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr><td colSpan={isSuperAdmin ? "5" : "4"} className="px-6 py-12 text-center text-slate-500">{t('common.noResults')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmAlert isOpen={!!expenseToDelete} onClose={() => setExpenseToDelete(null)} onConfirm={confirmDelete} title={t('suppliers.actions.delete')} message={t('expenses.deleteConfirm')} confirmText={t('suppliers.actions.confirmDeleteBtn')} />

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingExpense(null); }} title={editingExpense ? t('expenses.editExpense') : t('expenses.addExpense')}>
        <form className="space-y-4" onSubmit={handleSubmitExpense} dir={isRTL ? "rtl" : "ltr"}>
          
          {/* 🔴 السماح للمدير بتعديل الصندوق حتى في وضع التعديل (تم إزالة شرط !editingExpense) */}
          {isSuperAdmin && (
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.caisseSourceLabel', 'مصدر الأموال')}</label>
               <select value={formData.caisseSource} onChange={e => setFormData({...formData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                 <option value="admin">{t('expenses.adminCaisse', 'صندوق المدير')}</option>
                 {availableCaisses.filter(c => c !== 'admin').map(c => <option key={c} value={c}>{t('expenses.cashierCaisse', { name: c, defaultValue: `صندوق الكاشير: ${c}` })}</option>)}
               </select>
             </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.category')}</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" disabled={!!editingExpense}>
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
              {isSuperAdmin ? (
                <select required value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                  <option value="" disabled>{t('payroll.selectEmployee')}</option>
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                </select>
              ) : (
                <div className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-blue-400 font-bold text-start cursor-not-allowed">
                  {user?.username} - {t('expenses.myAdvance', 'سلفتي الشخصية')}
                </div>
              )}
            </div>
          )}

          {formData.category === 'supplier_payment' && (
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('suppliers.modal.nameLabel')}</label>
               <select required value={formData.supplierId} onChange={e => setFormData({...formData, supplierId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                 <option value="" disabled>{t('suppliers.modal.selectSupplier', '-- اختر مورداً --')}</option>
                 {suppliers.map(sup => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
               </select>
             </div>
          )}

          {/* 🔴 حقل التاريخ متوفر للتعديل دائماً */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.dateLabel', 'التاريخ')}</label>
            <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.amount')} ({t('currency')})</label>
            <input type="number" min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.description')}</label>
            <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required />
          </div>

          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setIsModalOpen(false); setEditingExpense(null); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{editingExpense ? t('expenses.saveChanges') : t('expenses.addExpense')}</button>
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
import { Search, Plus, MoreHorizontal, UserCheck, AlertCircle, ScanLine, Users, X, Clock, Edit, Trash2, CheckCircle2 } from "lucide-react";

import useEmployeeStore from "../../store/employeeStore";
import useAttendanceStore from "../../store/attendanceStore";

// 🔴 1. استيراد نافذة التنبيه المخصصة
import ConfirmAlert from '../ui/ConfirmAlert'; 

const HR = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [activeTab, setActiveTab] = useState('attendance');
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const { employees, fetchEmployees, addEmployee, isLoading: empLoading } = useEmployeeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", pinCode: "" });
 
  const { submitPin, fetchTodayRecords, isLoading: attLoading } = useAttendanceStore();
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);
  
  const today = new Date().toISOString().split('T')[0];
  const [attendanceDate, setAttendanceDate] = useState(today);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // 🔴 2. متغيرات حالة النافذة المخصصة والإشعارات
  const [employeeToDelete, setEmployeeToDelete] = useState(null); 
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchAttendanceForDate = async (date) => {
    try {
      const data = await window.api.getTodayAttendance(date);
      setAttendanceRecords(data || []);
    } catch (error) { console.error("Error fetching attendance for date:", error); }
  };

  useEffect(() => {
    fetchAttendanceForDate(attendanceDate);
  }, [attendanceDate]);

  useEffect(() => {
    fetchEmployees();
    fetchTodayRecords(); 
  }, []); 

  const filteredEmployees = employees.filter((emp) =>
    (emp?.name || "").toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    
    const result = await submitPin(pinInput.trim());
    
    if (result && result.success) {
       const actionText = result.action === 'check_in' ? t('hr.messages.checkIn') : t('hr.messages.checkOut');
       setFeedback({ type: 'success', message: `${actionText}: ${result.employeeName}` });
       fetchAttendanceForDate(attendanceDate); 
    } else if (result) {
       setFeedback({ type: 'error', message: result.message });
    }
    
    setPinInput("");
    if(inputRef.current) inputRef.current.focus();
    setTimeout(() => setFeedback(null), 4000);
  };

  // 🔴 3. دالة الحذف الآمنة (بدون تجميد)
  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    const store = useEmployeeStore.getState();
    const idToDelete = employeeToDelete.id;
    
    setEmployeeToDelete(null); // إغلاق النافذة فوراً
    
    try {
      const res = await window.api.deleteEmployee(idToDelete);
      if (res && res.success) {
        if (res.isSoftDeleted) {
          showToast('warning', t('hr.employees.softDeleted', 'تم تعطيل الحساب لحماية السجلات.')); 
        } else {
          showToast('success', t('common.success', 'تم الحذف بنجاح'));
        }
        store.fetchEmployees();
      } else {
        showToast('error', t('common.error', 'حدث خطأ أثناء الحذف'));
      }
    } catch(e) { 
      showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
    }
  };

  const presentCount = attendanceRecords.filter(r => !r.time_out).length;
  const absentCount = Math.max(0, employees.length - attendanceRecords.length);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans flex flex-col gap-6 relative">
      
      {/* 🔴 شريط الإشعارات الذكي (Toast) */}
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('hr.title')}</h1>
          <p className="text-slate-400">{t('hr.subtitle')}</p>
        </div>
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1">
        <button onClick={() => setActiveTab('attendance')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <ScanLine size={18} /> {t('hr.tabs.attendance')}
        </button>
        <button onClick={() => setActiveTab('employees')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'employees' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <Users size={18} /> {t('hr.tabs.employees')}
        </button>
      </div>

      {activeTab === 'attendance' && (
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:h-[calc(100vh-220px)]">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-slate-800 p-2 rounded-lg text-blue-400"><ScanLine size={24} /></div>
                <h3 className="text-xl font-bold">{t('hr.scanner.title')}</h3>
              </div>
              <form onSubmit={handleAttendanceSubmit} className="flex flex-col gap-4">
                <input ref={inputRef} type="password" placeholder={t('hr.scanner.placeholder')} value={pinInput} onChange={(e) => setPinInput(e.target.value)} className="w-full text-center text-xl py-6 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 tracking-widest" autoFocus />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 rounded-lg font-medium transition-colors">{t('hr.scanner.submit')}</button>
              </form>
              {feedback && <div className={`mt-4 p-3 rounded-lg text-sm text-center border ${feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>{feedback.message}</div>}
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

          <div className="w-full lg:w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /> {t('hr.attendanceLog')}</h3>
              <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} className="bg-slate-950 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
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
                          {record.role && <span className="text-xs text-slate-500 mx-2">({t(`hr.roles.${record.role}`, record.role)})</span>}
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

      {activeTab === 'employees' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-lg">
            <button onClick={() => { setFormData({ name: "", role: "", pinCode: "" }); setEditingEmployee(null); setIsDialogOpen(true); }} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-lg font-medium transition-colors">
              <Plus size={18} /> {t('hr.employees.addBtn')}
            </button>
            <div className="relative w-1/3 text-start">
              <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder={t('hr.employees.search')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" dir={isRTL ? "rtl" : "ltr"} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.name')}</th>
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.role')}</th>
                  <th className="px-6 py-4 font-medium text-center">{t('hr.employees.table.status')}</th>
                  <th className="px-6 py-4 font-medium text-center">{t('hr.employees.table.actions')}</th>
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
                      <td className="px-6 py-4 text-slate-400 text-start">{t(`hr.roles.${emp.role}`, { defaultValue: emp.role })}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{t('hr.status.active', 'نشط')}</span>
                      </td>
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button onClick={() => { setFormData({ name: emp.name, role: emp.role, pinCode: emp.pin_code }); setEditingEmployee(emp); setIsDialogOpen(true); }} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title={t('hr.employees.actions.edit')}><Edit size={18} /></button>
                        
                        {/* 🔴 التعديل هنا: استخدام setEmployeeToDelete بدلاً من window.confirm */}
                        <button 
                          onClick={() => setEmployeeToDelete(emp)} 
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" 
                          title={t('hr.employees.actions.delete')}
                        >
                          <Trash2 size={18} />
                        </button>

                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {isDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="bg-slate-950 border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">{editingEmployee ? t('hr.dialog.editTitle') : t('hr.dialog.title')}</h2>
                    <p className="text-sm text-slate-400 mt-1">{t('hr.dialog.desc')}</p>
                  </div>
                  <button onClick={() => setIsDialogOpen(false)} className="text-slate-500 hover:text-white"><X size={20}/></button>
                </div>
                
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!formData.name || !formData.pinCode) return;
                    const store = useEmployeeStore.getState();
                    let success;
                    
                    if (editingEmployee) {
                       if (store.updateEmployee) success = await store.updateEmployee(editingEmployee.id, formData);
                       else { showToast('error', "Error: updateEmployee not found"); return; }
                    } else success = await store.addEmployee(formData);
                    
                    if (success) { 
                      setIsDialogOpen(false); 
                      setFormData({ name: "", role: "", pinCode: "" }); 
                      setEditingEmployee(null); 
                      store.fetchEmployees(); 
                      showToast('success', t('common.success', 'تمت العملية بنجاح')); // 🔴 بدلاً من alert
                    } else {
                      showToast('error', t('hr.messages.error', 'حدث خطأ غير متوقع')); // 🔴 بدلاً من alert
                    }
                  }} className="flex flex-col gap-4 text-start">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.name')}</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.role')}</label>
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required>
                      <option value="" disabled>{t('hr.dialog.rolePlaceholder')}</option>
                      <option value="cashier">{t('hr.roles.cashier')}</option>
                      <option value="scale">{t('hr.roles.scale')}</option>
                      <option value="stock">{t('hr.roles.stock')}</option>
                      <option value="admin">{t('hr.roles.admin')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.pin')}</label>
                    <input type="password" value={formData.pinCode} onChange={(e) => setFormData({...formData, pinCode: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 tracking-widest text-start" placeholder="****" required />
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">{t('hr.dialog.cancel')}</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">{editingEmployee ? t('hr.dialog.saveChanges') : t('hr.dialog.save')}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 🔴 4. مكون نافذة التأكيد السوداء المخصصة */}
      <ConfirmAlert 
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={confirmDelete}
        title={t('hr.employees.actions.delete', 'حذف حساب الموظف')}
        message={t('hr.employees.deleteConfirmMsg', { 
          name: employeeToDelete?.name, 
          defaultValue: `هل أنت متأكد من حذف حساب المستخدم:\n${employeeToDelete?.name}؟` 
        })}
        cancelText={t('common.cancel', 'إلغاء')}
        confirmText={t('suppliers.actions.confirmDeleteBtn', 'تأكيد الحذف')}
      />

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
        const response = await window.api.login({ username, password });
        
        if (response && response.success) {
          login(response.user); // تسجيل بيانات المستخدم في حالة التطبيق (Zustand)
          
          // التوجيه الذكي بعد تسجيل الدخول بناءً على الصلاحية
          if (response.user.role === 'admin' || response.user.role === 'superadmin') {
            navigate('/'); // توجيه المدير إلى لوحة القيادة
          } else {
            navigate('/end-of-day'); // توجيه الكاشير إجبارياً إلى منصته
          }
          
        } else {
          setError(response.message || t('login.error'));
        }
      } else {
        // وضع الاختبار (Fallback)
        if(username === 'admin' && password === 'admin123') {
           login({ username: 'admin', role: 'superadmin' });
           navigate('/');
        } else if (username === 'cashier' && password === '123') { // اختبار دخول كاشير
           login({ username: 'cashier', role: 'cashier' });
           navigate('/end-of-day');
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

## `frontend\src\components\pages\POS.jsx`

```javascript
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, ScanBarcode } from 'lucide-react';

export default function POS() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // 🔴 بيانات وهمية مبدئية حتى نربطها بقاعدة البيانات
  const [products] = useState([
    { id: 1, name: 'حليب جرجرة 1 لتر', price: 100, barcode: '123456789' },
    { id: 2, name: 'قهوة أروما 250غ', price: 250, barcode: '987654321' },
    { id: 3, name: 'سكر سيفيتال 1 كغ', price: 90, barcode: '112233445' },
    { id: 4, name: 'زيت عافية 2 لتر', price: 280, barcode: '554433221' },
    { id: 5, name: 'عصير رامي برتقال', price: 120, barcode: '998877665' },
  ]);

  const [cart, setCart] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState('');

  // دالة الإضافة للسلة
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // دالة البحث بالباركود
  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (!barcodeInput) return;
    const product = products.find(p => p.barcode === barcodeInput);
    if (product) addToCart(product);
    setBarcodeInput('');
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="h-full bg-slate-950 text-slate-300 flex overflow-hidden font-sans text-start">
      
      {/* 📦 القسم الأيسر/الأيمن: قائمة المنتجات والبحث */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* شريط البحث (القارئ) */}
        <div className="mb-4 flex gap-2">
          <form onSubmit={handleBarcodeSubmit} className="flex-1 relative">
            <ScanBarcode className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-500" size={24} />
            <input 
              type="text" 
              autoFocus
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              placeholder={t('pos.scanPlaceholder', 'قم بمسح الباركود أو ابحث عن منتج...')}
              className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl py-4 ps-12 pe-4 text-white text-lg focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
            />
          </form>
        </div>

        {/* شبكة المنتجات (سريعة الوصول) */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 rounded-xl p-4 cursor-pointer transition-all active:scale-95 shadow-lg flex flex-col justify-between h-32"
              >
                <h3 className="font-bold text-white leading-tight">{product.name}</h3>
                <p className="text-xl font-bold text-emerald-400 mt-2">{product.price} <span className="text-xs text-slate-500">{t('currency', 'DA')}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🛒 القسم الجانبي: سلة المشتريات (الفاتورة) */}
      <div className={`w-96 bg-slate-900 border-${isRTL ? 'r' : 'l'} border-slate-800 flex flex-col shadow-2xl z-10`}>
        {/* عنوان السلة */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingCart size={20} className="text-blue-400" /> {t('pos.cart', 'سلة المشتريات')}
          </h2>
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">{cart.length}</span>
        </div>

        {/* عناصر السلة */}
        <div className="flex-1 overflow-y-auto p-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
              <ShoppingCart size={64} className="mb-4" />
              <p>{t('pos.emptyCart', 'السلة فارغة')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map((item, index) => (
                <div key={index} className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col gap-2 relative">
                   <div className="flex justify-between items-start pe-6">
                      <h4 className="text-white font-medium text-sm leading-tight">{item.name}</h4>
                      <p className="font-bold text-emerald-400 whitespace-nowrap">{(item.price * item.qty).toLocaleString()} {t('currency', 'DA')}</p>
                   </div>
                   
                   <div className="flex justify-between items-center">
                     <p className="text-xs text-slate-500">{item.price} {t('currency')} للوحدة</p>
                     <div className="flex items-center gap-2 bg-slate-900 rounded-lg border border-slate-700">
                        <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} className="p-1 hover:text-white"><Minus size={14}/></button>
                        <span className="text-sm font-bold text-white w-6 text-center">{item.qty}</span>
                        <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} className="p-1 hover:text-white"><Plus size={14}/></button>
                     </div>
                   </div>

                   {/* زر الحذف */}
                   <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="absolute top-3 end-3 text-slate-600 hover:text-red-500">
                     <Trash2 size={16} />
                   </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* إجمالي الفاتورة والدفع */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 font-medium">{t('pos.total', 'المجموع الكلي')}</span>
            <span className="text-4xl font-black text-white">{total.toLocaleString()} <span className="text-lg text-emerald-500">{t('currency', 'DA')}</span></span>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => setCart([])} disabled={cart.length === 0} className="p-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl disabled:opacity-50 transition-colors">
              <Trash2 size={24} />
            </button>
            <button disabled={cart.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50 transition-colors shadow-lg shadow-blue-900/20">
              <CreditCard size={24} /> {t('pos.pay', 'دفع وطباعة')}
            </button>
          </div>
        </div>
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
import { useNavigate } from 'react-router-dom';
import { Calculator, Banknote, Clock, Users, Calendar, MinusCircle, CheckCircle, Plus, AlertCircle, FileText, Printer, Eye, CheckCircle2, Edit, Trash2, ShieldAlert } from 'lucide-react';

import useEmployeeStore from '../../store/employeeStore';
import usePayrollStore from '../../store/payrollStore';
import useAuthStore from '../../store/authStore'; // 🔴 إضافة التحقق من الصلاحيات
import ConfirmAlert from '../ui/ConfirmAlert'; 
import Modal from '../ui/Modal'; 

export default function Payroll() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('calculator');

  const { employees, fetchEmployees } = useEmployeeStore();
  const { advances, salaries, fetchAdvances, fetchSalaries, addAdvance, calculatePayroll, payrollResult, paySalary, clearPayrollResult } = usePayrollStore();
  
  // 🔴 جلب المستخدم الحالي للتحقق من صلاحياته (السوبر أدمن فقط من يعدل/يحذف السلفيات)
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startDate, setStartDate] = useState(lastWeek.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const [hourlyRate, setHourlyRate] = useState('');
  
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [advanceData, setAdvanceData] = useState({ employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' });

  // 🔴 حالات جديدة للتعديل والحذف
  const [editingAdvance, setEditingAdvance] = useState(null);
  const [advanceToDelete, setAdvanceToDelete] = useState(null);

  const [confirmModalData, setConfirmModalData] = useState(null);

  // نظام الإشعارات الذكي (Toast)
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchEmployees();
    fetchAdvances();
    fetchSalaries();
  }, []);

  useEffect(() => {
    if(selectedEmployee) {
       clearPayrollResult();
    }
  }, [selectedEmployee]);

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();
    if (!selectedEmployee || !hourlyRate || !startDate || !endDate) return;
    await calculatePayroll({ employeeId: selectedEmployee, startDate, endDate, hourlyRate: Number(hourlyRate) });
  };

  // 🔴 دالة لفتح نافذة التعديل مع تعبئة البيانات
  const openEditAdvanceModal = (adv) => {
    setEditingAdvance(adv);
    setAdvanceData({
      employeeId: adv.employee_id,
      amount: adv.amount,
      date: adv.date,
      caisseSource: adv.caisse_source || '',
      note: adv.note || ''
    });
    setIsAdvanceModalOpen(true);
  };

  // 🔴 تعديل دالة الحفظ لتدعم الإضافة والتحديث
  const handleSaveAdvance = async (e) => {
    e.preventDefault();
    if (!advanceData.employeeId || !advanceData.caisseSource) return;
    
    let success = false;

    if (editingAdvance) {
      // تحديث سلفة موجودة
      if (window.api && window.api.updateAdvance) {
        const res = await window.api.updateAdvance(editingAdvance.id, {
          amount: Number(advanceData.amount),
          date: advanceData.date,
          caisseSource: advanceData.caisseSource,
          note: advanceData.note
        });
        success = res?.success;
      }
    } else {
      // إضافة سلفة جديدة
      success = await addAdvance({ employeeId: advanceData.employeeId, amount: Number(advanceData.amount), date: advanceData.date, caisseSource: advanceData.caisseSource, note: advanceData.note });
    }

    if (success) {
      setIsAdvanceModalOpen(false);
      setEditingAdvance(null);
      setAdvanceData({ employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' });
      if (payrollResult) handleCalculate(); 
      fetchAdvances();
      showToast('success', editingAdvance ? t('common.success', 'تم التعديل بنجاح') : t('common.success', 'تمت إضافة السلفة بنجاح'));
    } else {
      showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
    }
  };

  // 🔴 دالة لتنفيذ حذف السلفة
  const executeDeleteAdvance = async () => {
    if (!advanceToDelete) return;
    if (window.api && window.api.deleteAdvance) {
      const res = await window.api.deleteAdvance(advanceToDelete);
      if (res?.success) {
        fetchAdvances();
        showToast('success', t('common.success', 'تم حذف السلفة واسترجاع الأموال للصندوق بنجاح'));
      } else {
        showToast('error', res.error || t('common.error', 'حدث خطأ أثناء الحذف'));
      }
    }
    setAdvanceToDelete(null);
  };

  const handlePaySalaryClick = () => {
    if (!payrollResult) return;
    const employeeName = employees.find(e => e.id === Number(selectedEmployee))?.name || '';
    const payload = { 
      ...payrollResult, 
      date: today.toISOString().split('T')[0],
      rolloverNote: t('payroll.rolloverNote', { start: payrollResult.startDate, end: payrollResult.endDate }),
      expenseNote: t('payroll.expenseNote', { name: employeeName, start: payrollResult.startDate, end: payrollResult.endDate })
    };

    if (payrollResult.netSalary < 0) {
       setConfirmModalData({ type: 'rollover', payload });
    } else {
       setConfirmModalData({ type: 'standard', payload });
    }
  };

  const executePayment = async () => {
    if (!confirmModalData) return;
    const res = await paySalary(confirmModalData.payload);
    if (res.success) {
      setActiveTab('salaries');
      fetchSalaries();
      fetchAdvances();
      clearPayrollResult();
      showToast('success', t('common.success'));
    } else {
      showToast('error', t('common.error') + ' \n' + res.error);
    }
    setConfirmModalData(null);
  };

  const handlePrintPayslip = () => {
    if (!payrollResult) return;
    const employeeData = employees.find(e => e.id === Number(selectedEmployee));
    navigate('/preview', {
      state: { type: 'payslip', employeeName: employeeData?.name || '', period: `${startDate} - ${endDate}`, date: today.toISOString().split('T')[0], hours: payrollResult.totalHours, rate: hourlyRate, grossSalary: payrollResult.grossSalary, deductions: payrollResult.totalAdvances, netSalary: payrollResult.netSalary }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex flex-col gap-6 text-start relative">
      
      {/* مكون الـ Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2"><Banknote className="text-emerald-500" />{t('payroll.title')}</h1>
          <p className="text-sm text-slate-500">{t('payroll.subtitle')}</p>
        </div>
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1 overflow-x-auto">
        <button onClick={() => setActiveTab('calculator')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'calculator' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><Calculator size={18} /> {t('payroll.tabs.calculator')}</button>
        <button onClick={() => setActiveTab('advances')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'advances' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><MinusCircle size={18} /> {t('payroll.tabs.advances')}</button>
        <button onClick={() => setActiveTab('salaries')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'salaries' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><FileText size={18} /> {t('payroll.tabs.salaries')}</button>
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
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({t(`hr.roles.${emp.role}`, emp.role)})</option>)}
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
                <input type="number" step="0.01" min="1" required value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
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
                  <div className="flex items-center gap-3"><MinusCircle className="text-red-400" size={24} /><p className="text-slate-400 font-medium">{t('payroll.deductions')}</p></div>
                  <p className="text-xl font-bold text-red-400">-{payrollResult.totalAdvances.toLocaleString()}</p>
                </div>
                <div className={`p-5 rounded-lg border text-center col-span-2 ${payrollResult.netSalary < 0 ? 'bg-red-950/30 border-red-900/50 ring-1 ring-red-500/50' : 'bg-emerald-950/30 border-emerald-900/50 ring-1 ring-emerald-500/50'}`}>
                  <p className="text-sm text-slate-300 mb-2">{t('payroll.netSalary')}</p>
                  <p className={`text-4xl font-bold ${payrollResult.netSalary < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                    {payrollResult.netSalary.toLocaleString()} {t('currency')}
                  </p>
                  {payrollResult.netSalary < 0 && <p className="text-xs text-red-400 mt-2">{t('payroll.negativeSalaryError')}</p>}
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handlePaySalaryClick} className={`flex-1 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors ${payrollResult.netSalary < 0 ? 'bg-orange-600 hover:bg-orange-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                  <CheckCircle size={24} /> {payrollResult.netSalary < 0 ? t('payroll.rolloverBtn') : t('payroll.payBtn')}
                </button>
                <button onClick={handlePrintPayslip} title={t('payroll.previewPayslip')} className="bg-slate-800 hover:bg-slate-700 text-white py-4 px-6 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"><Eye size={24} /></button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'advances' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
            <h3 className="font-bold text-white flex items-center gap-2"><MinusCircle size={18} className="text-red-400" /> {t('payroll.advancesTitle')}</h3>
            <button onClick={() => { setEditingAdvance(null); setIsAdvanceModalOpen(true); }} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors">
              <Plus size={18} /> {t('payroll.addAdvance')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[800px]" dir={isRTL ? "rtl" : "ltr"}>
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.name')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.date')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.caisse')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.amount')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.note')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('hr.table.status')}</th>
                  {/* 🔴 عمود الإجراءات يظهر دائما، ولكن الكاشير سيرى داخله فراغاً */}
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('common.actions', 'الإجراءات')}</th>
                </tr>
              </thead>
              <tbody>
                {advances.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-12 text-slate-500">{t('common.noResults')}</td></tr>
                ) : (
                  advances.map(adv => (
                    <tr key={adv.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-medium text-white">{adv.employee_name}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{adv.date}</td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{adv.caisse_source || '-'}</td>
                      <td className="px-6 py-4 font-bold text-red-400">{adv.amount.toLocaleString()} {t('currency')}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{adv.note || '-'}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${adv.status === 'pending' ? 'bg-orange-950 text-orange-400 border-orange-900' : 'bg-emerald-950 text-emerald-400 border-emerald-900'}`}>
                          {adv.status === 'pending' ? t('payroll.statusPending') : t('payroll.statusPaid')}
                        </span>
                      </td>
                      {/* 🔴 خلية الإجراءات الديناميكية */}
                      <td className="px-6 py-4 text-center">
                        {adv.status === 'pending' ? (
                          <div className="flex items-center justify-center gap-2">
                            {isSuperAdmin ? (
                              <>
                                <button onClick={() => openEditAdvanceModal(adv)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('common.edit', 'تعديل')}>
                                  <Edit size={18} />
                                </button>
                                <button onClick={() => setAdvanceToDelete(adv.id)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors" title={t('common.delete', 'حذف')}>
                                  <Trash2 size={18} />
                                </button>
                              </>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center text-xs text-slate-500 gap-1" title={t('payroll.lockedAdvance', 'لا يمكن التعديل: تم خصمها من راتب مدفوع')}>
                            <ShieldAlert size={14} /> {t('common.locked', 'مقفلة')}
                          </div>
                        )}
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
          <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-blue-400" /> {t('payroll.tabs.salaries')}
            </h3>
            <button onClick={() => {
                if(salaries.length === 0) return showToast('warning', t('payroll.noSalariesToPrint')); 
                navigate('/preview', { state: { type: 'all-salaries', salaries: salaries }});
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md"
            >
              <Printer size={16} /> {t('payroll.printReport')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[800px]" dir={isRTL ? "rtl" : "ltr"}>
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
                      <td className="px-6 py-4 font-medium text-white">{sal.employee_name}<div className="text-xs text-slate-500 mt-1">{t('payroll.date')}: {sal.payment_date}</div></td>
                      <td className="px-6 py-4 text-slate-400 text-sm text-center">{sal.start_date} <br/> {sal.end_date}</td>
                      <td className="px-6 py-4 text-blue-400 font-medium text-center">{sal.total_hours}</td>
                      <td className="px-6 py-4 text-slate-300 text-center">{sal.total_hours * sal.hourly_rate}</td>
                      <td className="px-6 py-4 text-red-400 font-medium text-center">-{sal.total_advances}</td>
                      <td className="px-6 py-4 font-bold text-emerald-400 text-center bg-slate-950/50">{sal.net_salary.toLocaleString()} {t('currency')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🔴 النافذة المنبثقة لإضافة/تعديل السلفة */}
      <Modal isOpen={isAdvanceModalOpen} onClose={() => { setIsAdvanceModalOpen(false); setEditingAdvance(null); }} title={editingAdvance ? t('payroll.editAdvance', 'تعديل السلفة') : t('payroll.addAdvance')}>
        <form onSubmit={handleSaveAdvance} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.selectEmployee')}</label>
            <select required disabled={!!editingAdvance} value={advanceData.employeeId} onChange={e => setAdvanceData({...advanceData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60" dir={isRTL ? "rtl" : "ltr"}>
              <option value="" disabled>{t('payroll.selectEmployee')}</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
            {editingAdvance && <p className="text-xs text-slate-500 mt-1">{t('payroll.employeeEditNotice', 'لا يمكن تغيير اسم الموظف عند التعديل، لسلامة الحسابات.')}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.caisse')}</label>
            <select required value={advanceData.caisseSource} onChange={e => setAdvanceData({...advanceData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" dir={isRTL ? "rtl" : "ltr"}>
              <option value="" disabled>{t('payroll.selectCaisse', '-- اختر المصدر --')}</option>
              {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name} ({t(`hr.roles.${emp.role}`, emp.role)})</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.amount')} ({t('currency')})</label>
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
            <button type="button" onClick={() => { setIsAdvanceModalOpen(false); setEditingAdvance(null); }} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">{t('common.cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">{editingAdvance ? t('common.saveChanges', 'حفظ التعديلات') : t('payroll.addAdvance')}</button>
          </div>
        </form>
      </Modal>

      {/* 🔴 النافذة المخصصة لتأكيد دفع الراتب */}
      <ConfirmAlert 
        isOpen={!!confirmModalData}
        onClose={() => setConfirmModalData(null)}
        onConfirm={executePayment}
        title={t('payroll.payBtn')}
        message={confirmModalData?.type === 'rollover' ? t('payroll.rolloverConfirm') : t('payroll.standardConfirm')}
        confirmText={t('common.success')}
        confirmColor={confirmModalData?.type === 'rollover' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-emerald-600 hover:bg-emerald-700'}
      />

      {/* 🔴 النافذة المخصصة لتأكيد حذف السلفة */}
      <ConfirmAlert 
        isOpen={!!advanceToDelete}
        onClose={() => setAdvanceToDelete(null)}
        onConfirm={executeDeleteAdvance}
        title={t('payroll.deleteAdvanceTitle', 'حذف السلفة')}
        message={t('payroll.deleteAdvanceMsg', 'هل أنت متأكد من إلغاء هذه السلفة؟ سيتم استرجاع قيمتها مباشرة إلى صندوق المصاريف.')}
        confirmText={t('common.delete', 'حذف')}
        confirmColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
```

---

## `frontend\src\components\pages\PrintPreview.jsx`

```javascript
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Printer, Download, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PrintableTicket from '../ui/PrintableTicket';
import PrintablePayslip from '../ui/PrintablePayslip';
import PrintablePayrollReport from '../ui/PrintablePayrollReport'; // الاستيراد الجديد

export default function PrintPreview() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isRTL = i18n.dir() === 'rtl';

  const printData = location.state;

  useEffect(() => {
    if (!printData) {
      navigate(-1);
    }
  }, [printData, navigate]);

  if (!printData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 print:bg-white flex flex-col items-center py-10 print:py-0">
      
      {/* شريط التحكم */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-10 print:hidden bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-lg">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
        >
          {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          <span className="font-bold">{t('common.back', 'رجوع')}</span>
        </button>
        
        <div className="flex gap-3">
          <button onClick={handlePrint} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-md">
            <Printer size={20} /> <span>{t('print.printBtn', 'طباعة')}</span>
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-bold transition-colors border border-slate-600 shadow-md">
            <Download size={20} /> <span>{t('print.savePdfBtn', 'تحميل PDF')}</span>
          </button>
        </div>
      </div>

      {/* منطقة المعاينة الذكية */}
      <div className="w-full flex justify-center overflow-x-auto pb-10 print:pb-0">
        {printData.type === 'payslip' ? (
          <PrintablePayslip data={printData} />
        ) : printData.type === 'all-salaries' ? (
          <PrintablePayrollReport data={printData} /> 
        ) : (
          <PrintableTicket data={printData} />
        )}
      </div>

    </div>
  );
}
```

---

## `frontend\src\components\pages\Suppliers.jsx`

```javascript
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useSupplierStore from '../../store/supplierStore';
import useEmployeeStore from '../../store/employeeStore'; 
import ConfirmAlert from '../ui/ConfirmAlert'; // 🔴 إضافة النافذة المخصصة
import Modal from '../ui/Modal';
import { Plus, Search, ArrowUpDown, ArrowRight, ArrowLeft, FileText, Banknote, ArrowUpRight, ArrowDownRight, Calendar, Eye, Edit, Trash2, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Suppliers() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const navigate = useNavigate();
  
  const { employees, fetchEmployees } = useEmployeeStore();
  const { suppliers, fetchSuppliers, addSupplier, updateSupplier, deleteSupplier, currentSupplier, fetchSupplierDetails, clearCurrentSupplier, addReceipt, addPayment } = useSupplierStore();
  
  const [globalFilter, setGlobalFilter] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('receipt'); 
  const [editingTransactionId, setEditingTransactionId] = useState(null); 
  const [transactionToDelete, setTransactionToDelete] = useState(null); 

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const [formData, setFormData] = useState({ name: '', phone: '', initialDebt: 0 });
  const [transactionData, setTransactionData] = useState({ amount: '', date: new Date().toISOString().split('T')[0], note: '', caisseSource: '' });
  const [scheduleData, setScheduleData] = useState({ amount: '', date: new Date().toISOString().split('T')[0], time: '10:00', note: '' });

  // 🔴 نظام الإشعارات الذكي (Toast)
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => { fetchSuppliers(); fetchEmployees(); }, []);

  const handlePreview = (type, item) => { navigate('/preview', { state: { type, item, supplierName: currentSupplier.name } }); };

  const handleSaveSupplier = async (e) => { 
    e.preventDefault(); 
    let res;
    if (editingSupplier) {
      res = await updateSupplier(editingSupplier.id, formData);
    } else {
      res = await addSupplier(formData); 
    }

    if (res && (res === true || res.success)) { 
      setIsAddModalOpen(false); 
      setEditingSupplier(null);
      setFormData({ name: '', phone: '', initialDebt: 0 }); 
      fetchSuppliers();
      showToast('success', t('common.success'));
    } else {
      showToast('error', t('suppliers.messages.saveError')); // 🔴 استبدال Alert
    }
  };

  const openEditSupplierModal = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({ name: supplier.name, phone: supplier.phone || '', initialDebt: supplier.initial_debt || 0 });
    setIsAddModalOpen(true);
  };

  const confirmDeleteSupplier = (id) => {
    setSupplierToDelete(id);
  };

  const executeDeleteSupplier = async () => {
    if (!supplierToDelete) return;
    const res = await deleteSupplier(supplierToDelete);
    if (res && res.success) {
      fetchSuppliers();
      showToast('success', t('common.success'));
    } else {
      const errorMessage = res?.errorKey ? t(`suppliers.messages.${res.errorKey}`) : t('suppliers.messages.deleteError');
      showToast('error', errorMessage); // 🔴 استبدال Alert
    }
    setSupplierToDelete(null); 
  };

  const openTransactionModal = (type) => {
    setTransactionType(type);
    setEditingTransactionId(null);
    setTransactionData({ amount: '', date: new Date().toISOString().split('T')[0], note: '', caisseSource: '' });
    setIsTransactionModalOpen(true);
  };

  const openEditTransactionModal = (type, item) => {
    setTransactionType(type);
    setEditingTransactionId(item.id);
    setTransactionData({ amount: item.amount, date: item.date, note: item.note || '', caisseSource: item.caisse_source || '' });
    setIsTransactionModalOpen(true);
  };

  const handleSaveTransaction = async (e) => {
    e.preventDefault();
    try {
      if (editingTransactionId) {
        if (transactionType === 'receipt') await window.api.updateReceipt(editingTransactionId, transactionData);
        else await window.api.updatePayment(editingTransactionId, transactionData);
      } else {
        const payload = { ...transactionData, supplierId: currentSupplier.id, amount: Number(transactionData.amount) };
        if (transactionType === 'receipt') await addReceipt(payload);
        else await addPayment(payload);
      }
      setIsTransactionModalOpen(false);
      fetchSupplierDetails(currentSupplier.id); 
      fetchSuppliers(); 
      showToast('success', t('common.success'));
    } catch (error) { 
      console.error("Error saving transaction:", error); 
      showToast('error', t('common.error'));
    }
  };

  const handleDeleteTransactionClick = (type, id) => {
    setTransactionToDelete({ type, id });
  };

  const executeDeleteTransaction = async () => {
    if (!transactionToDelete) return;
    try {
      let res;
      if (transactionToDelete.type === 'receipt') {
        res = await window.api.deleteReceipt(transactionToDelete.id);
      } else {
        res = await window.api.deletePayment(transactionToDelete.id);
      }

      if (res && res.success) {
        fetchSupplierDetails(currentSupplier.id); 
        fetchSuppliers(); 
        showToast('success', t('common.success'));
      } else {
        showToast('error', t('common.error')); // 🔴 استبدال Alert
      }
    } catch (error) { console.error(error); }
    setTransactionToDelete(null);
  };

  const handleImportExcel = async () => {
    try {
      if (window.api && window.api.importSuppliersExcel) {
        const res = await window.api.importSuppliersExcel();
        if (res && res.success) {
          showToast('success', t('suppliers.actions.importSuccess', { count: res.count })); // 🔴 استبدال Alert
          fetchSuppliers(); 
        } else if (res && !res.canceled) {
          showToast('error', t('suppliers.actions.importError') + " \n" + res.error); // 🔴 استبدال Alert
        }
      }
    } catch (error) { console.error(error); }
  };

  const columns = useMemo(() => [
    { accessorKey: 'name', header: ({ column }) => ( <button className="flex items-center gap-2 hover:text-white outline-none transition-colors" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}> {t('suppliers.table.name')} <ArrowUpDown size={14} /> </button> ), cell: (info) => <span className="font-medium text-white">{info.getValue()}</span> },
    { accessorKey: 'phone', header: t('suppliers.table.phone'), cell: (info) => <span className="text-slate-400">{info.getValue() || '-'}</span> },
    { accessorKey: 'total_debt', header: t('suppliers.table.totalDebt'), cell: (info) => { const amount = info.getValue() || 0; return <span className={`font-bold ${amount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{amount.toLocaleString()} {t('currency')}</span>; } },
    { id: 'status', header: t('suppliers.table.status'), cell: ({ row }) => { const amount = row.original.total_debt || 0; const isClear = amount <= 0; return ( <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${isClear ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-red-950 text-red-400 border-red-900'}`}> {isClear ? t('suppliers.status.clear') : t('suppliers.status.indebted')} </span> ); } },
    { 
      id: 'actions', 
      header: t('suppliers.table.actions'), 
      cell: ({ row }) => ( 
        <div className="flex items-center gap-2">
          <button onClick={() => fetchSupplierDetails(row.original.id)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('suppliers.actions.view')}>
            <Eye size={18} />
          </button>
          <button onClick={() => openEditSupplierModal(row.original)} className="p-2 text-emerald-400 hover:bg-emerald-900/50 rounded-lg transition-colors" title={t('suppliers.actions.edit')}>
            <Edit size={18} />
          </button>
          <button onClick={() => confirmDeleteSupplier(row.original.id)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors" title={t('suppliers.actions.delete')}>
            <Trash2 size={18} />
          </button>
        </div>
      ) 
    }, 
  ], [t, fetchSupplierDetails]);

  const table = useReactTable({ data: suppliers, columns, state: { globalFilter }, onGlobalFilterChange: setGlobalFilter, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel() });
  
  // وظيفة مخصصة لعرض الإشعار (مكررة داخل الـ Render) لتجنب التكرار في الحالتين
  const renderToast = () => toast && (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
      toast.type === 'success' ? 'bg-emerald-600 text-white' :
      toast.type === 'warning' ? 'bg-amber-600 text-white' :
      'bg-red-600 text-white'
    }`}>
      {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span className="font-bold">{toast.message}</span>
    </div>
  );

  if (currentSupplier) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
        {renderToast()}
        
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6 print:hidden">
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
              {currentSupplier.total_debt.toLocaleString()} {t('currency')}
            </h2>
          </div>
        </div>

        <div className="flex gap-4 mb-8 print:hidden">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:hidden">
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
                  <div key={r.id} className="p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-slate-400">{r.date}</span>
                        <span className="font-bold text-red-400">+{r.amount.toLocaleString()} {t('currency')}</span>
                      </div>
                      <p className="text-sm text-slate-300">{r.note || '-'}</p>
                    </div>
                    <div className="flex gap-2 ms-4 border-s border-slate-800 ps-4">
                      <button onClick={() => handlePreview('receipt', r)} className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors border border-slate-800" title="معاينة المستند"><Eye size={18} /></button>
                      <button onClick={() => openEditTransactionModal('receipt', r)} className="p-2 text-blue-400 hover:bg-slate-800 hover:text-blue-300 rounded-lg transition-colors border border-slate-800" title="تعديل"><Edit size={18} /></button>
                      <button onClick={() => handleDeleteTransactionClick('receipt', r.id)} className="p-2 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors border border-slate-800" title="حذف"><Trash2 size={18} /></button>
                    </div>
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
                  <div key={p.id} className="p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-slate-400">{p.date} • <span className="text-emerald-500/70">{p.caisse_source}</span></span>
                        <span className="font-bold text-emerald-400">-{p.amount.toLocaleString()} {t('currency')}</span>
                      </div>
                      <p className="text-sm text-slate-300">{p.note || '-'}</p>
                    </div>
                    <div className="flex gap-2 ms-4 border-s border-slate-800 ps-4">
                      <button onClick={() => handlePreview('payment', p)} className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors border border-slate-800" title="معاينة المستند"><Eye size={18} /></button>
                      <button onClick={() => openEditTransactionModal('payment', p)} className="p-2 text-blue-400 hover:bg-slate-800 hover:text-blue-300 rounded-lg transition-colors border border-slate-800" title="تعديل"><Edit size={18} /></button>
                      <button onClick={() => handleDeleteTransactionClick('payment', p.id)} className="p-2 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors border border-slate-800" title="حذف"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <Modal isOpen={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} title={transactionType === 'receipt' ? (editingTransactionId ? t('expenses.editExpense') : t('suppliers.details.addReceipt')) : (editingTransactionId ? t('expenses.editExpense') : t('suppliers.details.addPayment'))}>
          <form onSubmit={handleSaveTransaction} className="space-y-4 text-start">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} ({t('currency')})</label>
              <input type="number" min="1" required value={transactionData.amount} onChange={e => setTransactionData({...transactionData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            </div>
            
            {transactionType === 'payment' && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.caisse')}</label>
                <select required value={transactionData.caisseSource} onChange={e => setTransactionData({...transactionData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" dir={isRTL ? "rtl" : "ltr"}>
                  <option value="" disabled>{t('payroll.selectCaisse')}</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.name}>{emp.name} ({t(`hr.roles.${emp.role}`, emp.role)})</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
              <input type="date" required value={transactionData.date} onChange={e => setTransactionData({...transactionData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.note')}</label>
              <input type="text" value={transactionData.note} onChange={e => setTransactionData({...transactionData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsTransactionModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">{t('common.cancel')}</button>
              <button type="submit" className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${transactionType === 'receipt' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                {editingTransactionId ? t('expenses.saveChanges') : t('common.success')}
              </button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title={t('suppliers.modal.scheduleTitle')}>
          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
               await window.api.addAgendaTask({
                 title: t('agenda.scheduledPaymentDesc', { name: currentSupplier.name, amount: scheduleData.amount, date: scheduleData.date }) || `تسديد دفعة لمورد: ${currentSupplier.name}`,
                 type: 'payment',
                 date: scheduleData.date,
                 time: scheduleData.time,
                 amount: Number(scheduleData.amount)
               });
               setIsScheduleModalOpen(false);
               showToast('success', t('common.success')); // 🔴 استبدال Alert
            } catch(error) { console.error(error); }
          }} className="space-y-4 text-start">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} ({t('currency')})</label>
              <input type="number" required value={scheduleData.amount} onChange={e => setScheduleData({...scheduleData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-start" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
              <input type="date" required value={scheduleData.date} onChange={e => setScheduleData({...scheduleData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-start" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.time')} ({t('common.optional')})</label>
              <input type="time" value={scheduleData.time} onChange={e => setScheduleData({...scheduleData, time: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-start" />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">{t('common.cancel')}</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">{t('suppliers.modal.confirmScheduleBtn')}</button>
            </div>
          </form>
        </Modal>

        {/* 🔴 استخدام النافذة السوداء المخصصة بدلاً من Modal العادية */}
        <ConfirmAlert 
          isOpen={!!transactionToDelete}
          onClose={() => setTransactionToDelete(null)}
          onConfirm={executeDeleteTransaction}
          title={t('suppliers.actions.delete')}
          message={t('suppliers.actions.deleteConfirm')}
          confirmText={t('suppliers.actions.confirmDeleteBtn')}
        />

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
      {renderToast()}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('suppliers.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('suppliers.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleImportExcel} 
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition-colors shadow-sm" 
            title={t('suppliers.actions.importExcelTooltip')}
          >
            <Upload size={18} /><span>{t('suppliers.actions.importExcel')}</span>
          </button>
          
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors shadow-sm"
          >
            <Plus size={18} /><span>{t('suppliers.addSupplier')}</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 flex items-center bg-slate-950/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={globalFilter ?? ''} onChange={e => setGlobalFilter(e.target.value)} placeholder={t('suppliers.searchPlaceholder')} className="w-full bg-slate-900 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner text-start" dir={isRTL ? "rtl" : "ltr"} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-slate-800 bg-slate-950/80">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className={`px-6 py-4 text-sm font-medium text-slate-400 whitespace-nowrap text-start`}>
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
                    <td key={cell.id} className="px-6 py-4 text-sm whitespace-nowrap text-start">
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

      <Modal isOpen={isAddModalOpen} onClose={() => { setIsAddModalOpen(false); setEditingSupplier(null); }} title={editingSupplier ? t('suppliers.messages.editTitle') : t('suppliers.addSupplier')}>
        <form onSubmit={handleSaveSupplier} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.nameLabel')}</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.phoneLabel')}</label>
            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.debtLabel')}</label>
            <input type="number" min="0" required value={formData.initialDebt} onChange={e => setFormData({...formData, initialDebt: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors font-medium">{t('suppliers.modal.cancelBtn')}</button>
            <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md">{t('suppliers.modal.saveBtn')}</button>
          </div>
        </form>
      </Modal>
    
      {/* 🔴 استخدام النافذة السوداء المخصصة بدلاً من Modal العادية */}
      <ConfirmAlert 
        isOpen={!!supplierToDelete}
        onClose={() => setSupplierToDelete(null)}
        onConfirm={executeDeleteSupplier}
        title={t('suppliers.actions.delete')}
        message={t('suppliers.actions.deleteConfirm')}
        confirmText={t('suppliers.actions.confirmDeleteBtn')}
      />

    </div>
  );
}
```

---

## `frontend\src\components\ui\ConfirmAlert.jsx`

```javascript
import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ConfirmAlert = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText, 
  cancelText,
  confirmColor = "bg-[#e11d48] hover:bg-[#be123c]" // أحمر كافتراضي (كما في الصورة)
}) => {
  const { t, i18n } = useTranslation();

  if (!isOpen) return null;

  return (
    // الخلفية الضبابية والطبقة العلوية
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm" 
      dir={i18n.dir()}
    >
      {/* جسم النافذة بألوان مطابقة للصورة */}
      <div className="bg-[#111827] border border-slate-700/50 rounded-xl shadow-2xl w-full max-w-[450px] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* شريط العنوان (Header) */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-700/50">
          <h2 className="text-white text-xl font-bold tracking-wide">
            {title || t('common.alert', 'تنبيه')}
          </h2>
          <button 
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg p-1.5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* محتوى الرسالة (Body) */}
        <div className="p-6 mt-2">
          <p className="text-white text-lg text-center leading-relaxed">
            {message}
          </p>
        </div>

        {/* الأزرار (Footer) */}
        {/* justify-end يجعل الأزرار على اليسار في العربية وعلى اليمين في الإنجليزية */}
        <div className="flex justify-end items-center gap-3 px-6 pb-6 mt-2">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-[#334155] hover:bg-[#475569] text-white rounded-lg font-medium transition-colors"
          >
            {cancelText || t('common.cancel', 'إلغاء')}
          </button>
          
          <button 
            onClick={onConfirm} 
            className={`px-6 py-2.5 text-white rounded-lg font-medium transition-colors ${confirmColor}`}
          >
            {confirmText || t('common.confirm', 'تأكيد')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
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

## `frontend\src\components\ui\PrintablePayrollReport.jsx`

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrintablePayrollReport({ data }) {
  const { t, i18n } = useTranslation();
  const storeName = localStorage.getItem('storeName') || 'GHERBI.AI';
  
  if (!data || !data.salaries) return null;

  return (
    <div 
      className="w-[210mm] mx-auto bg-white text-black p-10 font-sans text-sm shadow-2xl border border-gray-300 print:shadow-none print:border-none print:m-0 print:p-4" 
      dir={i18n.dir()}
    >
      
      <div className="flex justify-between items-center border-b-4 border-black pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-widest text-black mb-1">GHERBI.AI</h1>
          <p className="text-[10px] tracking-widest font-bold text-gray-700 uppercase">
            {t('print.systemProvider', 'SYSTEM PROVIDER')}
          </p>
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold uppercase text-gray-700 bg-gray-200 inline-block px-4 py-1 rounded">
            {t('payroll.reportTitle', 'تقرير الرواتب الشامل وحركة الحضور')}
          </h2>
          <p className="mt-2 font-bold text-gray-600">
            {t('print.issueDate', 'تاريخ الإصدار')}: {new Date().toLocaleDateString(i18n.language)}
          </p>
        </div>

        <div className="text-end">
          <p className="text-sm text-gray-500 font-bold mb-1">{t('print.validFor', 'صالح لـ')}:</p>
          <h3 className="text-2xl font-bold text-black">{storeName}</h3>
        </div>
      </div>

      {data.salaries.map((sal, index) => {
        const logs = sal.daily_logs || [];

        return (
          <div key={sal.id || index} className="mb-6 break-inside-avoid border-2 border-black p-3 rounded-lg">
            
            <div className="flex justify-between items-center bg-gray-100 p-2 border-b-2 border-black mb-3">
              <div>
                <span className="font-bold text-base">{t('hr.table.employee', 'الموظف')}: </span>
                <span className="text-lg font-extrabold">{sal.employee_name}</span>
              </div>
              <div className="text-end">
                <p className="font-bold text-xs">
                  {t('payroll.period', 'الفترة')}: <span className="font-normal">{sal.start_date} {t('common.to', 'إلى')} {sal.end_date}</span>
                </p>
                <p className="font-bold text-xs text-emerald-700 mt-1">
                  {t('payroll.netPayable', 'الصافي للدفع')}: <span className="text-base bg-emerald-100 px-2 rounded border border-emerald-300">{sal.net_salary.toLocaleString()} {t('currency', 'DA')}</span>
                </p>
              </div>
            </div>

            <table className="w-full text-center border-collapse border border-gray-400 text-xs font-bold mb-3">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-400 p-1.5">{t('payroll.totalHours', 'إجمالي الساعات')}</th>
                  <th className="border border-gray-400 p-1.5">{t('payroll.hourlyRate', 'سعر الساعة')}</th>
                  <th className="border border-gray-400 p-1.5 text-red-700">{t('payroll.deductions', 'الخصومات والسلف')}</th>
                  <th className="border border-gray-400 p-1.5">{t('payroll.grossSalary', 'الراتب الأساسي')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-1.5 text-blue-700">{sal.total_hours}</td>
                  <td className="border border-gray-400 p-1.5">{sal.hourly_rate} {t('currency', 'DA')}</td>
                  <td className="border border-gray-400 p-1.5 text-red-600">-{sal.total_advances} {t('currency', 'DA')}</td>
                  <td className="border border-gray-400 p-1.5">{sal.total_hours * sal.hourly_rate} {t('currency', 'DA')}</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-gray-50 border border-dashed border-gray-400 p-2 rounded">
              <p className="text-[10px] font-extrabold text-gray-700 mb-1.5">
                {t('payroll.dailyAttendanceDetail', 'تفاصيل الحضور والانصراف اليومي (دخول - خروج)')}:
              </p>
              <div className="flex flex-wrap gap-1.5" dir="ltr">
                {logs.length > 0 ? logs.map((log, i) => (
                  <span key={i} className="text-[9px] border border-gray-300 bg-white px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <span className="font-bold text-blue-800">{log.date ? log.date.slice(-5) : ''}</span>
                    <span className="text-gray-500">|</span>
                    {/* هنا تم إصلاح الأسماء الخاصة بوقت الدخول والخروج */}
                    <span className="text-emerald-700">{log.time_in || '--:--'}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-orange-600">{log.time_out || '--:--'}</span>
                  </span>
                )) : (
                  <span className="text-[9px] text-gray-500">
                    {t('payroll.noAttendanceLogs', 'لا توجد سجلات حضور لهذه الفترة.')}
                  </span>
                )}
              </div>
            </div>

          </div>
        );
      })}

      <div className="mt-12 text-center border-t-2 border-black pt-4">
        <div className="flex justify-around mb-8">
            <div>
                <p className="font-bold mb-4">{t('print.auditorSignature', 'توقيع المحاسب / المراجع')}</p>
                <p>_______________________</p>
            </div>
            <div>
                <p className="font-bold mb-4">{t('print.managerSignature', 'توقيع مدير المؤسسة / الختم')}</p>
                <p>_______________________</p>
            </div>
        </div>
        
        <p className="text-[10px] font-bold mt-8 uppercase text-gray-500 tracking-widest">
          Software Developed & Managed By: Gherbi Mohamed Cherif (GHERBI.AI)
        </p>
      </div>

    </div>
  );
}
```

---

## `frontend\src\components\ui\PrintablePayslip.jsx`

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrintablePayslip({ data }) {
  const { t, i18n } = useTranslation();
  
  // قراءة اسم المحل
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  if (!data) return null;

  const { employeeName, period, date, hours, rate, grossSalary, deductions, netSalary } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white text-black p-12 font-sans text-sm shadow-2xl border border-gray-300 print:shadow-none print:border-none print:m-0 print:p-0" dir={i18n.dir()}>
      
      {/* الترويسة المزدوجة */}
      <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-widest text-black">GHERBI.AI</h1>
          <p className="text-[11px] mt-2 tracking-widest font-bold text-gray-700">CODE • MULTIMEDIA • ALGO TRADING • AI SOLUTIONS</p>
        </div>
        
        <div className="text-end">
          <h2 className="text-2xl font-extrabold text-black mb-3">{currentStoreName}</h2>
          <div className="text-sm font-bold space-y-1 text-gray-600">
            <p>{t('print.date', 'التاريخ')}: {date}</p>
            <p>{t('print.period', 'فترة العمل')}: {period}</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8 uppercase border-2 border-black inline-block px-8 py-2 mx-auto flex w-max">
        {t('print.payslipTitle', 'كشف راتب')}
      </h2>

      <div className="mb-8 text-lg">
        <span className="font-bold">{t('print.employeeName', 'اسم الموظف')}:</span> 
        <span className="font-bold border-b-2 border-black pb-1 px-4 ms-2">{employeeName}</span>
      </div>

      <table className="w-full mb-8 border-collapse border-2 border-black text-base">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-2 border-black p-3 text-start">{t('print.description', 'البيان / ملاحظة')}</th>
            <th className="border-2 border-black p-3 text-center">{t('print.hours', 'الساعات')}</th>
            <th className="border-2 border-black p-3 text-center">{t('print.rate', 'الأجر / ساعة')}</th>
            <th className="border-2 border-black p-3 text-end">{t('print.amount', 'المبلغ الإجمالي')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 border-black p-3 font-bold">{t('print.grossSalary', 'الراتب الأساسي')}</td>
            <td className="border-2 border-black p-3 text-center">{hours}</td>
            <td className="border-2 border-black p-3 text-center">{rate} {t('currency', 'د.ج')}</td>
            <td className="border-2 border-black p-3 text-end font-bold">{grossSalary} {t('currency', 'د.ج')}</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold">{t('print.deductions', 'الخصومات (سلفيات)')}</td>
            <td className="border-2 border-black p-3 text-center">-</td>
            <td className="border-2 border-black p-3 text-center">-</td>
            <td className="border-2 border-black p-3 text-end font-bold">{deductions > 0 ? `-${deductions}` : '0'} {t('currency', 'د.ج')}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end mb-16">
        <div className="border-4 border-black p-4 w-1/2 flex justify-between items-center text-xl bg-gray-50">
          <span className="font-bold">{t('print.netSalary', 'الصافي للدفع')}:</span>
          <span className="font-extrabold">{netSalary} {t('currency', 'د.ج')}</span>
        </div>
      </div>

      <div className="flex justify-between items-end mt-20 px-10">
        <div className="text-center">
          <p className="font-bold mb-12 text-lg">{t('print.employeeSignature', 'توقيع الموظف')}</p>
          <p>_______________________</p>
        </div>
        <div className="text-center">
          <p className="font-bold mb-10 text-lg">{t('print.managerSignature', 'توقيع الإدارة')}</p>
          <p className="text-sm font-bold uppercase mb-2">Dev: Gherbi Mohamed Cherif</p>
          <p>_______________________</p>
        </div>
      </div>
    </div>
  );
}
```

---

## `frontend\src\components\ui\PrintableTicket.jsx`

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrintableTicket({ data }) {
  const { t, i18n } = useTranslation();
  
  // قراءة اسم المحل
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';
  
  if (!data) return null;

  const { type, item, supplierName } = data;
  const isReceipt = type === 'receipt';

  return (
    <div className="w-[80mm] mx-auto bg-white text-black p-4 font-sans text-sm shadow-2xl border border-gray-300 print:shadow-none print:border-none print:m-0" dir={i18n.dir()}>
      
      {/* الترويسة المزدوجة */}
      <div className="text-center border-b-2 border-black pb-4 mb-4 border-dashed">
        <h1 className="text-3xl font-extrabold tracking-widest text-black">
          GHERBI.AI
        </h1>
        <p className="text-[10px] mt-1 tracking-widest uppercase font-bold text-gray-600">
          Code • Multimedia • Algo
        </p>
        
        {/* اسم محل العميل */}
        <div className="mt-3 pt-3 border-t border-gray-300 border-dashed">
          <h2 className="text-xl font-bold text-black">{currentStoreName}</h2>
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-lg font-bold uppercase border border-black inline-block px-3 py-1">
          {isReceipt ? t('print.receiptTicket', 'وصل استلام') : t('print.paymentTicket', 'وصل تسديد')}
        </h2>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold">{t('print.date', 'التاريخ')}:</span>
          <span>{item.date}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold">{t('suppliers.modal.nameLabel', 'الاسم')}:</span>
          <span className="font-bold">{supplierName}</span>
        </div>
        {!isReceipt && item.caisse_source && (
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold">{t('payroll.caisse', 'الصندوق')}:</span>
            <span>{item.caisse_source}</span>
          </div>
        )}
      </div>

      <div className="border-t-2 border-b-2 border-black border-dashed py-4 my-4 text-center">
        <p className="text-sm font-bold uppercase mb-1">{t('print.amount', 'المبلغ')}</p>
        <p className="text-3xl font-extrabold">
          {item.amount.toLocaleString()} {t('currency', 'DA')}
        </p>
      </div>

      {item.note && (
        <div className="mb-6 text-center text-xs">
          <span className="font-bold">{t('print.description', 'ملاحظة')}: </span>
          {item.note}
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="font-bold mb-6 text-xs">{t('print.managerSignature', 'توقيع الإدارة')}</p>
        <p>_______________________</p>
        <p className="text-xs font-bold mt-2 uppercase">Dev: Gherbi Mohamed Cherif</p>
        <p className="text-[10px] mt-4 border-t border-black pt-2 border-dashed">
          {t('print.thankYou', 'شكراً لتعاملكم معنا')}
        </p>
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
    "success": "تمت العملية بنجاح",
    "error": "حدث خطأ غير متوقع",
    "cancel": "إلغاء",
    "confirm": "تأكيد",
    "alert": "تنبيه النظام",
    "noResults": "لا توجد نتائج",
    "optional": "اختياري",
    "networkError": "خطأ في الاتصال بالشبكة",
    "serverOnlyFeature": "هذه الميزة متاحة فقط في الخادم الرئيسي (حاسوب المدير).",
    "back": "رجوع",
    "to": "إلى"
  },
  "currency": "د.ج",
  "sidebar": {
    "dashboard": "لوحة القيادة",
    "suppliers": "الموردين والديون",
    "hr": "الموارد البشرية",
    "expenses": "المصاريف",
    "payroll": "الرواتب والسلف",
    "agenda": "الأجندة والمهام",
    "end_of_day": "إغلاق الوردية",
    "settings": "الإعدادات"
  },
  "dashboard": {
    "title": "لوحة القيادة",
    "subtitle": "نظرة عامة على النظام والمؤشرات المالية",
    "quickActionExpense": "إضافة مصروف",
    "kpi": {
      "totalDebts": "إجمالي الديون (للموردين)",
      "dueThisWeek": "مستحقات هذا الأسبوع",
      "activeEmployees": "العمال الحاضرين",
      "expenses": "المصاريف والسلفيات"
    },
    "charts": {
      "topCreditors": "أكبر 5 دائنين",
      "expensesDist": "توزيع المصاريف"
    },
    "lists": {
      "urgentAlerts": "تنبيهات الأجندة العاجلة",
      "recentAudit": "سجل المراقبة الأخير",
      "noAuditLogs": "لا توجد سجلات مراقبة حديثة"
    },
    "alerts": {
      "systemTitle": "تنبيهات النظام ⚠️",
      "urgentBody": "لديك {{count}} مهام مستحقة تحتاج إلى مراجعة",
      "noTasks": "لا توجد مهام عاجلة حالياً"
    }
  },
  "suppliers": {
    "title": "الموردين والديون",
    "subtitle": "إدارة حسابات الموردين والفواتير غير المدفوعة",
    "addSupplier": "مورد جديد",
    "searchPlaceholder": "ابحث عن مورد بالاسم أو رقم الهاتف...",
    "table": {
      "name": "اسم المورد",
      "phone": "رقم الهاتف",
      "totalDebt": "إجمالي الدين",
      "status": "الحالة",
      "actions": "الإجراءات"
    },
    "status": {
      "clear": "خالص (بدون دين)",
      "indebted": "مدين"
    },
    "actions": {
      "view": "عرض التفاصيل",
      "pay": "دفع",
      "edit": "تعديل",
      "delete": "حذف",
      "deleteConfirm": "هل أنت متأكد من حذف هذا السجل نهائياً؟",
      "confirmDeleteBtn": "تأكيد الحذف",
      "importExcel": "استيراد من إكسيل",
      "importExcelTooltip": "استيراد قائمة الموردين من ملف Excel",
      "importSuccess": "تم استيراد {{count}} مورد بنجاح",
      "importError": "فشل استيراد الملف"
    },
    "messages": {
      "editTitle": "تعديل بيانات المورد",
      "saveError": "حدث خطأ أثناء حفظ بيانات المورد",
      "deleteError": "لا يمكن حذف هذا المورد. تأكد من عدم وجود تعاملات مالية مرتبطة به.",
      "deleteProtected": "ممنوع: هذا المورد يمتلك سجلات دفع أو استلام مسجلة في النظام."
    },
    "details": {
      "receipts": "سجلات الاستلام (السلع)",
      "payments": "سجلات الدفع (التسديد)",
      "addReceipt": "إضافة استلام",
      "addPayment": "إضافة تسديد",
      "schedulePayment": "جدولة دفعة",
      "amount": "المبلغ",
      "date": "التاريخ",
      "time": "الوقت",
      "note": "ملاحظة / رقم الفاتورة",
      "caisse": "صندوق الدفع"
    },
    "modal": {
      "nameLabel": "الاسم الكامل",
      "phoneLabel": "رقم الهاتف",
      "debtLabel": "الدين الأولي",
      "cancelBtn": "إلغاء",
      "saveBtn": "حفظ المورد",
      "scheduleTitle": "جدولة دفعة قادمة",
      "confirmScheduleBtn": "تأكيد الجدولة"
    }
  },
  "hr": {
    "title": "الموارد البشرية",
    "subtitle": "إدارة الحضور والانصراف والعمال",
    "tabs": {
      "attendance": "الحضور",
      "employees": "العمال"
    },
    "scanner": {
      "title": "ساعة الدوام (دخول / خروج)",
      "placeholder": "امسح الباركود أو أدخل رمز PIN...",
      "submit": "تسجيل"
    },
    "kpi": {
      "present": "حاضر اليوم",
      "absent": "غائب",
      "late": "متأخر"
    },
    "table": {
      "nameWithRole": "الاسم والمنصب",
      "name": "اسم الموظف",
      "role": "المنصب",
      "timeIn": "وقت الدخول",
      "timeOut": "وقت الخروج",
      "status": "الحالة",
      "loading": "جاري التحميل...",
      "emptyRecord": "لا توجد سجلات حضور لهذا اليوم"
    },
    "status": {
      "present": "متواجد",
      "departed": "انصرف",
      "active": "نشط",
      "inactive": "معطل"
    },
    "roles": {
      "cashier": "بائع (كاشير)",
      "scale": "عامل ميزان",
      "stock": "ترتيبات (Stock)",
      "admin": "مدير عام"
    },
    "employees": {
      "addBtn": "إضافة موظف",
      "search": "بحث عن عامل...",
      "empty": "لا يوجد عمال مسجلين",
      "table": {
        "name": "الاسم الكامل",
        "role": "المنصب",
        "status": "الحالة",
        "actions": "الإجراءات"
      },
      "actions": {
        "edit": "تعديل",
        "delete": "حذف حساب الموظف"
      },
      "deleteConfirmMsg": "هل أنت متأكد من حذف الحساب الإداري للمستخدم:\n{{name}}؟",
      "softDeleted": "تم تعطيل الحساب بنجاح لحماية السجلات المتعلقة به."
    },
    "dialog": {
      "title": "إضافة موظف جديد",
      "editTitle": "تعديل موظف",
      "desc": "أدخل تفاصيل الموظف ورمز PIN السري.",
      "name": "الاسم الكامل",
      "namePlaceholder": "محمد أمين...",
      "role": "المنصب",
      "rolePlaceholder": "اختر منصباً",
      "pin": "رمز PIN",
      "cancel": "إلغاء",
      "save": "حفظ بيانات الموظف",
      "saveChanges": "حفظ التعديلات"
    },
    "attendanceLog": "سجل الحضور اليومي",
    "messages": {
      "checkIn": "تم تسجيل الدخول",
      "checkOut": "تم تسجيل الخروج",
      "error": "حدث خطأ غير متوقع"
    }
  },
  "expenses": {
    "title": "المصاريف والسلفيات",
    "subtitle": "إدارة وتتبع المصاريف اليومية والرواتب",
    "addExpense": "إضافة مصروف",
    "editExpense": "تعديل المصروف",
    "saveChanges": "حفظ التعديلات",
    "deleteConfirm": "هل أنت متأكد من حذف هذه المعاملة المالية؟",
    "cashierNotice": "أنت تشاهد المصاريف والدفعات التي خرجت من الصندوق الخاص بك ({{name}}) فقط عبر جميع الأيام.",
    "caisseSourceLabel": "مصدر الأموال (الصندوق)",
    "allCaisses": "كل الصناديق",
    "adminCaisse": "صندوق المدير (الرئيسي)",
    "cashierCaisse": "صندوق الكاشير: {{name}}",
    "myAdvance": "سلفتي الشخصية",
    "dateLabel": "التاريخ",
    "kpi": {
      "today": "مصاريف اليوم",
      "month": "إجمالي مصاريف الشهر"
    },
    "table": {
      "date": "التاريخ",
      "description": "البيان / الوصف",
      "category": "التصنيف",
      "amount": "المبلغ",
      "locked": "مقفلة (سجل آلي)"
    },
    "categories": {
      "utilities": "فواتير وخدمات",
      "maintenance": "صيانة وإصلاح",
      "supplies": "مستلزمات المتجر",
      "advance": "سلفة عامل",
      "supplier_payment": "تسديد مورد",
      "salaries": "رواتب العمال"
    },
    "prefixes": {
      "advance": "سلفة",
      "supplier": "تسديد"
    }
  },
  "payroll": {
    "title": "الرواتب والسلف",
    "subtitle": "إدارة أجور العمال، السلفيات، وحساب الرواتب",
    "tabs": {
      "calculator": "حاسبة الرواتب",
      "advances": "السلفيات",
      "salaries": "سجل الرواتب المدفوعة"
    },
    "calculator": "حاسبة الراتب للفترة المحددة",
    "selectEmployee": "اختر الموظف",
    "startDate": "من تاريخ",
    "endDate": "إلى تاريخ",
    "hourlyRate": "الأجر بالساعة",
    "calculateBtn": "حساب الراتب",
    "results": "نتيجة الحساب",
    "totalHours": "إجمالي الساعات",
    "grossSalary": "الراتب الأساسي",
    "deductions": "السلفيات المخصومة",
    "netSalary": "الصافي للدفع",
    "negativeSalaryError": "تنبيه: السلفيات تتجاوز الراتب المستحق!",
    "payBtn": "اعتماد وصرف الراتب",
    "rolloverBtn": "ترحيل الدين وصرف الراتب",
    "previewPayslip": "معاينة كشف الراتب",
    "printReport": "طباعة تقرير الرواتب",
    "noSalariesToPrint": "لا توجد رواتب مسجلة لطباعتها",
    "advancesTitle": "سجل السلفيات المقدمة",
    "addAdvance": "منح سلفة",
    "caisse": "صندوق الدفع",
    "selectCaisse": "-- اختر صندوق الدفع --",
    "amount": "مبلغ السلفة",
    "date": "تاريخ المنح",
    "note": "ملاحظات",
    "statusPending": "قيد الخصم",
    "statusPaid": "تم الخصم",
    "period": "الفترة",
    "rolloverNote": "ترحيل ديون سلفيات للفترة {{start}} إلى {{end}}",
    "expenseNote": "راتب الموظف {{name}} للفترة من {{start}} إلى {{end}}",
    "rolloverConfirm": "بما أن السلفيات تتجاوز الراتب المستحق، سيتم اعتبار الراتب 'صفر' وسيتم ترحيل المبلغ المتبقي كـ 'سلفة جديدة' على الموظف. هل تريد المتابعة؟",
    "standardConfirm": "هل أنت متأكد من صرف هذا الراتب؟ سيتم تسجيله كـ مصروف في النظام."
  },
  "pos": {
    "title": "نقطة البيع (POS)",
    "scanPlaceholder": "مرر الباركود أو ابحث عن منتج بالاسم...",
    "cart": "سلة المشتريات",
    "emptyCart": "السلة فارغة، ابدأ بمسح المنتجات",
    "total": "المجموع الكلي",
    "pay": "دفع وطباعة التذكرة"
  },
  "agenda": {
    "title": "الأجندة والمهام",
    "subtitle": "تنظيم المواعيد، الدفعات المستحقة، ومهام المتجر",
    "addTask": "إضافة مهمة",
    "deleteConfirm": "هل أنت متأكد من حذف هذه المهمة من الأجندة؟",
    "allDay": "طوال اليوم",
    "rescheduleTask": "تأجيل المهمة",
    "sections": {
      "today": "مهام اليوم",
      "upcoming": "المهام القادمة",
      "overdue": "مهام متأخرة"
    },
    "filters": {
      "all": "الكل",
      "pending": "قيد الانتظار",
      "completed": "مكتملة"
    },
    "types": {
      "delivery": "استلام سلع",
      "payment": "تسديد دفعة",
      "maintenance": "صيانة"
    },
    "modal": {
      "taskTitleLabel": "عنوان المهمة",
      "taskTypeLabel": "نوع المهمة",
      "dateLabel": "تاريخ المهمة",
      "timeLabel": "وقت المهمة",
      "cancelBtn": "إلغاء",
      "saveBtn": "حفظ المهمة"
    },
    "scheduledPaymentDesc": "تسديد دفعة لمورد: {{name}}"
  },
  "eod": {
    "title": "إغلاق الوردية",
    "open_shift_title": "فتح وردية جديدة",
    "open_shift_desc": "يرجى تحديد المبلغ المتوفر في الصندوق لفتح الوردية باسم:",
    "open_shift_btn": "فتح الوردية وبدء العمل",
    "opening_balance": "رصيد الافتتاح (الصندوق)",
    "active_shift": "الوردية النشطة الآن",
    "total_deducted": "المصاريف المسحوبة",
    "advances": "سلف العمال",
    "supplier_payments": "تسديد الموردين",
    "actual_cash": "المبلغ الفعلي في الصندوق الآن",
    "actualCashHint": "قم بعد النقود المتوفرة في الدرج وأدخل المجموع هنا",
    "notes": "ملاحظات إغلاق الوردية",
    "notesPlaceholder": "أدخل أي ملاحظات حول العجز أو الفائض إن وجد...",
    "today_sales": "مبيعات الوردية (المدخول)",
    "save_btn": "إغلاق الوردية وحفظ السجل",
    "confirmClose": "هل أنت متأكد من إنهاء الوردية وإغلاق الصندوق؟ لا يمكن التراجع عن هذه الخطوة."
  },
  "settings": {
    "title": "إعدادات النظام",
    "subtitle": "إدارة المستخدمين والنسخ الاحتياطي لقاعدة البيانات",
    "accessDenied": "ليس لديك صلاحية للوصول إلى هذه الصفحة",
    "newUser": "مستخدم جديد",
    "username": "اسم المستخدم",
    "password": "رمز المرور (PIN)",
    "role": "صلاحية الوصول",
    "addAccountBtn": "إنشاء حساب",
    "loading": "جاري تحميل البيانات...",
    "errorFillFields": "يرجى تعبئة جميع الحقول",
    "addError": "خطأ: قد يكون اسم المستخدم أو رمز المرور مستخدماً بالفعل.",
    "deleteAlert": "لا يمكنك حذف هذا الحساب (حساب الإدارة الرئيسي أو حسابك الشخصي).",
    "deleteError": "حدث خطأ أثناء حذف المستخدم.",
    "deleteTooltip": "حذف المستخدم",
    "deleteConfirm": "هل أنت متأكد من حذف حساب المستخدم ({{name}})؟",
    "noUsers": "لا يوجد مستخدمين لعرضهم",
    "table": {
      "username": "اسم المستخدم",
      "role": "الصلاحية",
      "actions": "الإجراءات"
    },
    "modal": {
      "title": "إعدادات المتجر",
      "storeNameLabel": "اسم المتجر (يظهر في الفواتير)",
      "storeNamePlaceholder": "أدخل اسم المتجر المعتمد...",
      "saveBtn": "حفظ التغييرات",
      "saveSuccess": "تم حفظ التغييرات بنجاح!"
    }
  },
  "database": {
    "title": "قاعدة البيانات",
    "backup": "نسخ احتياطي (Backup)",
    "backupDesc": "قم بحفظ نسخة من قاعدة البيانات وتقارير Excel لتأمين بياناتك.",
    "restore": "استعادة البيانات (Restore)",
    "restoreDesc": "استعادة النظام من ملف نسخة احتياطية سابق (.sqlite).",
    "messages": {
      "backupSuccess": "تم حفظ النسخة الاحتياطية بنجاح!",
      "restoreSuccess": "تمت استعادة البيانات بنجاح. سيتم إعادة تشغيل النظام لتطبيق التغييرات.",
      "error": "حدث خطأ أثناء العملية.",
      "restoreConfirm": "تحذير: استعادة النسخة الاحتياطية ستمسح جميع البيانات الحالية وتستبدلها بالبيانات القديمة! هل أنت متأكد؟"
    }
  },
  "print": {
    "printBtn": "طباعة المستند",
    "savePdfBtn": "تحميل PDF",
    "systemProvider": "مزود النظام",
    "issueDate": "تاريخ الإصدار",
    "validFor": "صالح لـ",
    "date": "التاريخ",
    "period": "فترة العمل",
    "payslipTitle": "كشف راتب",
    "employeeName": "اسم الموظف",
    "description": "البيان / ملاحظة",
    "hours": "الساعات",
    "rate": "الأجر / ساعة",
    "amount": "المبلغ الإجمالي",
    "grossSalary": "الراتب الأساسي",
    "deductions": "الخصومات (سلفيات)",
    "netSalary": "صافي الراتب المستحق",
    "auditorSignature": "توقيع المحاسب / المراجع",
    "managerSignature": "توقيع مدير المؤسسة / الختم",
    "employeeSignature": "توقيع الموظف بالاستلام"
  },
  "login": {
    "title": "تسجيل الدخول",
    "subtitle": "أدخل بياناتك للوصول إلى نظام إدارة نقطة البيع",
    "username": "اسم المستخدم",
    "password": "رمز المرور (PIN)",
    "submit": "تسجيل الدخول",
    "loading": "جاري التحقق...",
    "error": "اسم المستخدم أو رمز المرور غير صحيح.",
    "serverError": "لا يمكن الاتصال بالخادم الرئيسي."
  },
  "audit": {
    "actions": {
      "DELETE_EXPENSE": "حذف مصروف"
    },
    "details": {
      "DELETE_EXPENSE": "قام بحذف مصروف ({{desc}}) بقيمة {{amount}} د.ج"
    }
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
    "success": "Operation successful",
    "error": "An unexpected error occurred",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "alert": "System Alert",
    "noResults": "No results found",
    "optional": "Optional",
    "networkError": "Network connection error",
    "serverOnlyFeature": "This feature is only available on the main server.",
    "back": "Back",
    "to": "To"
  },
  "currency": "DA",
  "sidebar": {
    "dashboard": "Dashboard",
    "suppliers": "Suppliers & Debts",
    "hr": "HR & Staff",
    "expenses": "Expenses",
    "payroll": "Payroll & Advances",
    "agenda": "Agenda & Tasks",
    "end_of_day": "End of Day",
    "settings": "Settings"
  },
  "dashboard": {
    "title": "Dashboard",
    "subtitle": "System overview & financial metrics",
    "quickActionExpense": "Add Expense",
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
      "recentAudit": "Recent Audit Logs",
      "noAuditLogs": "No recent audit logs"
    },
    "alerts": {
      "systemTitle": "System Alerts ⚠️",
      "urgentBody": "You have {{count}} urgent tasks that need review",
      "noTasks": "No urgent tasks at the moment"
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
      "pay": "Make Payment",
      "edit": "Edit",
      "delete": "Delete",
      "deleteConfirm": "Are you sure you want to permanently delete this record?",
      "confirmDeleteBtn": "Confirm Deletion",
      "importExcel": "Import Excel",
      "importExcelTooltip": "Import suppliers list from Excel file",
      "importSuccess": "Successfully imported {{count}} suppliers",
      "importError": "Failed to import file"
    },
    "messages": {
      "editTitle": "Edit Supplier Details",
      "saveError": "An error occurred while saving supplier data",
      "deleteError": "Cannot delete this supplier. Ensure there are no linked transactions.",
      "deleteProtected": "Forbidden: This supplier has registered payment or receipt records in the system."
    },
    "details": {
      "receipts": "Receipt Records (Goods)",
      "payments": "Payment Records (Settlements)",
      "addReceipt": "Add Receipt",
      "addPayment": "Add Payment",
      "schedulePayment": "Schedule Payment",
      "amount": "Amount",
      "date": "Date",
      "time": "Time",
      "note": "Note / Invoice No.",
      "caisse": "Payment Source"
    },
    "modal": {
      "nameLabel": "Full Name",
      "phoneLabel": "Phone Number",
      "debtLabel": "Initial Debt",
      "cancelBtn": "Cancel",
      "saveBtn": "Save Supplier",
      "scheduleTitle": "Schedule Upcoming Payment",
      "confirmScheduleBtn": "Confirm Schedule"
    }
  },
  "hr": {
    "title": "HR & Staff",
    "subtitle": "Manage attendance, shifts, and employee records",
    "tabs": {
      "attendance": "Attendance",
      "employees": "Employees"
    },
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
      "nameWithRole": "Name & Role",
      "name": "Employee Name",
      "role": "Position",
      "timeIn": "Time In",
      "timeOut": "Time Out",
      "status": "Status",
      "loading": "Loading...",
      "emptyRecord": "No attendance records for today"
    },
    "status": {
      "present": "Present",
      "departed": "Departed",
      "active": "Active",
      "inactive": "Inactive"
    },
    "roles": {
      "cashier": "Cashier",
      "scale": "Scale Worker",
      "stock": "Stock Clerk",
      "admin": "General Manager"
    },
    "employees": {
      "addBtn": "Add Employee",
      "search": "Search for employee...",
      "empty": "No registered employees",
      "table": {
        "name": "Full Name",
        "role": "Position",
        "status": "Status",
        "actions": "Actions"
      },
      "actions": {
        "edit": "Edit",
        "delete": "Delete Account"
      },
      "deleteConfirmMsg": "Are you sure you want to delete the administrative account for:\n{{name}}?",
      "softDeleted": "Account successfully deactivated to protect related records."
    },
    "dialog": {
      "title": "Add New Employee",
      "editTitle": "Edit Employee",
      "desc": "Enter employee details and secret PIN code.",
      "name": "Full Name",
      "namePlaceholder": "John Doe...",
      "role": "Position",
      "rolePlaceholder": "Select a position",
      "pin": "PIN Code",
      "cancel": "Cancel",
      "save": "Save Details",
      "saveChanges": "Save Changes"
    },
    "attendanceLog": "Daily Attendance Log",
    "messages": {
      "checkIn": "Checked IN successfully",
      "checkOut": "Checked OUT successfully",
      "error": "An unexpected error occurred"
    }
  },
  "expenses": {
    "title": "Expenses & Advances",
    "subtitle": "Manage and track daily expenses and payroll",
    "addExpense": "Add Expense",
    "editExpense": "Edit Expense",
    "saveChanges": "Save Changes",
    "deleteConfirm": "Are you sure you want to delete this financial transaction?",
    "cashierNotice": "You are viewing only the expenses and payments made from your own register ({{name}}) across all days.",
    "caisseSourceLabel": "Fund Source (Register)",
    "allCaisses": "All Registers",
    "adminCaisse": "Main Admin Register",
    "cashierCaisse": "Cashier Register: {{name}}",
    "myAdvance": "My Personal Advance",
    "dateLabel": "Date",
    "kpi": {
      "today": "Today's Expenses",
      "month": "Total Monthly Expenses"
    },
    "table": {
      "date": "Date",
      "description": "Description",
      "category": "Category",
      "amount": "Amount",
      "locked": "Locked (Auto Record)"
    },
    "categories": {
      "utilities": "Bills & Services",
      "maintenance": "Maintenance & Repair",
      "supplies": "Store Supplies",
      "advance": "Employee Advance",
      "supplier_payment": "Supplier Payment",
      "salaries": "Employee Salaries"
    },
    "prefixes": {
      "advance": "Advance",
      "supplier": "Payment"
    }
  },
  "payroll": {
    "title": "Payroll & Advances",
    "subtitle": "Manage employee wages, advances, and payroll calculations",
    "tabs": {
      "calculator": "Payroll Calculator",
      "advances": "Advances",
      "salaries": "Paid Salaries Log"
    },
    "calculator": "Salary Calculator for Selected Period",
    "selectEmployee": "Select Employee",
    "startDate": "From Date",
    "endDate": "To Date",
    "hourlyRate": "Hourly Rate",
    "calculateBtn": "Calculate Salary",
    "results": "Calculation Results",
    "totalHours": "Total Hours",
    "grossSalary": "Gross Salary",
    "deductions": "Deducted Advances",
    "netSalary": "Net Payable",
    "negativeSalaryError": "Warning: Advances exceed earned salary!",
    "payBtn": "Approve & Pay Salary",
    "rolloverBtn": "Rollover Debt & Clear Salary",
    "previewPayslip": "Preview Payslip",
    "printReport": "Print Payroll Report",
    "noSalariesToPrint": "No registered salaries to print",
    "advancesTitle": "Issued Advances Log",
    "addAdvance": "Grant Advance",
    "caisse": "Payment Source",
    "selectCaisse": "-- Select Source --",
    "amount": "Advance Amount",
    "date": "Issue Date",
    "note": "Notes",
    "statusPending": "Pending Deduction",
    "statusPaid": "Deducted",
    "period": "Period",
    "rolloverNote": "Rollover of advance debts for period {{start}} to {{end}}",
    "expenseNote": "Salary for {{name}} ({{start}} to {{end}})",
    "rolloverConfirm": "Since advances exceed earned salary, the payable salary will be set to 'zero' and the remaining amount will be rolled over as a 'new advance'. Do you want to proceed?",
    "standardConfirm": "Are you sure you want to disburse this salary? It will be recorded as an expense in the system."
  },
  "pos": {
    "title": "Point of Sale (POS)",
    "scanPlaceholder": "Scan barcode or search for product by name...",
    "cart": "Shopping Cart",
    "emptyCart": "Cart is empty, start by scanning products",
    "total": "Total Amount",
    "pay": "Pay & Print Receipt"
  },
  "agenda": {
    "title": "Agenda & Tasks",
    "subtitle": "Organize appointments, due payments, and store tasks",
    "addTask": "Add Task",
    "deleteConfirm": "Are you sure you want to delete this task from the agenda?",
    "allDay": "All Day",
    "rescheduleTask": "Reschedule Task",
    "sections": {
      "today": "Today's Tasks",
      "upcoming": "Upcoming Tasks",
      "overdue": "Overdue Tasks"
    },
    "filters": {
      "all": "All",
      "pending": "Pending",
      "completed": "Completed"
    },
    "types": {
      "delivery": "Goods Delivery",
      "payment": "Payment Due",
      "maintenance": "Maintenance"
    },
    "modal": {
      "taskTitleLabel": "Task Title",
      "taskTypeLabel": "Task Type",
      "dateLabel": "Task Date",
      "timeLabel": "Task Time",
      "cancelBtn": "Cancel",
      "saveBtn": "Save Task"
    },
    "scheduledPaymentDesc": "Scheduled payment for supplier: {{name}}"
  },
  "eod": {
    "title": "End of Day",
    "open_shift_title": "Open New Shift",
    "open_shift_desc": "Please enter the available cash in register to open shift for:",
    "open_shift_btn": "Open Shift & Start Work",
    "opening_balance": "Opening Balance (Register)",
    "active_shift": "Currently Active Shift",
    "total_deducted": "Deducted Expenses",
    "advances": "Employee Advances",
    "supplier_payments": "Supplier Payments",
    "actual_cash": "Actual Cash in Register Now",
    "actualCashHint": "Count the available cash in the drawer and enter the total here",
    "notes": "Shift Closing Notes",
    "notesPlaceholder": "Enter any notes regarding shortage or surplus if applicable...",
    "today_sales": "Shift Sales (Revenue)",
    "save_btn": "Close Shift & Save Record",
    "confirmClose": "Are you sure you want to end the shift and close the register? This action cannot be undone."
  },
  "settings": {
    "title": "System Settings",
    "subtitle": "Manage users and database backups",
    "accessDenied": "You do not have permission to access this page",
    "newUser": "New User",
    "username": "Username",
    "password": "Password (PIN)",
    "role": "Access Role",
    "addAccountBtn": "Create Account",
    "loading": "Loading data...",
    "errorFillFields": "Please fill in all fields",
    "addError": "Error: Username or PIN might already be in use.",
    "deleteAlert": "You cannot delete this account (Main admin or your own account).",
    "deleteError": "An error occurred while deleting the user.",
    "deleteTooltip": "Delete User",
    "deleteConfirm": "Are you sure you want to delete the user account ({{name}})?",
    "noUsers": "No users to display",
    "table": {
      "username": "Username",
      "role": "Role",
      "actions": "Actions"
    },
    "modal": {
      "title": "Store Settings",
      "storeNameLabel": "Store Name (Appears on Invoices)",
      "storeNamePlaceholder": "Enter official store name...",
      "saveBtn": "Save Changes",
      "saveSuccess": "Changes saved successfully!"
    }
  },
  "database": {
    "title": "Database Management",
    "backup": "Backup",
    "backupDesc": "Save a copy of your database and Excel reports to secure your data.",
    "restore": "Restore",
    "restoreDesc": "Restore system from a previous backup file (.sqlite).",
    "messages": {
      "backupSuccess": "Backup saved successfully!",
      "restoreSuccess": "Data restored successfully. The system will restart to apply changes.",
      "error": "An error occurred during the operation.",
      "restoreConfirm": "WARNING: Restoring a backup will wipe all current data and replace it with the old data! Are you sure?"
    }
  },
  "print": {
    "printBtn": "Print Document",
    "savePdfBtn": "Download PDF",
    "systemProvider": "System Provider",
    "issueDate": "Issue Date",
    "validFor": "Valid For",
    "date": "Date",
    "period": "Work Period",
    "payslipTitle": "PAYSLIP",
    "employeeName": "Employee Name",
    "description": "Description / Note",
    "hours": "Hours",
    "rate": "Rate / Hour",
    "amount": "Total Amount",
    "grossSalary": "Gross Salary",
    "deductions": "Deductions (Advances)",
    "netSalary": "Net Payable Salary",
    "auditorSignature": "Auditor / Accountant Signature",
    "managerSignature": "Manager Signature / Stamp",
    "employeeSignature": "Employee Signature (Receipt)"
  },
  "login": {
    "title": "Login",
    "subtitle": "Enter your credentials to access the POS management system",
    "username": "Username",
    "password": "Password (PIN)",
    "submit": "Login",
    "loading": "Verifying...",
    "error": "Incorrect username or password.",
    "serverError": "Cannot connect to the main server."
  },
  "audit": {
    "actions": {
      "DELETE_EXPENSE": "Delete Expense"
    },
    "details": {
      "DELETE_EXPENSE": "Deleted expense ({{desc}}) amounting to {{amount}} DA"
    }
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

## `frontend\src\store\auditStore.js`

```javascript
import { create } from 'zustand';

const useAuditStore = create((set) => ({
  logs: [],
  isLoading: false,

  fetchLogs: async () => {
    set({ isLoading: true });
    try {
      if (window.api && window.api.getAuditLogs) {
        const data = await window.api.getAuditLogs();
        set({ logs: data || [], isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      set({ isLoading: false });
    }
  }
}));

export default useAuditStore;
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
 
  // أضف هذه الدوال داخل الـ store إذا لم تكن موجودة
  updateEmployee: async (id, updatedData) => {
    try {
      // نفترض أن لديك دالة في الـ backend باسم updateEmployee
      const success = await window.api.updateEmployee(id, updatedData);
      if (success) {
        set((state) => ({
          employees: state.employees.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp)),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating employee:", error);
      return false;
    }
  },

  deleteEmployee: async (id) => {
    try {
      // نفترض أن لديك دالة في الـ backend باسم deleteEmployee
      const success = await window.api.deleteEmployee(id);
      if (success) {
        set((state) => ({ employees: state.employees.filter((emp) => emp.id !== id) }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting employee:", error);
      return false;
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
  },
  
addEmployee: async (employeeData) => {
    try {
      if (window.api && window.api.addEmployee) {
        await window.api.addEmployee(employeeData);
        get().fetchEmployees(); // إعادة الجلب لتحديث القائمة
        return true; 
      }
      return false;
    } catch (error) {
      set({ error: error.message });
      return false; 
    }
  },

  // الدالة الجديدة للتعديل
  updateEmployee: async (id, employeeData) => {
    try {
      if (window.api && window.api.updateEmployee) {
        const res = await window.api.updateEmployee(id, employeeData);
        if (res.success) {
          get().fetchEmployees();
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  // الدالة الجديدة للحذف
  deleteEmployee: async (id) => {
    try {
      if (window.api && window.api.deleteEmployee) {
        const res = await window.api.deleteEmployee(id);
        if (res.success) {
          get().fetchEmployees();
          return true;
        }
      }
      return false;
    } catch (error) {
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
  

  updateSupplier: async (id, data) => {
    try {
      if (window.api && window.api.updateSupplier) {
        return await window.api.updateSupplier(id, data);
      }
    } catch (error) { return { success: false, message: error.message }; }
  },

  deleteSupplier: async (id) => {
    try {
      if (window.api && window.api.deleteSupplier) {
        return await window.api.deleteSupplier(id);
      }
    } catch (error) { return { success: false, message: error.message }; }
  },

  
  deleteReceipt: async (id, supplierId) => {
    try {
      if (window.api && window.api.deleteReceipt) {
        const res = await window.api.deleteReceipt(id);
        if (res && res.success) {
          await get().fetchSupplierDetails(supplierId);
          await get().fetchSuppliers();
        }
        return res;
      }
    } catch (error) { return { success: false, message: error.message }; }
  },

  deletePayment: async (id, supplierId) => {
    try {
      if (window.api && window.api.deletePayment) {
        const res = await window.api.deletePayment(id);
        if (res && res.success) {
          await get().fetchSupplierDetails(supplierId);
          await get().fetchSuppliers();
        }
        return res;
      }
    } catch (error) { return { success: false, message: error.message }; }
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

