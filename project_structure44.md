# Project Structure

```text
inventory-counting/
    ├── README.md
    ├── extract_code.py
    ├── package.json
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
    ├── project_structure23.md
    ├── project_structure24.md
    ├── project_structure25.md
    ├── project_structure26.md
    ├── project_structure27.md
    ├── project_structure28.md
    ├── project_structure29.md
    ├── project_structure30.md
    ├── project_structure31.md
    ├── project_structure32.md
    ├── project_structure33.md
    ├── project_structure34.md
    ├── project_structure35.md
    ├── project_structure36.md
    ├── project_structure37.md
    ├── project_structure38.md
    ├── project_structure39.md
    ├── project_structure4.md
    ├── project_structure40.md
    ├── project_structure41.md
    ├── project_structure42.md
    ├── project_structure43.md
    ├── project_structure44.md
    ├── project_structure5.md
    ├── project_structure6.md
    ├── project_structure7.md
    ├── project_structure8.md
    ├── project_structure9.md
├── POS-Client/
    ├── error.html
    ├── index.html
    ├── main.js
    ├── package.json
    ├── assets/
├── POS_Keygen/
    ├── keygen.js
├── backend/
    ├── .env
    ├── database.js
    ├── licenseManager.js
    ├── main.js
    ├── package.json
    ├── preload.js
    ├── project_structure39.md
    ├── splash.html
    ├── assets/
├── frontend/
    ├── .oxlintrc.json
    ├── App.jsx
    ├── README.md
    ├── index.css
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── project_structure28.md
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
            ├── ActivationScreen.jsx
            ├── DailyClosuresArchive.jsx
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
                ├── AuditLogs.jsx
                ├── Dashboard.jsx
                ├── Employees.jsx
                ├── Expenses.jsx
                ├── HR.jsx
                ├── Inventory.jsx
                ├── Login.jsx
                ├── POS.jsx
                ├── Payroll.jsx
                ├── PdfImporter.jsx
                ├── PrintPreview.jsx
                ├── StoreMap.jsx
                ├── Suppliers.jsx
            ├── ui/
                ├── ConfirmAlert.jsx
                ├── Modal.jsx
                ├── PrintablePayrollReport.jsx
                ├── PrintablePayslip.jsx
                ├── PrintableTicket.jsx
                ├── SystemClock.jsx
            ├── utils/
        ├── locales/
            ├── ar/
                ├── translation.json
            ├── en/
                ├── translation.json
            ├── fr/
                ├── translation.json
        ├── store/
            ├── attendanceStore.js
            ├── auditStore.js
            ├── authStore.js
            ├── employeeStore.js
            ├── expenseStore.js
            ├── payrollStore.js
            ├── supplierStore.js
├── release-builds/
    ├── Gherbi POS System Setup 1.0.0.exe.blockmap
    ├── builder-debug.yml
    ├── builder-effective-config.yaml
    ├── latest.yml
    ├── win-unpacked/
        ├── LICENSE.electron.txt
        ├── LICENSES.chromium.html
        ├── chrome_100_percent.pak
        ├── chrome_200_percent.pak
        ├── icudtl.dat
        ├── resources.pak
        ├── snapshot_blob.bin
        ├── v8_context_snapshot.bin
        ├── vk_swiftshader_icd.json
        ├── locales/
            ├── af.pak
            ├── am.pak
            ├── ar.pak
            ├── bg.pak
            ├── bn.pak
            ├── ca.pak
            ├── cs.pak
            ├── da.pak
            ├── de.pak
            ├── el.pak
            ├── en-GB.pak
            ├── en-US.pak
            ├── es-419.pak
            ├── es.pak
            ├── et.pak
            ├── fa.pak
            ├── fi.pak
            ├── fil.pak
            ├── fr.pak
            ├── gu.pak
            ├── he.pak
            ├── hi.pak
            ├── hr.pak
            ├── hu.pak
            ├── id.pak
            ├── it.pak
            ├── ja.pak
            ├── kn.pak
            ├── ko.pak
            ├── lt.pak
            ├── lv.pak
            ├── ml.pak
            ├── mr.pak
            ├── ms.pak
            ├── nb.pak
            ├── nl.pak
            ├── pl.pak
            ├── pt-BR.pak
            ├── pt-PT.pak
            ├── ro.pak
            ├── ru.pak
            ├── sk.pak
            ├── sl.pak
            ├── sr.pak
            ├── sv.pak
            ├── sw.pak
            ├── ta.pak
            ├── te.pak
            ├── th.pak
            ├── tr.pak
            ├── uk.pak
            ├── ur.pak
            ├── vi.pak
            ├── zh-CN.pak
            ├── zh-TW.pak
        ├── resources/
            ├── app-update.yml
            ├── app.asar
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

OUTPUT_FILE = "project_structure44.md"
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

## `package.json`

```json
{
  "name": "gherbi-pos",
  "version": "1.0.0",
  "description": "A professional system for managing sales and point-of-sale operations",
  "author": "Mohamed Cherif Gherbi",
  "main": "backend/main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --win"
  },
  "build": {
    "appId": "com.gherbiai.pos",
    "productName": "Gherbi POS System",
    "asar": true,
    "directories": {
      "output": "release-builds"
    },
    "win": {
      "target": "nsis"
      
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true
    },
    "files": [
      "backend/**/*",
      "frontend/dist/**/*",
      "package.json"
    ]
  },
  "devDependencies": {
    "electron": "^43.3.0",
    "electron-builder": "^26.15.3"
  }
}

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

## `project_structure44.md`

```markdown
# Project Structure

```text
inventory-counting/
    ├── README.md
    ├── extract_code.py
    ├── package.json
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
    ├── project_structure23.md
    ├── project_structure24.md
    ├── project_structure25.md
    ├── project_structure26.md
    ├── project_structure27.md
    ├── project_structure28.md
    ├── project_structure29.md
    ├── project_structure30.md
    ├── project_structure31.md
    ├── project_structure32.md
    ├── project_structure33.md
    ├── project_structure34.md
    ├── project_structure35.md
    ├── project_structure36.md
    ├── project_structure37.md
    ├── project_structure38.md
    ├── project_structure39.md
    ├── project_structure4.md
    ├── project_structure40.md
    ├── project_structure41.md
    ├── project_structure42.md
    ├── project_structure43.md
    ├── project_structure44.md
    ├── project_structure5.md
    ├── project_structure6.md
    ├── project_structure7.md
    ├── project_structure8.md
    ├── project_structure9.md
├── POS-Client/
    ├── error.html
    ├── index.html
    ├── main.js
    ├── package.json
    ├── assets/
├── POS_Keygen/
    ├── keygen.js
├── backend/
    ├── .env
    ├── database.js
    ├── licenseManager.js
    ├── main.js
    ├── package.json
    ├── preload.js
    ├── project_structure39.md
    ├── splash.html
    ├── assets/
├── frontend/
    ├── .oxlintrc.json
    ├── App.jsx
    ├── README.md
    ├── index.css
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── project_structure28.md
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
            ├── ActivationScreen.jsx
            ├── DailyClosuresArchive.jsx
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
                ├── AuditLogs.jsx
                ├── Dashboard.jsx
                ├── Employees.jsx
                ├── Expenses.jsx
                ├── HR.jsx
                ├── Inventory.jsx
                ├── Login.jsx
                ├── POS.jsx
                ├── Payroll.jsx
                ├── PdfImporter.jsx
                ├── PrintPreview.jsx
                ├── StoreMap.jsx
                ├── Suppliers.jsx
            ├── ui/
                ├── ConfirmAlert.jsx
                ├── Modal.jsx
                ├── PrintablePayrollReport.jsx
                ├── PrintablePayslip.jsx
                ├── PrintableTicket.jsx
                ├── SystemClock.jsx
            ├── utils/
        ├── locales/
            ├── ar/
                ├── translation.json
            ├── en/
                ├── translation.json
            ├── fr/
                ├── translation.json
        ├── store/
            ├── attendanceStore.js
            ├── auditStore.js
            ├── authStore.js
            ├── employeeStore.js
            ├── expenseStore.js
            ├── payrollStore.js
            ├── supplierStore.js
├── release-builds/
    ├── Gherbi POS System Setup 1.0.0.exe.blockmap
    ├── builder-debug.yml
    ├── builder-effective-config.yaml
    ├── latest.yml
    ├── win-unpacked/
        ├── LICENSE.electron.txt
        ├── LICENSES.chromium.html
        ├── chrome_100_percent.pak
        ├── chrome_200_percent.pak
        ├── icudtl.dat
        ├── resources.pak
        ├── snapshot_blob.bin
        ├── v8_context_snapshot.bin
        ├── vk_swiftshader_icd.json
        ├── locales/
            ├── af.pak
            ├── am.pak
            ├── ar.pak
            ├── bg.pak
            ├── bn.pak
            ├── ca.pak
            ├── cs.pak
            ├── da.pak
            ├── de.pak
            ├── el.pak
            ├── en-GB.pak
            ├── en-US.pak
            ├── es-419.pak
            ├── es.pak
            ├── et.pak
            ├── fa.pak
            ├── fi.pak
            ├── fil.pak
            ├── fr.pak
            ├── gu.pak
            ├── he.pak
            ├── hi.pak
            ├── hr.pak
            ├── hu.pak
            ├── id.pak
            ├── it.pak
            ├── ja.pak
            ├── kn.pak
            ├── ko.pak
            ├── lt.pak
            ├── lv.pak
            ├── ml.pak
            ├── mr.pak
            ├── ms.pak
            ├── nb.pak
            ├── nl.pak
            ├── pl.pak
            ├── pt-BR.pak
            ├── pt-PT.pak
            ├── ro.pak
            ├── ru.pak
            ├── sk.pak
            ├── sl.pak
            ├── sr.pak
            ├── sv.pak
            ├── sw.pak
            ├── ta.pak
            ├── te.pak
            ├── th.pak
            ├── tr.pak
            ├── uk.pak
            ├── ur.pak
            ├── vi.pak
            ├── zh-CN.pak
            ├── zh-TW.pak
        ├── resources/
            ├── app-update.yml
            ├── app.asar
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

OUTPUT_FILE = "project_structure44.md"
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

## `package.json`

```json
{
  "name": "gherbi-pos",
  "version": "1.0.0",
  "description": "A professional system for managing sales and point-of-sale operations",
  "author": "Mohamed Cherif Gherbi",
  "main": "backend/main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --win"
  },
  "build": {
    "appId": "com.gherbiai.pos",
    "productName": "Gherbi POS System",
    "asar": true,
    "directories": {
      "output": "release-builds"
    },
    "win": {
      "target": "nsis"
      
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true
    },
    "files": [
      "backend/**/*",
      "frontend/dist/**/*",
      "package.json"
    ]
  },
  "devDependencies": {
    "electron": "^43.3.0",
    "electron-builder": "^26.15.3"
  }
}

```

---

## `project_structure.md`

```markdown

```

---

## `backend\database.js`

```javascript
const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const ExcelJS = require('exceljs');
const dbPath = path.join(app.getPath('userData'), 'pos_manager8.db');
const db = new Database(dbPath);
const fs = require('fs');
db.pragma('journal_mode = WAL');

function initDatabase() {
  try {
    db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'superadmin')`).run();
    try { 
      db.prepare("UPDATE users SET role = 'superadmin' WHERE role = 'admin' OR username = 'admin'").run(); 
      db.prepare("UPDATE employees SET role = 'superadmin' WHERE role = 'admin' OR name = 'admin'").run(); 
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
    
    db.prepare(`CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, category TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT DEFAULT 'admin', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    try { db.prepare("ALTER TABLE expenses ADD COLUMN caisse_source TEXT DEFAULT 'admin'").run(); } catch(e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS agenda_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, type TEXT NOT NULL, task_date TEXT NOT NULL, task_time TEXT, status TEXT DEFAULT 'pending', amount REAL DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    try { db.prepare("ALTER TABLE agenda_tasks ADD COLUMN amount REAL DEFAULT 0").run(); } catch (e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS advances (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT, note TEXT, status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS salaries (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, total_hours REAL NOT NULL, hourly_rate REAL NOT NULL, total_advances REAL NOT NULL, net_salary REAL NOT NULL, payment_date TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS shifts (id INTEGER PRIMARY KEY AUTOINCREMENT, cashier_name TEXT NOT NULL, opening_balance REAL NOT NULL, start_time DATETIME DEFAULT CURRENT_TIMESTAMP, end_time DATETIME, actual_cash REAL, difference REAL, status TEXT DEFAULT 'open', note TEXT, archived INTEGER DEFAULT 0)`).run();
    try { db.prepare("ALTER TABLE shifts ADD COLUMN archived INTEGER DEFAULT 0").run(); } catch(e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, action TEXT NOT NULL, details TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS map_layout (id TEXT PRIMARY KEY, type TEXT, row INTEGER, col INTEGER, rotation INTEGER, name TEXT, capacity INTEGER)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS store_zones (id TEXT PRIMARY KEY, t_key TEXT NOT NULL, name TEXT NOT NULL)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS store_shelves (id TEXT PRIMARY KEY, zone_id TEXT NOT NULL, name TEXT NOT NULL, type TEXT DEFAULT 'shelf', capacity INTEGER DEFAULT 100)`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS mapped_products (barcode TEXT PRIMARY KEY, clean_name TEXT NOT NULL, dirty_names TEXT)`).run();
    
    // 🔴 1. بناء الجدول الجديد بدون القيد المزعج (بدون FOREIGN KEY للرفوف)
    db.prepare(`CREATE TABLE IF NOT EXISTS shelf_products (id INTEGER PRIMARY KEY AUTOINCREMENT, shelf_id TEXT NOT NULL, barcode TEXT NOT NULL, quantity REAL DEFAULT 0, expiry_date TEXT, FOREIGN KEY (barcode) REFERENCES mapped_products(barcode))`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS store_layouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, is_active INTEGER DEFAULT 0, grid_rows INTEGER DEFAULT 10, grid_cols INTEGER DEFAULT 14, items_json TEXT)`).run();
    

    // 🔴 جداول نظام الجرد (Inventory System)
    db.prepare(`CREATE TABLE IF NOT EXISTS inv_families (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS inv_types (id INTEGER PRIMARY KEY AUTOINCREMENT, family_id INTEGER NOT NULL, name TEXT NOT NULL, FOREIGN KEY (family_id) REFERENCES inv_families(id) ON DELETE CASCADE)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS inv_items (id INTEGER PRIMARY KEY AUTOINCREMENT, type_id INTEGER NOT NULL, name TEXT NOT NULL, pieces_per_box INTEGER DEFAULT 1, price REAL DEFAULT 0, system_qty REAL DEFAULT 0, FOREIGN KEY (type_id) REFERENCES inv_types(id) ON DELETE CASCADE)`).run();

    // 🔴 2. الترحيل الذكي: نتحقق إذا كان الجدول القديم مربوطاً، فنقوم بفك ارتباطه ونسخ بياناته
    try {
      const tableInfo = db.prepare("PRAGMA foreign_key_list(shelf_products)").all();
      const hasOldConstraint = tableInfo.some(fk => fk.table === 'store_shelves');
      if (hasOldConstraint) {
        db.prepare(`CREATE TABLE shelf_products_new (id INTEGER PRIMARY KEY AUTOINCREMENT, shelf_id TEXT NOT NULL, barcode TEXT NOT NULL, quantity REAL DEFAULT 0, expiry_date TEXT, FOREIGN KEY (barcode) REFERENCES mapped_products(barcode))`).run();
        db.prepare(`INSERT INTO shelf_products_new SELECT id, shelf_id, barcode, quantity, expiry_date FROM shelf_products`).run();
        db.prepare(`DROP TABLE shelf_products`).run();
        db.prepare(`ALTER TABLE shelf_products_new RENAME TO shelf_products`).run();
        console.log('✅ Migration: Unlinked old store_shelves from shelf_products successfully.');
      }
    } catch (e) {
      console.log('Migration note:', e.message);
    }

    db.prepare(`
      CREATE TABLE IF NOT EXISTS daily_closures (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        closure_date TEXT,
        total_opening REAL,
        total_actual REAL,
        total_sales REAL,
        closed_by TEXT
      )
    `).run();
   try { db.prepare("ALTER TABLE shifts ADD COLUMN daily_closure_id INTEGER").run(); } catch(e) {}
  } catch (error) { console.error('خطأ أثناء تهيئة قاعدة البيانات:', error); }
}
  
function logAudit(username, action, details) { 
  try { db.prepare("INSERT INTO audit_logs (username, action, details) VALUES (?, ?, ?)").run(username, action, details || ''); } catch (error) {} 
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
    if (existingUser || existingEmp) return { success: false, message: 'userExists' };
    
    const insertTx = db.transaction(() => {
      const userInfo = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(finalUsername, data.password, finalRole);
      db.prepare("INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)").run(finalUsername, finalRole, data.password);
      return userInfo.lastInsertRowid;
    });
    logAudit('Admin', 'ADD_USER', JSON.stringify({ username: finalUsername, role: finalRole }));
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
    logAudit('Admin', 'DELETE_USER', JSON.stringify({ username: user.username }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getEmployees() { return db.prepare("SELECT * FROM employees WHERE status = 'active' OR status IS NULL ORDER BY id DESC").all(); }
// دالة لجلب السلع المخزنة في رف معين بناءً على الـ ID الخاص به
function getShelfProducts(shelfId) {
  try {
    const products = db.prepare(`
      SELECT sp.id, sp.barcode, sp.quantity, mp.clean_name 
      FROM shelf_products sp 
      JOIN mapped_products mp ON sp.barcode = mp.barcode 
      WHERE sp.shelf_id = ?
    `).all(shelfId.toString());
    
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
function addEmployee(data) {
  try {
    const exist = db.prepare("SELECT * FROM employees WHERE pin_code = ? OR name = ?").get(data.pinCode, data.name);
    if (exist) return { error: 'employeeExists' };
    const insertTx = db.transaction(() => {
      const info = db.prepare(`INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)`).run(data.name, data.role, data.pinCode);
      try { db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(data.name, data.pinCode, data.role); } catch(e) {}
      return info.lastInsertRowid;
    });
    logAudit('Admin', 'ADD_EMPLOYEE', JSON.stringify({ name: data.name, role: data.role }));
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
      if (exist) return { error: 'employeeExists' };
      db.prepare("UPDATE employees SET name = ?, role = ?, pin_code = ? WHERE id = ?").run(finalName, finalRole, data.pinCode, id);
      db.prepare("UPDATE users SET username = ?, password = ?, role = ? WHERE username = ?").run(finalName, data.pinCode, finalRole, oldEmp.name);
      logAudit('Admin', 'UPDATE_EMPLOYEE', JSON.stringify({ name: finalName, role: finalRole }));
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
    
    logAudit('Admin', 'DELETE_EMPLOYEE', JSON.stringify({ name: emp.name }));

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

// ==========================================
// دوال إدارة المخططات المتعددة (Tabs)
// ==========================================
function getStoreLayouts() {
  try {
    const layouts = db.prepare('SELECT * FROM store_layouts ORDER BY id ASC').all();
    return { success: true, data: layouts };
  } catch (error) { return { success: false, error: error.message }; }
}

function saveStoreLayout(data) {
  try {
    const itemsJson = JSON.stringify(data.items || []);
    if (data.id) {
      db.prepare('UPDATE store_layouts SET name = ?, grid_rows = ?, grid_cols = ?, items_json = ? WHERE id = ?')
        .run(data.name, data.gridRows, data.gridCols, itemsJson, data.id);
      logAudit('Admin', 'UPDATE_LAYOUT', `تم تحديث المخطط: ${data.name}`);
      return { success: true, id: data.id };
    } else {
      // إذا كان هذا أول مخطط، نجعله مفعل (is_active = 1) تلقائياً
      const count = db.prepare('SELECT COUNT(*) as c FROM store_layouts').get().c;
      const isActive = count === 0 ? 1 : 0;
      
      const info = db.prepare('INSERT INTO store_layouts (name, is_active, grid_rows, grid_cols, items_json) VALUES (?, ?, ?, ?, ?)')
        .run(data.name, isActive, data.gridRows, data.gridCols, itemsJson);
      logAudit('Admin', 'CREATE_LAYOUT', `تم إنشاء مخطط جديد: ${data.name}`);
      return { success: true, id: info.lastInsertRowid };
    }
  } catch (error) { return { success: false, error: error.message }; }
}


function deleteStoreLayout(id) {
  try {
    db.prepare('DELETE FROM store_layouts WHERE id = ?').run(id);
    logAudit('Admin', 'DELETE_LAYOUT', `تم حذف المخطط (ID: ${id})`);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}



// ==========================================
// 🔴 دوال نظام الجرد (Inventory System)
// ==========================================

function getInventoryTree() {
  try {
    const families = db.prepare("SELECT * FROM inv_families ORDER BY id DESC").all();
    const types = db.prepare("SELECT * FROM inv_types ORDER BY id DESC").all();
    const items = db.prepare("SELECT * FROM inv_items ORDER BY id DESC").all();

    const tree = families.map(f => {
      const fTypes = types.filter(t => t.family_id === f.id).map(t => {
        const tItems = items.filter(i => i.type_id === t.id);
        return { ...t, items: tItems };
      });
      return { ...f, types: fTypes };
    });
    return { success: true, data: tree };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function addInvFamily(name) {
  try {
    const info = db.prepare("INSERT INTO inv_families (name) VALUES (?)").run(name);
    logAudit('Admin', 'ADD_INV_FAMILY', JSON.stringify({ name }));
    return { success: true, id: info.lastInsertRowid };
  } catch (error) { return { success: false, error: error.message }; }
}

function deleteInvFamily(id) {
  try {
    const types = db.prepare("SELECT id FROM inv_types WHERE family_id = ?").all(id);
    types.forEach(t => db.prepare("DELETE FROM inv_items WHERE type_id = ?").run(t.id));
    db.prepare("DELETE FROM inv_types WHERE family_id = ?").run(id);
    db.prepare("DELETE FROM inv_families WHERE id = ?").run(id);
    logAudit('Admin', 'DELETE_INV_FAMILY', JSON.stringify({ id }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function addInvType(familyId, name) {
  try {
    const info = db.prepare("INSERT INTO inv_types (family_id, name) VALUES (?, ?)").run(familyId, name);
    logAudit('Admin', 'ADD_INV_TYPE', JSON.stringify({ familyId, name }));
    return { success: true, id: info.lastInsertRowid };
  } catch (error) { return { success: false, error: error.message }; }
}

function deleteInvType(id) {
  try {
    db.prepare("DELETE FROM inv_items WHERE type_id = ?").run(id);
    db.prepare("DELETE FROM inv_types WHERE id = ?").run(id);
    logAudit('Admin', 'DELETE_INV_TYPE', JSON.stringify({ id }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function addInvItem(data) {
  try {
    const info = db.prepare("INSERT INTO inv_items (type_id, name, pieces_per_box, price, system_qty) VALUES (?, ?, ?, ?, ?)").run(data.typeId, data.name, data.piecesPerBox || 1, data.price || 0, data.systemQty || 0);
    logAudit('Admin', 'ADD_INV_ITEM', JSON.stringify({ name: data.name }));
    return { success: true, id: info.lastInsertRowid };
  } catch (error) { return { success: false, error: error.message }; }
}

function updateInvItem(id, data) {
  try {
    db.prepare("UPDATE inv_items SET name = ?, pieces_per_box = ?, price = ?, system_qty = ? WHERE id = ?").run(data.name, data.piecesPerBox, data.price, data.systemQty, id);
    logAudit('Admin', 'UPDATE_INV_ITEM', JSON.stringify({ id, name: data.name }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function deleteInvItem(id) {
  try {
    db.prepare("DELETE FROM inv_items WHERE id = ?").run(id);
    logAudit('Admin', 'DELETE_INV_ITEM', JSON.stringify({ id }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}


function activateStoreLayout(id) {
  try {
    db.transaction(() => {
      db.prepare('UPDATE store_layouts SET is_active = 0').run();
      db.prepare('UPDATE store_layouts SET is_active = 1 WHERE id = ?').run(id);
    })();
    logAudit('Admin', 'ACTIVATE_LAYOUT', `تم تفعيل المخطط (ID: ${id})`);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function addExpense(expense) { 
  const stmt = db.prepare('INSERT INTO expenses (description, category, amount, date, caisse_source) VALUES (?, ?, ?, ?, ?)'); 
  const date = expense.date || new Date().toISOString().split('T')[0]; 
  const caisse = expense.caisseSource || 'admin';
  const info = stmt.run(expense.description, expense.category, expense.amount, date, caisse); 
  logAudit(caisse, 'ADD_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount }));
  return { success: true, id: info.lastInsertRowid }; 
}

function openShift(data) { 
  const activeShift = db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(data.cashierName); 
  if (activeShift) return { success: false, message: 'shiftAlreadyOpen' }; 
  const info = db.prepare('INSERT INTO shifts (cashier_name, opening_balance, archived) VALUES (?, ?, 0)').run(data.cashierName, data.openingBalance); 
  logAudit(data.cashierName, 'OPEN_SHIFT', JSON.stringify({ opening: data.openingBalance }));
  return { success: true, shiftId: info.lastInsertRowid }; 
}

function getActiveShift(cashierName) { 
  return db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(cashierName); 
}

function closeShift(data) { 
  try {
    const endTime = new Date().toISOString(); 
    db.prepare(`UPDATE shifts SET end_time = ?, actual_cash = ?, difference = ?, status = 'closed', note = ? WHERE id = ?`)
      .run(endTime, data.actualCash, data.difference, data.note, data.shiftId); 
    
    const shiftInfo = db.prepare("SELECT cashier_name FROM shifts WHERE id = ?").get(data.shiftId);
    logAudit(shiftInfo?.cashier_name || 'System', 'CLOSE_SHIFT', JSON.stringify({ sales: data.difference, actual: data.actualCash }));
    return { success: true }; 
  } catch (error) { 
    return { success: false, error: error.message }; 
  }
}

function getShiftSummary(cashierName, providedStartTime) { 
  try { 
    // 🔥 الحل الجذري: تجاهل التوقيت القادم من الواجهة لتفادي مشكلة (Timezone)
    // وجلب التوقيت الخام (UTC) مباشرة من الوردية المفتوحة في قاعدة البيانات
    let actualStartTime = providedStartTime;
    const activeShift = db.prepare("SELECT start_time FROM shifts WHERE cashier_name = ? AND status = 'open'").get(cashierName);
    if (activeShift) {
       actualStartTime = activeShift.start_time;
    }

    let paymentsRow, advancesRow, expensesRow; 
    if (cashierName === 'المدير العام' || cashierName === 'Super Admin' || cashierName === 'admin') { 
      expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ?").get(actualStartTime); 
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ?").get(actualStartTime); 
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ?").get(actualStartTime); 
    } else { 
      expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ?").get(cashierName, actualStartTime); 
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ?").get(cashierName, actualStartTime); 
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ?").get(cashierName, actualStartTime); 
    } 
    return { 
      success: true, 
      data: { 
        expenses: expensesRow.total || 0, 
        supplierPayments: paymentsRow.total || 0, 
        advances: advancesRow.total || 0, 
        totalOut: (expensesRow.total || 0) + (paymentsRow.total || 0) + (advancesRow.total || 0) 
      } 
    }; 
  } catch (error) { 
    return { success: false, error: error.message }; 
  } 
}
async function generateExcelBackup(outputPath) { const workbook = new ExcelJS.Workbook(); await workbook.xlsx.writeFile(outputPath); }

function updateExpense(id, expense) { 
  try {
    const result = db.prepare('UPDATE expenses SET description = ?, category = ?, amount = ?, date = ?, caisse_source = ? WHERE id = ?').run(expense.description, expense.category, expense.amount, expense.date, expense.caisseSource, id);
    logAudit(expense.caisseSource || 'Admin', 'UPDATE_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount }));
    return { success: result.changes > 0 };
  } catch (error) { return { success: false, error: error.message }; }
}

function updateAdvance(id, advanceData) {
  try {
    db.prepare('UPDATE advances SET amount = ?, date = ?, note = ?, caisse_source = ? WHERE id = ?').run(advanceData.amount, advanceData.date, advanceData.note, advanceData.caisseSource, id);
    logAudit(advanceData.caisseSource || 'Admin', 'UPDATE_ADVANCE', JSON.stringify({ amount: advanceData.amount }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function deleteAdvance(id) {
  try {
    const advance = db.prepare('SELECT * FROM advances WHERE id = ?').get(id);
    if (!advance) return { success: false, error: 'advanceNotFound' }; 
    if (advance.status === 'paid') return { success: false, error: 'cannotDeletePaid' }; 
    db.prepare('DELETE FROM advances WHERE id = ?').run(id);
    logAudit('Admin', 'DELETE_ADVANCE', JSON.stringify({ id }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function verifyLogin(username, password) { 
  try { 
    // ☢️ التكتيك النووي الناجح: فحص تاريخ ملف قاعدة البيانات من الويندوز مباشرة
    if (fs.existsSync(dbPath)) {
      const dbStats = fs.statSync(dbPath);
      const lastModifiedTime = dbStats.mtime.getTime(); // متى تم حفظ آخر شيء في الملف
      const currentTime = Date.now(); // وقت الحاسوب الآن
      
      // إذا كان وقت الحاسوب الحالي أقدم من آخر تعديل للملف (بفارق دقيقتين لتجنب الحساسية)
      if (currentTime < (lastModifiedTime - 120000)) {
         const d = new Date(lastModifiedTime);
         const pad = (n) => n.toString().padStart(2, '0');
         const formattedDate = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
         
         return { 
           success: false, 
           message: 'timeError',
           lastDate: formattedDate 
         };
      }
    }

    // إكمال الدخول العادي
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password); 
    if (user) {
      logAudit(user.username, 'LOGIN', JSON.stringify({ role: user.role }));
      return { success: true, user: { id: user.id, username: user.username, role: user.role } }; 
    }
    return { success: false, message: 'invalidCredentials' }; 
  } catch (error) { 
    return { success: false, message: error.message }; 
  } 
}


function handlePinEntry(pinCode) { 
  const employee = db.prepare("SELECT * FROM employees WHERE pin_code = ? AND status = 'active'").get(pinCode); 
  if (!employee) return { success: false, message: 'invalidPinOrInactive' }; 
  const today = new Date().toISOString().split('T')[0]; 
  const now = new Date().toLocaleTimeString('en-US', { hour12: false }); 
  const record = db.prepare("SELECT * FROM attendance WHERE employee_id = ? AND date = ?").get(employee.id, today); 
  
  if (!record) { 
    db.prepare("INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)").run(employee.id, today, now); 
    logAudit(employee.name, 'CHECK_IN', JSON.stringify({ time: now }));
    return { success: true, action: 'check_in', employeeName: employee.name, time: now }; 
  } else if (!record.time_out) { 
    db.prepare("UPDATE attendance SET time_out = ? WHERE id = ?").run(now, record.id); 
    logAudit(employee.name, 'CHECK_OUT', JSON.stringify({ time: now }));
    return { success: true, action: 'check_out', employeeName: employee.name, time: now }; 
  } else { 
    return { success: false, message: 'alreadyCompletedShift', employeeName: employee.name }; 
  } 
}

function updateAttendanceRecord(id, timeIn, timeOut) {
  try {
    const record = db.prepare("SELECT * FROM attendance WHERE id = ?").get(id);
    if (!record) return { success: false, error: 'Record not found' };
    const outVal = (timeOut && timeOut.trim() !== '') ? timeOut : null;
    db.prepare("UPDATE attendance SET time_in = ?, time_out = ? WHERE id = ?").run(timeIn, outVal, id);
    logAudit('Admin', 'UPDATE_ATTENDANCE', JSON.stringify({ id, timeIn, timeOut: outVal }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getTodayAttendance(date) { return db.prepare(`SELECT a.*, e.name as employee_name, e.role FROM attendance a JOIN employees e ON a.employee_id = e.id WHERE a.date = ? ORDER BY a.time_in DESC`).all(date); }
function getSuppliers() { return db.prepare("SELECT * FROM suppliers ORDER BY id DESC").all(); }

function addSupplier(supplierData) { 
  const status = supplierData.initialDebt > 0 ? 'indebted' : 'clear'; 
  const info = db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`).run(supplierData.name, supplierData.phone, supplierData.initialDebt, supplierData.initialDebt, status); 
  logAudit('Admin', 'ADD_SUPPLIER', JSON.stringify({ name: supplierData.name, debt: supplierData.initialDebt }));
  return db.prepare("SELECT * FROM suppliers WHERE id = ?").get(info.lastInsertRowid); 
}

function getSupplierDetails(supplierId) { const supplier = db.prepare('SELECT * FROM suppliers WHERE id = ?').get(supplierId); if (!supplier) return null; const receipts = db.prepare('SELECT * FROM receipts WHERE supplier_id = ? ORDER BY date DESC').all(supplierId); const payments = db.prepare('SELECT * FROM payments WHERE supplier_id = ? ORDER BY date DESC').all(supplierId); return { ...supplier, receipts, payments }; }

const updateReceipt = db.transaction((id, data) => { const old = db.prepare('SELECT * FROM receipts WHERE id = ?').get(id); if(!old) return { success: false, error: 'Not found' }; const diff = Number(data.amount) - old.amount; db.prepare('UPDATE receipts SET amount = ?, date = ?, note = ? WHERE id = ?').run(Number(data.amount), data.date, data.note, id); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = CASE WHEN (total_debt + ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, old.supplier_id); logAudit('Admin', 'UPDATE_RECEIPT', JSON.stringify({ amount: data.amount })); return { success: true }; });
const updatePayment = db.transaction((id, data) => { const old = db.prepare('SELECT * FROM payments WHERE id = ?').get(id); if(!old) return { success: false, error: 'Not found' }; const diff = Number(data.amount) - old.amount; db.prepare('UPDATE payments SET amount = ?, date = ?, note = ? WHERE id = ?').run(Number(data.amount), data.date, data.note, id); db.prepare("UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, old.supplier_id); logAudit('Admin', 'UPDATE_PAYMENT', JSON.stringify({ amount: data.amount })); return { success: true }; });

function updateSupplier(id, data) { try { const old = db.prepare('SELECT initial_debt, total_debt FROM suppliers WHERE id = ?').get(id); if (!old) return { success: false, error: 'Not found' }; const diff = Number(data.initialDebt) - old.initial_debt; db.prepare('UPDATE suppliers SET name = ?, phone = ?, initial_debt = ? WHERE id = ?').run(data.name, data.phone, data.initialDebt, id); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = CASE WHEN (total_debt + ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, id); logAudit('Admin', 'UPDATE_SUPPLIER', JSON.stringify({ name: data.name })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteSupplier(id) { try { const receipts = db.prepare("SELECT COUNT(*) as c FROM receipts WHERE supplier_id = ?").get(id).c; const payments = db.prepare("SELECT COUNT(*) as c FROM payments WHERE supplier_id = ?").get(id).c; if (receipts > 0 || payments > 0) return { success: false, errorKey: 'deleteProtected' }; db.prepare('DELETE FROM suppliers WHERE id = ?').run(id); logAudit('Admin', 'DELETE_SUPPLIER', JSON.stringify({ id })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteReceipt(id) { try { const receipt = db.prepare('SELECT amount, supplier_id FROM receipts WHERE id = ?').get(id); if (!receipt) return { success: false, error: 'Receipt not found' }; const transaction = db.transaction(() => { db.prepare('UPDATE suppliers SET total_debt = total_debt - ? WHERE id = ?').run(receipt.amount, receipt.supplier_id); db.prepare("UPDATE suppliers SET status = CASE WHEN total_debt <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(receipt.supplier_id); db.prepare('DELETE FROM receipts WHERE id = ?').run(id); }); transaction(); logAudit('Admin', 'DELETE_RECEIPT', JSON.stringify({ id })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deletePayment(id) { try { const payment = db.prepare('SELECT amount, supplier_id FROM payments WHERE id = ?').get(id); if (!payment) return { success: false, error: 'Payment not found' }; const transaction = db.transaction(() => { db.prepare('UPDATE suppliers SET total_debt = total_debt + ? WHERE id = ?').run(payment.amount, payment.supplier_id); db.prepare("UPDATE suppliers SET status = CASE WHEN total_debt <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(payment.supplier_id); db.prepare('DELETE FROM payments WHERE id = ?').run(id); }); transaction(); logAudit('Admin', 'DELETE_PAYMENT', JSON.stringify({ id })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteAgendaTask(id) { db.prepare("DELETE FROM agenda_tasks WHERE id = ?").run(id); logAudit('Admin', 'DELETE_TASK', JSON.stringify({ id })); return { success: true }; }
function rescheduleAgendaTask(id, newDate) { db.prepare("UPDATE agenda_tasks SET task_date = ? WHERE id = ?").run(newDate, id); logAudit('Admin', 'RESCHEDULE_TASK', JSON.stringify({ newDate })); return { success: true }; }

const addReceipt = db.transaction((data) => { const supplierId = Number(data.supplierId); const amount = Number(data.amount) || 0; const date = data.date || new Date().toISOString().split('T')[0]; const info = db.prepare('INSERT INTO receipts (supplier_id, amount, date, note) VALUES (?, ?, ?, ?)').run(supplierId, amount, date, data.note || ''); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = 'indebted' WHERE id = ?").run(amount, supplierId); logAudit('Admin', 'ADD_RECEIPT', JSON.stringify({ amount: amount })); return info.lastInsertRowid; });
const addPayment = db.transaction((data) => { const info = db.prepare('INSERT INTO payments (supplier_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.supplierId, data.amount, data.date, data.caisseSource || 'admin', data.note); db.prepare(`UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?`).run(data.amount, data.amount, data.supplierId); logAudit(data.caisseSource || 'Admin', 'ADD_PAYMENT', JSON.stringify({ amount: data.amount })); return info.lastInsertRowid; });

function getAdvances(employeeId) { if (employeeId) return db.prepare("SELECT * FROM advances WHERE employee_id = ? ORDER BY date DESC").all(employeeId); return db.prepare("SELECT a.*, e.name as employee_name FROM advances a JOIN employees e ON a.employee_id = e.id ORDER BY a.date DESC").all(); }
function addAdvance(data) { const info = db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.employeeId, data.amount, data.date, data.caisseSource || 'admin', data.note || ''); logAudit(data.caisseSource || 'Admin', 'ADD_ADVANCE', JSON.stringify({ amount: data.amount })); return { success: true, id: info.lastInsertRowid }; }


function calculateEmployeePayroll(employeeId, startDate, endDate, hourlyRate) { 
  const overlap = db.prepare(`SELECT start_date, end_date FROM salaries WHERE employee_id = ? AND start_date <= ? AND end_date >= ?`).get(employeeId, endDate, startDate);
  if (overlap) {
     // 🔴 نُرجع البيانات فقط لكي تترجمها الواجهة الأمامية
     return { isAlreadyPaid: true, overlapStart: overlap.start_date, overlapEnd: overlap.end_date };
  }

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
  const pendingAdvances = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE employee_id = ? AND status = 'pending'`).get(employeeId).total || 0; 
  const grossSalary = totalHours * hourlyRate; 
  const netSalary = grossSalary - pendingAdvances; 
  return { employeeId, startDate, endDate, totalHours: Number(totalHours.toFixed(2)), hourlyRate, grossSalary: Number(grossSalary.toFixed(2)), totalAdvances: pendingAdvances, netSalary: Number(netSalary.toFixed(2)) }; 
}


const paySalary = db.transaction((data) => { 
  try { 
    const empId = Number(data.employeeId); const pDate = data.date || new Date().toISOString().split('T')[0]; 
    db.prepare(`INSERT INTO salaries (employee_id, start_date, end_date, total_hours, hourly_rate, total_advances, net_salary, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(empId, data.startDate || '', data.endDate || '', Number(data.totalHours) || 0, Number(data.hourlyRate) || 0, Number(data.totalAdvances) || 0, Number(data.netSalary) || 0, pDate); 
    db.prepare(`UPDATE advances SET status = 'paid' WHERE employee_id = ? AND status = 'pending'`).run(empId); 
    if (Number(data.netSalary) < 0) { 
      db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note, status) VALUES (?, ?, ?, ?, ?, ?)').run(empId, Math.abs(Number(data.netSalary)), pDate, 'admin', data.rolloverNote || `ترحيل ديون سلفيات`, 'pending'); 
    } else if (Number(data.netSalary) > 0) { 
      db.prepare(`INSERT INTO expenses (description, category, amount, date, caisse_source) VALUES (?, ?, ?, ?, ?)`).run(data.expenseNote || `راتب`, 'salaries', Number(data.netSalary), pDate, 'admin'); 
    } 
    logAudit('Admin', 'PAY_SALARY', JSON.stringify({ amount: data.netSalary }));
    return { success: true }; 
  } catch (error) { return { success: false, error: error.message }; } 
});

function getAgendaTasks() { return db.prepare("SELECT * FROM agenda_tasks ORDER BY task_date ASC, task_time ASC").all(); }
function addAgendaTask(data) { const info = db.prepare('INSERT INTO agenda_tasks (title, type, task_date, task_time, amount) VALUES (?, ?, ?, ?, ?)').run(data.title, data.type, data.date, data.time || '', data.amount || 0); logAudit('Admin', 'ADD_TASK', JSON.stringify({ title: data.title })); return { ...data, id: info.lastInsertRowid, status: 'pending' }; }
function toggleAgendaTaskStatus(id, status) { db.prepare('UPDATE agenda_tasks SET status = ? WHERE id = ?').run(status, id); logAudit('Admin', 'UPDATE_TASK_STATUS', JSON.stringify({ status })); return { success: true }; }
function getDueThisWeek() { const today = new Date(); const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7); return db.prepare(`SELECT SUM(amount) as total FROM agenda_tasks WHERE type = 'payment' AND status = 'pending' AND task_date >= ? AND task_date <= ?`).get(today.toISOString().split('T')[0], nextWeek.toISOString().split('T')[0]).total || 0; }
function getDailySummary(date) { try { const expenses = db.prepare(`SELECT SUM(amount) as total FROM expenses WHERE date = ?`).get(date).total || 0; const payments = db.prepare(`SELECT SUM(amount) as total FROM payments WHERE date = ?`).get(date).total || 0; const advances = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE date = ?`).get(date).total || 0; return { success: true, data: { expenses, supplierPayments: payments, advances, totalOut: expenses + payments + advances } }; } catch (error) { return { success: false, error: error.message }; } }

function getAuditLogs() { return db.prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100").all(); }
function deleteExpense(id, username) { 
  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(id); 
  if (expense) logAudit(username || 'Admin', 'DELETE_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount })); 
  return { success: db.prepare('DELETE FROM expenses WHERE id = ?').run(id).changes > 0 }; 
}

function getDailyClosures() {
  try {
    const closures = db.prepare("SELECT * FROM daily_closures ORDER BY id DESC").all();
    return { success: true, data: closures };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


// ==========================================
// دوال الخريطة والمخزون التفاعلي (Space Management)
// ==========================================

function getStoreMapData() {
  try {
    const zonesConfig = db.prepare("SELECT id, t_key as tKey, name FROM store_zones").all();
    const shelves = db.prepare("SELECT id, zone_id as zoneId, name, type, capacity FROM store_shelves").all();
    
    // جلب المنتجات الموجودة في كل رف مع أسمائها النظيفة
    const products = db.prepare(`
      SELECT sp.shelf_id, sp.barcode, sp.quantity, mp.clean_name 
      FROM shelf_products sp 
      JOIN mapped_products mp ON sp.barcode = mp.barcode
    `).all();

    // دمج المنتجات مع الرفوف وحساب الحالة (Status)
    const shelvesWithStock = shelves.map(shelf => {
      const shelfProds = products.filter(p => p.shelf_id === shelf.id);
      const currentStock = shelfProds.reduce((sum, p) => sum + p.quantity, 0);
      
      let status = 'good';
      if (currentStock === 0) status = 'empty';
      else if ((currentStock / shelf.capacity) < 0.3) status = 'low';

      return { 
        ...shelf, 
        currentStock, 
        status, 
        products: shelfProds // لمعرفة ما بداخل الرف بالتفصيل عند الضغط عليه
      };
    });

    return { success: true, data: { zonesConfig, shelves: shelvesWithStock } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// هذه الدالة هي "الجسر" الذي سيستقبل بيانات الـ PDF ويحدث الرفوف
const processPdfInventoryEntry = db.transaction((shelfId, barcode, cleanName, dirtyNameFromPdf, quantityAdded) => {
  try {
    // 1. نظام القاموس: التأكد من وجود المنتج أو إضافته وتحديث الأسماء القذرة
    const existingProduct = db.prepare("SELECT * FROM mapped_products WHERE barcode = ?").get(barcode);
    if (!existingProduct) {
      // منتج جديد تماماً
      db.prepare("INSERT INTO mapped_products (barcode, clean_name, dirty_names) VALUES (?, ?, ?)").run(barcode, cleanName, JSON.stringify([dirtyNameFromPdf]));
    } else {
      // منتج موجود، نتأكد من أن الاسم القادم من الـ PDF محفوظ في ذاكرته
      let dirtyNames = JSON.parse(existingProduct.dirty_names || '[]');
      if (dirtyNameFromPdf && !dirtyNames.includes(dirtyNameFromPdf)) {
        dirtyNames.push(dirtyNameFromPdf);
        db.prepare("UPDATE mapped_products SET dirty_names = ? WHERE barcode = ?").run(JSON.stringify(dirtyNames), barcode);
      }
    }

    // 2. تحديث المخزون داخل الرف المحدد
    const existingShelfProd = db.prepare("SELECT * FROM shelf_products WHERE shelf_id = ? AND barcode = ?").get(shelfId, barcode);
    if (existingShelfProd) {
      db.prepare("UPDATE shelf_products SET quantity = quantity + ? WHERE id = ?").run(quantityAdded, existingShelfProd.id);
    } else {
      db.prepare("INSERT INTO shelf_products (shelf_id, barcode, quantity) VALUES (?, ?, ?)").run(shelfId, barcode, quantityAdded);
    }

    logAudit('System', 'UPDATE_INVENTORY', JSON.stringify({ barcode, qty: quantityAdded, shelfId }));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

function saveMapLayout(items) {
  try {
    const deleteStmt = db.prepare('DELETE FROM map_layout');
    const insertStmt = db.prepare('INSERT INTO map_layout (id, type, row, col, rotation, name, capacity) VALUES (?, ?, ?, ?, ?, ?, ?)');
    
    db.transaction(() => {
      deleteStmt.run(); // مسح المخطط القديم
      for(let item of items) {
        insertStmt.run(item.id, item.type, item.row, item.col, item.rotation, item.name, item.capacity);
      }
    })();
    logAudit('Admin', 'SAVE_STORE_MAP', 'تم تحديث المخطط ثلاثي الأبعاد للمحل');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function getMapLayout() {
  try {
    const layout = db.prepare('SELECT * FROM map_layout').all();
    return { success: true, data: layout };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


function getAllShiftsSummary() {
  try {
    const shifts = db.prepare("SELECT * FROM shifts WHERE archived = 0 OR archived IS NULL ORDER BY id DESC").all();
    let grandTotalSales = 0, grandTotalOpening = 0, grandTotalActual = 0;

    const detailedShifts = shifts.map(shift => {
      let expensesRow, paymentsRow, advancesRow;
      if (shift.cashier_name === 'المدير العام' || shift.cashier_name === 'Super Admin' || shift.cashier_name === 'admin') {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ?").get(shift.start_time);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ?").get(shift.start_time);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ?").get(shift.start_time);
      } else {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ?").get(shift.cashier_name, shift.start_time);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ?").get(shift.cashier_name, shift.start_time);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ?").get(shift.cashier_name, shift.start_time);
      }

      const totalOut = (expensesRow?.total || 0) + (paymentsRow?.total || 0) + (advancesRow?.total || 0);
      const shiftSales = shift.actual_cash ? (Number(shift.actual_cash) + totalOut) - Number(shift.opening_balance) : 0;

      if (shift.status === 'closed') {
        grandTotalSales += shiftSales;
        grandTotalActual += Number(shift.actual_cash || 0);
      }
      grandTotalOpening += Number(shift.opening_balance || 0);

      return { ...shift, totalOut, calculatedSales: shiftSales };
    });

    return { success: true, data: { shifts: detailedShifts, grandTotals: { opening: grandTotalOpening, actual: grandTotalActual, sales: grandTotalSales } } };
  } catch (error) { return { success: false, error: error.message }; }
}

function closeBusinessDay(adminName) {
  try {
    const openShifts = db.prepare("SELECT count(*) as count FROM shifts WHERE status = 'open' AND (archived = 0 OR archived IS NULL)").get();
    if (openShifts.count > 0) return { success: false, message: 'has_open_shifts' };

    const summaryRes = getAllShiftsSummary();
    if (!summaryRes.success || summaryRes.data.shifts.length === 0) return { success: false, message: 'no_shifts_to_close' };
    
    const totals = summaryRes.data.grandTotals;
    const stmt = db.prepare("INSERT INTO daily_closures (closure_date, total_opening, total_actual, total_sales, closed_by) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(new Date().toISOString(), totals.opening, totals.actual, totals.sales, adminName);
    const closureId = info.lastInsertRowid; 

    db.prepare("UPDATE shifts SET archived = 1, daily_closure_id = ? WHERE archived = 0 OR archived IS NULL").run(closureId);
    logAudit(adminName, 'CLOSE_DAY', JSON.stringify({ sales: totals.sales, actual: totals.actual }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getArchivedZReport(closureId) {
  try {
    const closure = db.prepare("SELECT * FROM daily_closures WHERE id = ?").get(closureId);
    if (!closure) return { success: false, message: 'not_found' };

    const shifts = db.prepare("SELECT * FROM shifts WHERE daily_closure_id = ?").all(closureId);
    const detailedShifts = shifts.map(shift => {
      let expensesRow, paymentsRow, advancesRow;
      const endTimeLimit = shift.end_time || new Date().toISOString();
      
      if (shift.cashier_name === 'المدير العام' || shift.cashier_name === 'Super Admin' || shift.cashier_name === 'admin') {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ? AND created_at <= ?").get(shift.start_time, endTimeLimit);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ? AND created_at <= ?").get(shift.start_time, endTimeLimit);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ? AND created_at <= ?").get(shift.start_time, endTimeLimit);
      } else {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ? AND created_at <= ?").get(shift.cashier_name, shift.start_time, endTimeLimit);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ? AND created_at <= ?").get(shift.cashier_name, shift.start_time, endTimeLimit);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ? AND created_at <= ?").get(shift.cashier_name, shift.start_time, endTimeLimit);
      }
      const totalOut = (expensesRow?.total || 0) + (paymentsRow?.total || 0) + (advancesRow?.total || 0);
      const shiftSales = shift.actual_cash ? (Number(shift.actual_cash) + totalOut) - Number(shift.opening_balance) : 0;
      return { ...shift, totalOut, calculatedSales: shiftSales };
    });

    return { success: true, data: { closure, shifts: detailedShifts } };
  } catch (error) { return { success: false, error: error.message }; }
}
// دالة حذف سلعة من الرف
function deleteShelfProduct(productId) {
  try {
    db.prepare('DELETE FROM shelf_products WHERE id = ?').run(productId);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

// دالة تعديل سلعة في الرف
function updateShelfProduct(productId, cleanName, quantity) {
  try {
    const sp = db.prepare('SELECT barcode FROM shelf_products WHERE id = ?').get(productId);
    if(sp) {
       db.prepare('UPDATE mapped_products SET clean_name = ? WHERE barcode = ?').run(cleanName, sp.barcode);
       db.prepare('UPDATE shelf_products SET quantity = ? WHERE id = ?').run(quantity, productId);
    }
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}
async function backupDatabase(destPath) { try { await db.backup(destPath); return { success: true }; } catch (error) { throw error; } }
// دالة استيراد ديون الموردين الذكية
async function importSuppliersFromExcel(filePath) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    
    let supplierName = "";
    let finalDebt = 0;
    
    // 1. استخراج الاسم من أول 10 أسطر في العمود الرابع (D) أو الثالث (C)
    for (let i = 1; i <= 10; i++) {
      let cellValue = worksheet.getRow(i).getCell(4).value; // العمود D
      if (!cellValue) cellValue = worksheet.getRow(i).getCell(3).value; // احتياطياً العمود C
      
      if (cellValue && typeof cellValue === 'string') {
        const val = cellValue.trim();
        // تجاهل التواريخ والعناوين مثل Date أو Montant
        if (val !== '' && !val.toLowerCase().includes('date') && !val.toLowerCase().includes('montant') && !val.toLowerCase().startsWith('le') && !/\d{2}\/\d{2}\/\d{4}/.test(val)) {
          supplierName = val;
          break;
        }
      }
    }
    
    // إذا لم نعثر على الاسم في الخلايا (مثل ملف DANOUN)، نأخذه من اسم الملف ذكياً
    if (!supplierName) {
      const path = require('path');
      let baseName = path.basename(filePath, path.extname(filePath));
      // تنظيف اسم الملف من الأرقام في البداية والأقواس (مثل "15 Fateh (1)" -> "Fateh")
      supplierName = baseName.replace(/^\d+\s*/, '').replace(/\(\d+\)/g, '').trim();
    }
    
    // 2. استخراج الرصيد النهائي من العمود السادس (F) المسمى Reste
    worksheet.eachRow((row, rowNumber) => {
      let cellValue = row.getCell(6).value; // العمود F
      
      // دعم قراءة الأرقام سواء كانت قيم مباشرة أو ناتجة عن معادلات إكسيل
      let val = (cellValue && typeof cellValue === 'object' && cellValue.result !== undefined) 
                ? cellValue.result 
                : cellValue;
      
      if (val !== null && val !== undefined && val !== '') {
        // محاولة تحويل القيمة إلى رقم (إزالة المسافات وتوحيد الفواصل)
        const num = parseFloat(val.toString().replace(/\s/g, '').replace(',', '.'));
        if (!isNaN(num)) {
          finalDebt = num; // سيستمر بالتحديث حتى يصل لآخر سطر فيه رقم
        }
      }
    });
    
    // 3. إدخال أو تحديث المورد في قاعدة البيانات
    const exist = db.prepare("SELECT id FROM suppliers WHERE name = ?").get(supplierName);
    const status = finalDebt > 0 ? 'indebted' : 'clear';

    if (exist) {
       // المورد موجود مسبقاً، نقوم بتحديث دينه إلى الرقم النهائي الموجود في الإكسيل
       db.prepare("UPDATE suppliers SET initial_debt = ?, total_debt = ?, status = ? WHERE id = ?").run(finalDebt, finalDebt, status, exist.id);
    } else {
       // مورد جديد، نقوم بإنشائه
       db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`).run(supplierName, '-', finalDebt, finalDebt, status);
    }
    
    logAudit('System', 'IMPORT_EXCEL', `استيراد ديون المورد ${supplierName} بمبلغ ${finalDebt}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}// دالة الذاكرة الذكية: فحص المنتجات المستخرجة من الـ PDF
function enrichExtractedItems(items) {
  try {
    // نبحث عن الباركود في جدول القاموس، ونجلب الرف الخاص به من جدول رفوف الخريطة
    const stmt = db.prepare(`
      SELECT mp.clean_name, sp.shelf_id 
      FROM mapped_products mp 
      LEFT JOIN shelf_products sp ON mp.barcode = sp.barcode 
      WHERE mp.barcode = ?
    `);
    
    return items.map(item => {
      const mapping = stmt.get(item.barcode);
      if (mapping) {
        return {
          ...item,
          cleanName: mapping.clean_name,
          selectedShelf: mapping.shelf_id || '',
          isKnown: true // 🧠 النظام تعرف على المنتج!
        };
      }
      return {
        ...item,
        cleanName: item.dirtyName, // كقيمة افتراضية
        selectedShelf: '',
        isKnown: false // منتج جديد يدوياً
      };
    });
  } catch (error) {
    console.error("Enrichment Error:", error);
    return items;
  }
}


module.exports = {
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, addEmployee, 
  handlePinEntry, getExpenses, addExpense, deleteExpense, updateExpense, getTodayAttendance,
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary, updateReceipt, updatePayment,
  getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek, deleteAgendaTask,
  rescheduleAgendaTask, getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,
  getUsers, addUser, deleteUser,dbPath,
  updateEmployee, deleteEmployee, logAudit, getAuditLogs, generateExcelBackup, backupDatabase, importSuppliersFromExcel, deleteSupplier, updateSupplier , deleteReceipt, deletePayment, updateAdvance, deleteAdvance, 
  getAllShiftsSummary, closeBusinessDay, getDailyClosures, getArchivedZReport, updateAttendanceRecord, getStoreMapData, processPdfInventoryEntry, enrichExtractedItems, saveMapLayout, getMapLayout,getStoreLayouts, saveStoreLayout, deleteStoreLayout, activateStoreLayout, getShelfProducts, deleteShelfProduct, updateShelfProduct,
  getInventoryTree, addInvFamily, deleteInvFamily, addInvType, deleteInvType, addInvItem, updateInvItem, deleteInvItem

};
```

---

## `backend\licenseManager.js`

```javascript
const { machineIdSync } = require('node-machine-id');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');

// 🔴 نضع الكلمة السرية مباشرة هنا بدون استخدام .env
const SECRET_SALT = "GHERBI_POS_SECRET_KEY_2026"; 

// مسار حفظ مفتاح التفعيل في حاسوب الزبون
const licensePath = path.join(app.getPath('userData'), 'system_license.key');

function getHardwareId() {
    try {
        const hwid = machineIdSync(true); 
        return hwid.toUpperCase();
    } catch (error) {
        return "UNKNOWN_DEVICE";
    }
}

function generateExpectedKey() {
    const hwid = getHardwareId();
    // استخدام نفس الكلمة السرية
    const hash = crypto.createHash('sha256').update(hwid + SECRET_SALT).digest('hex');
    const rawKey = hash.substring(0, 20).toUpperCase();
    return `${rawKey.substring(0,5)}-${rawKey.substring(5,10)}-${rawKey.substring(10,15)}-${rawKey.substring(15,20)}`;
}

function checkIsActivated() {
    try {
        if (fs.existsSync(licensePath)) {
            const savedKey = fs.readFileSync(licensePath, 'utf8').trim();
            const expectedKey = generateExpectedKey();
            return savedKey === expectedKey;
        }
        return false;
    } catch (e) {
        return false;
    }
}

function activateApp(userInputKey) {
    const expectedKey = generateExpectedKey();
    
    // 🔴 هذا السطر سيفضح المفتاح المطلوب في الشاشة السوداء (Terminal)
    console.log("=======================================");
    console.log("المفتاح الذي أدخله المستخدم :", userInputKey.trim().toUpperCase());
    console.log("المفتاح الذي يطلبه البرنامج :", expectedKey);
    console.log("=======================================");
    
    if (userInputKey.trim().toUpperCase() === expectedKey) {
        fs.writeFileSync(licensePath, userInputKey.trim().toUpperCase());
        return { success: true };
    }
    
    return { success: false, message: 'invalid_key' };
}

module.exports = { 
    getHardwareId, 
    checkIsActivated, 
    activateApp, 
    generateExpectedKey 
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
const licenseManager = require('./licenseManager');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const { 
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, 
  addEmployee, handlePinEntry, getExpenses, addExpense, deleteExpense, 
  updateExpense, getTodayAttendance, 
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary , getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask , getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,dbPath,
  getUsers, addUser, deleteUser, updateEmployee, deleteEmployee ,logAudit , getAuditLogs, backupDatabase, getShelfProducts,
  generateExcelBackup, updateSupplier, deleteSupplier, updateAdvance, deleteAdvance, getAllShiftsSummary , getDailyClosures, getArchivedZReport,updateAttendanceRecord,getStoreMapData, processPdfInventoryEntry, enrichExtractedItems, closeBusinessDay, getSuppliersList, saveInvoiceDebt, saveMapLayout, getMapLayout, getStoreLayouts, saveStoreLayout, deleteStoreLayout, activateStoreLayout
  , deleteReceipt, deletePayment, updateReceipt, updatePayment, importSuppliersFromExcel, deleteShelfProduct, updateShelfProduct, setWindowsTime,saveReceiptPdf, printReceipt,
  getInventoryTree, addInvFamily, deleteInvFamily, addInvType, deleteInvType, addInvItem, updateInvItem, deleteInvItem
} = require('./database');

// 👇 استدعاء آمن للمكتبة ليتوافق مع جميع إصدارات Electron و Node.js
const pdfParseRaw = require('pdf-parse');
const parsePDF = typeof pdfParseRaw === 'function' ? pdfParseRaw : pdfParseRaw.default;
const { exec } = require('child_process');

const express = require('express');
const cors = require('cors');

ipcMain.handle('delete-shelf-product', (e, id) => db.deleteShelfProduct(id));
ipcMain.handle('update-shelf-product', (e, id, name, qty) => db.updateShelfProduct(id, name, qty));
function createWindow() {
  // 1. إنشاء شاشة الإقلاع أولاً
  const splash = new BrowserWindow({
    width: 650,
    height: 400,
    transparent: true, 
    frame: false,      
    alwaysOnTop: true, 
    icon: path.join(__dirname, 'assets', 'icon.png'), // 🔴 إضافة اللوجو هنا
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  splash.loadFile(path.join(__dirname, 'splash.html'));

  // 2. إنشاء النافذة الرئيسية
  const win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    show: false, 
    icon: path.join(__dirname, 'assets', 'icon.png'), // 🔴 إضافة اللوجو لشريط المهام
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);

  // 👇==== الحل السحري للشاشة البيضاء ====👇
  const isDev = !app.isPackaged; // هل نحن في وضع التطوير أم الإنتاج (exe)؟

  if (isDev) {
    // في وضع التطوير: اقرأ من سيرفر React
    win.loadURL('http://localhost:5173'); 
  } else {
    // في وضع الإنتاج (exe): اقرأ من الملفات المبنية مباشرة
    win.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
  // 👆=====================================👆

  // 3. إظهار النافذة بعد التحميل
  win.once('ready-to-show', () => {
    setTimeout(() => {
      if (!splash.isDestroyed()) {
        splash.close(); 
      }
      win.show(); 
    }, 3000); 
  });
}
// 👇===== الكود السحري لتوحيد وتصحيح التوقيت المحلي لجميع صفحات البرنامج =====👇
function fixDatesGlobal(data) {
  if (!data || typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(item => fixDatesGlobal(item));
  
  const obj = { ...data };
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      // البحث عن أي نص يشبه التوقيت العالمي (سواء بصيغة Node.js أو SQLite)
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
      const sqliteRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      
      if (isoRegex.test(value)) {
        const d = new Date(value);
        const pad = (n) => n.toString().padStart(2, '0');
        obj[key] = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      } else if (sqliteRegex.test(value)) {
        // إضافة Z لكي يتعرف عليه كأنه توقيت عالمي ويضيف له فارق الساعات الخاص بدولتك
        const d = new Date(value.replace(' ', 'T') + 'Z');
        const pad = (n) => n.toString().padStart(2, '0');
        obj[key] = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      }
    } else if (value !== null && typeof value === 'object') {
      obj[key] = fixDatesGlobal(value);
    }
  }
  return obj;
}

// 🔴 اعتراض كل الطلبات المرسلة للواجهة الأمامية وتمريرها على الفلتر أولاً
const originalIpcHandle = ipcMain.handle;
ipcMain.handle = function(channel, listener) {
  return originalIpcHandle.call(this, channel, async (event, ...args) => {
    const result = await listener(event, ...args);
    return fixDatesGlobal(result); // إرسال بيانات نظيفة بالوقت الصحيح
  });
};
// 👆========================================================================👆
function setupIpcHandlers() {
ipcMain.handle('login', async (event, credentials) => {
  console.log("==================================");
  console.log("👤 استلمت طلب الدخول من الواجهة:", credentials.username);
  
  try {
    // هنا نقوم باستدعاء الدالة المحصنة التي برمجناها في database.js
    const result = verifyLogin(credentials.username, credentials.password);
    console.log("📦 النتيجة المُرسلة للواجهة:", result);
    return result;
  } catch (error) {
    console.error("🔥 خطأ في كوبري الدخول:", error);
    return { success: false, message: 'serverError' };
  }
});
  ipcMain.handle('get-suppliers', () => getSuppliers());
  ipcMain.handle('add-supplier', (event, data) => addSupplier(data));
  

// 🔴 مسار تصحيح وقت الويندوز تلقائياً من داخل البرنامج (النسخة المدرعة)
  ipcMain.handle('set-windows-time', async (event, datetimeStr) => {
    return new Promise((resolve) => {
      try {
        // 1. تحويل الوقت القادم من الواجهة إلى كائن Date 
        const dateObj = new Date(datetimeStr);
        
        // التحقق من أن التاريخ صالح لتجنب تحطم السكريبت
        if (isNaN(dateObj.getTime())) {
          console.error("🔥 خطأ: التاريخ المرسل غير صالح:", datetimeStr);
          return resolve({ success: false, error: "invalid_date" });
        }
        
        // 2. تحويل التاريخ لصيغة ISO العالمية (تفهمها كل أنظمة الويندوز مهما كانت لغتها)
        const safeIsoDate = dateObj.toISOString(); 

        // 3. أمر PowerShell مدرع ضد مسافات النصوص وأخطاء الترجمة
        const command = `powershell.exe -Command "Start-Process powershell -Verb RunAs -WindowStyle Hidden -ArgumentList \\"-Command Set-Date -Date ([datetime]'${safeIsoDate}')\\""`;

        exec(command, (error) => {
          if (error) {
            console.error("🔥 خطأ في تحديث وقت الويندوز:", error);
            resolve({ success: false, error: error.message });
          } else {
            resolve({ success: true });
          }
        });
      } catch (err) {
        resolve({ success: false, error: err.message });
      }
    });
  });

ipcMain.handle("save-receipt-pdf", async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    try {
      const { canceled, filePath } = await dialog.showSaveDialog(win, {
        title: 'حفظ الوصل كـ PDF',
        defaultPath: `Receipt_${Date.now()}.pdf`,
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
      });

      if (canceled || !filePath) return { success: false, canceled: true };

      // 🔴 إجبار مقاس A7 بدقة الميكرون (74mm x 105mm)
      const pdfData = await win.webContents.printToPDF({
        printBackground: true,
        pageSize: { width: 74000, height: 105000 }, 
        margins: { marginType: 'none' }
      });

      const fs = require('fs');
      fs.writeFileSync(filePath, pdfData);
      
      return { success: true };
    } catch (error) {
      console.error("PDF Save Error:", error);
      return { success: false, error: error.message };
    }
  });
  // --- مسارات نظام الجرد (Inventory) ---
  ipcMain.handle('get-inventory-tree', () => getInventoryTree());
  ipcMain.handle('add-inv-family', (event, name) => addInvFamily(name));
  ipcMain.handle('delete-inv-family', (event, id) => deleteInvFamily(id));
  ipcMain.handle('add-inv-type', (event, familyId, name) => addInvType(familyId, name));
  ipcMain.handle('delete-inv-type', (event, id) => deleteInvType(id));
  ipcMain.handle('add-inv-item', (event, data) => addInvItem(data));
  ipcMain.handle('update-inv-item', (event, id, data) => updateInvItem(id, data));
  ipcMain.handle('delete-inv-item', (event, id) => deleteInvItem(id));
  ipcMain.handle('get-supplier-details', (event, id) => getSupplierDetails(id));
  ipcMain.handle('add-receipt', (event, data) => {
    try { return { success: true, id: addReceipt(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });
  ipcMain.handle('add-payment', (event, data) => {
    try { return { success: true, id: addPayment(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });
  ipcMain.handle('save-map-layout', (event, items) => db.saveMapLayout(items));
  ipcMain.handle('get-map-layout', () => db.getMapLayout());
  ipcMain.handle('get-shelf-products', (event, shelfId) => db.getShelfProducts(shelfId));
  ipcMain.handle("print-receipt", async (event) => {
  
    const win = BrowserWindow.fromWebContents(event.sender);

    return new Promise((resolve)=>{

        win.webContents.print({

            silent:false,

            printBackground:true,

            margins:{
                marginType:"none"
            },

            scaleFactor:100,

            landscape:false,

            color:false

        },(success,errorType)=>{

            resolve({
                success,
                errorType
            });

        });

    });

});
  

  // --- مسارات الخريطة والمخزون الذكي ---
  ipcMain.handle('get-store-map-data', () => getStoreMapData());
  ipcMain.handle('process-pdf-inventory', (event, data) => processPdfInventoryEntry(data.shelfId, data.barcode, data.cleanName, data.dirtyName, data.quantity));

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
  ipcMain.handle('get-store-layouts', () => db.getStoreLayouts());
  ipcMain.handle('save-store-layout', (event, data) => db.saveStoreLayout(data));
  ipcMain.handle('delete-store-layout', (event, id) => db.deleteStoreLayout(id));
  ipcMain.handle('activate-store-layout', (event, id) => db.activateStoreLayout(id));
  // 🌟 مسارات استيراد الفواتير الذكية (PDF) 🌟
  
  // 1. جلب قائمة الموردين للنافذة المنسدلة
  ipcMain.handle('get-suppliers-list', async () => {
    try {
      // نستخدم دالة getSuppliers الموجودة لديك مسبقاً في database.js
      const suppliers = getSuppliers(); 
      return { success: true, data: suppliers };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // 2. ترحيل الفاتورة كدين (إضافة وصل استلام فاتورة)
  ipcMain.handle('save-invoice-debt', async (event, data) => {
    try {
      // تجهيز البيانات لتتناسب مع دالة addReceipt الموجودة لديك
      const receiptData = {
        supplierId: data.supplierId,
        amount: data.totalAmount,
        date: data.date,
        // إضافة ملاحظة توثيقية آلية لحماية حقوق المحل
        notes: `فاتورة مستوردة آلياً (PDF) - الاسم المصدر بالملف: ${data.pdfSupplierName}` 
      };
      
      const newId = addReceipt(receiptData);
      return { success: true, id: newId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
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


  ipcMain.handle('check-activation', () => licenseManager.checkIsActivated());
  ipcMain.handle('get-hardware-id', () => licenseManager.getHardwareId());
  ipcMain.handle('activate-app', (event, key) => licenseManager.activateApp(key));

  
ipcMain.handle('get-users', () => getUsers());
  ipcMain.handle('add-user', (event, data) => addUser(data));
  ipcMain.handle('delete-user', (event, id) => deleteUser(id));


  ipcMain.handle('update-employee', (event, id, data) => updateEmployee(id, data));
  ipcMain.handle('delete-employee', (event, id) => deleteEmployee(id));

  ipcMain.handle('get-audit-logs', () => getAuditLogs());

  ipcMain.handle('delete-expense', (event, id, username) => deleteExpense(id, username));
  
  ipcMain.handle('close-business-day', async (event, adminName) => closeBusinessDay(adminName));

  ipcMain.handle('get-archived-zreport', async (event, id) => getArchivedZReport(id));
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
        res.json({ success: true, data: fixDatesGlobal(result) });
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
// 2. استعادة البيانات
  ipcMain.handle('restore-database', async () => {
    
    // 🔴 لقد قمنا بحذف تعريف dbPath من هنا، لأنه سيستخدم المسار القادم من database.js مباشرة!
    
    // فتح نافذة للمستخدم لاختيار ملف النسخة الاحتياطية
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'اختيار ملف النسخة الاحتياطية (Select Backup File)',
      properties: ['openFile'],
      filters: [
        { name: 'Database Files', extensions: ['db', 'sqlite', 'sqlite3'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    try {
      const sourcePath = filePaths[0];
      
      const buffer = Buffer.alloc(16);
      const fd = fs.openSync(sourcePath, 'r');
      fs.readSync(fd, buffer, 0, 16, 0);
      fs.closeSync(fd);
      
      const header = buffer.toString('utf8');
      if (!header.startsWith('SQLite format 3')) {
        return { success: false, error: 'invalid_format' }; 
      }

      // 🔴 هنا سيقوم بنسخ الملف المختار واستبداله بالمسار الأصلي المعرف في database.js
      fs.copyFileSync(sourcePath, dbPath);
      
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
      title: 'استيراد ديون الموردين من ملفات إكسيل',
      properties: ['openFile', 'multiSelections'], // 🔴 تفعيل التحديد المتعدد
      filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    let successCount = 0;
    let errors = [];

    // قراءة كل الملفات المحددة واحداً تلو الآخر
    for (let filePath of filePaths) {
      const res = await db.importSuppliersFromExcel(filePath);
      if (res.success) {
        successCount++;
      } else {
        errors.push(`${require('path').basename(filePath)}: ${res.error}`);
      }
    }

    if (successCount > 0) {
      return { success: true, count: successCount, error: errors.join('\n') };
    } else {
      return { success: false, error: errors.join('\n') };
    }
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



ipcMain.handle('parse-pdf-invoice', async () => {
    try {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        title: 'اختر ملف PDF (Bon de Livraison)',
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
      });

      if (canceled || filePaths.length === 0) return { success: false, canceled: true };

      const PDFParser = require("pdf2json");
      
      return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        
        pdfParser.on("pdfParser_dataError", errData => {
           resolve({ success: false, error: "تعذر قراءة هيكل الملف." });
        });
        
        pdfParser.on("pdfParser_dataReady", pdfData => {
            let text = pdfParser.getRawTextContent();
            text = text.replace(/\r\n/g, '\n');
            
            const lines = text.split('\n');
            let extractedItems = [];
            
            // 🌟 كائن جديد لتخزين بيانات الفاتورة الأساسية
            let invoiceMeta = {
              supplierName: "",
              totalAmount: 0
            };

            for (let line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine) continue;

              // 1. استخراج اسم المورد
              if (trimmedLine.toUpperCase().includes('FOURNISSEUR')) {
                // استخراج ما بعد كلمة Fournisseur أو النقطتين
                const parts = trimmedLine.split(/[:|]/);
                if (parts.length > 1) {
                  invoiceMeta.supplierName = parts[1].trim();
                }
              }

              // 2. استخراج المبلغ الإجمالي
              if (trimmedLine.toUpperCase().includes('NET A PAYER') || trimmedLine.toUpperCase().includes('TOTAL TTC')) {
                // قنص الأرقام فقط من السطر (مع الفاصلة والنقطة)
                let amountStr = trimmedLine.replace(/[^0-9,.]/g, '');
                // توحيد الفواصل العشرية
                amountStr = amountStr.replace(',', '.');
                // بما أن الرقم قد يحتوي على مسافات (مثال 39 390)، استخراج الرقم كالتالي:
                const amountMatches = trimmedLine.match(/[\d\s]+[.,]\d{2}/);
                if (amountMatches) {
                   const cleanAmount = parseFloat(amountMatches[0].replace(/\s/g, '').replace(',', '.'));
                   if (!isNaN(cleanAmount)) {
                     invoiceMeta.totalAmount = cleanAmount;
                   }
                }
              }

              // 3. استخراج السلع (الخوارزمية المدرعة السابقة)
              const columns = trimmedLine.split(/\s{3,}/).map(col => col.trim());

              if (columns.length >= 5 && /^\d+$/.test(columns[0])) {
                const id = columns[0];
                const barcode = columns[1];
                
                const qtyIndex = columns.length - 4;
                const finalQtyIndex = qtyIndex > 1 ? qtyIndex : 2;
                
                const qtyStr = columns[finalQtyIndex];
                const qty = parseFloat(qtyStr.replace(/\s/g, '').replace(',', '.'));
                
                if (!isNaN(qty)) {
                  const dirtyName = columns.slice(2, finalQtyIndex).join(' ');
                  extractedItems.push({
                    id: id,
                    barcode: barcode,
                    dirtyName: dirtyName || "بدون اسم",
                    quantity: qty,
                  });
                }
              }
            }

            const enrichedItems = enrichExtractedItems(extractedItems);
            
            // 🌟 نرجع السلع + بيانات الفاتورة للواجهة الأمامية
            resolve({ success: true, data: enrichedItems, meta: invoiceMeta });
        });
        
        pdfParser.loadPDF(filePaths[0]);
      });

    } catch (error) {
      return { success: false, error: error.message };
    }
  });

ipcMain.handle('update-advance', (event, payload) => updateAdvance(payload.id, payload.data));
ipcMain.handle('delete-advance', (event, id) => deleteAdvance(id));

ipcMain.handle('get-all-shifts-summary', async () => getAllShiftsSummary());
ipcMain.handle('get-daily-closures', async () => getDailyClosures());
ipcMain.handle('update-attendance-record', (event, id, timeIn, timeOut) => updateAttendanceRecord(id, timeIn, timeOut)); 
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
  "description": "Offline Management System",
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
    "dotenv": "^17.4.2",
    "exceljs": "^4.4.0",
    "express": "^5.2.1",
    "node-machine-id": "^1.1.12",
    "pdf-parse": "^1.1.1",
    "pdf2json": "^4.0.3"
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
  printReceipt: () => ipcRenderer.invoke("print-receipt"),
  getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
  addSupplier: (data) => ipcRenderer.invoke('add-supplier', data),
  getSupplierDetails: (id) => ipcRenderer.invoke('get-supplier-details', id),
  addReceipt: (data) => ipcRenderer.invoke('add-receipt', data),
  addPayment: (data) => ipcRenderer.invoke('add-payment', data),
  
  getEmployees: () => ipcRenderer.invoke('get-employees'),
  addEmployee: (data) => ipcRenderer.invoke('add-employee', data),
  handlePinEntry: (pinCode) => ipcRenderer.invoke('handle-pin-entry', pinCode),
  getTodayAttendance: (date) => ipcRenderer.invoke('get-today-attendance', date),
  
  getStoreMapData: () => ipcRenderer.invoke('get-store-map-data'),
  processPdfInventory: (data) => ipcRenderer.invoke('process-pdf-inventory', data),

  parsePdfInvoice: () => ipcRenderer.invoke('parse-pdf-invoice'),
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
  getSuppliersList: () => ipcRenderer.invoke('get-suppliers-list'),
  saveInvoiceDebt: (data) => ipcRenderer.invoke('save-invoice-debt', data),
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
  deleteAdvance: (id) => ipcRenderer.invoke('delete-advance', id),
  getAllShiftsSummary: () => ipcRenderer.invoke('get-all-shifts-summary'),
  getDailyClosures: () => ipcRenderer.invoke('get-daily-closures'),
  closeBusinessDay: (adminName) => ipcRenderer.invoke('close-business-day', adminName),
  getArchivedZReport: (id) => ipcRenderer.invoke('get-archived-zreport', id),
  updateAttendanceRecord: (id, timeIn, timeOut) => ipcRenderer.invoke('update-attendance-record', id, timeIn, timeOut),
  saveMapLayout: (items) => ipcRenderer.invoke('save-map-layout', items),
  getMapLayout: () => ipcRenderer.invoke('get-map-layout'),
  getStoreLayouts: () => ipcRenderer.invoke('get-store-layouts'),
  saveStoreLayout: (data) => ipcRenderer.invoke('save-store-layout', data),
  deleteStoreLayout: (id) => ipcRenderer.invoke('delete-store-layout', id),
  activateStoreLayout: (id) => ipcRenderer.invoke('activate-store-layout', id),
  getShelfProducts: (shelfId) => ipcRenderer.invoke('get-shelf-products', shelfId),
  deleteShelfProduct: (id) => ipcRenderer.invoke('delete-shelf-product', id),
updateShelfProduct: (id, name, qty) => ipcRenderer.invoke('update-shelf-product', id, name, qty),
setWindowsTime: (datetimeStr) => ipcRenderer.invoke('set-windows-time', datetimeStr),
checkActivation: () => ipcRenderer.invoke('check-activation'),
  getHardwareId: () => ipcRenderer.invoke('get-hardware-id'),
  activateApp: (key) => ipcRenderer.invoke('activate-app', key),
  // --- دوال نظام الجرد (Inventory) ---
  getInventoryTree: () => ipcRenderer.invoke('get-inventory-tree'),
  addInvFamily: (name) => ipcRenderer.invoke('add-inv-family', name),
  deleteInvFamily: (id) => ipcRenderer.invoke('delete-inv-family', id),
  addInvType: (familyId, name) => ipcRenderer.invoke('add-inv-type', familyId, name),
  deleteInvType: (id) => ipcRenderer.invoke('delete-inv-type', id),
  addInvItem: (data) => ipcRenderer.invoke('add-inv-item', data),
  updateInvItem: (id, data) => ipcRenderer.invoke('update-inv-item', id, data),
  deleteInvItem: (id) => ipcRenderer.invoke('delete-inv-item', id),
});
```

---

## `backend\project_structure39.md`

```markdown
# Project Structure

```text
backend/
    ├── .env
    ├── database.js
    ├── licenseManager.js
    ├── main.js
    ├── package.json
    ├── preload.js
    ├── project_structure39.md
    ├── splash.html
├── assets/
```


---

# Source Code

## `database.js`

```javascript
const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const ExcelJS = require('exceljs');
const dbPath = path.join(app.getPath('userData'), 'pos_manager8.db');
const db = new Database(dbPath);
const fs = require('fs');
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
    
    db.prepare(`CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, category TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT DEFAULT 'admin', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    try { db.prepare("ALTER TABLE expenses ADD COLUMN caisse_source TEXT DEFAULT 'admin'").run(); } catch(e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS agenda_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, type TEXT NOT NULL, task_date TEXT NOT NULL, task_time TEXT, status TEXT DEFAULT 'pending', amount REAL DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    try { db.prepare("ALTER TABLE agenda_tasks ADD COLUMN amount REAL DEFAULT 0").run(); } catch (e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS advances (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT, note TEXT, status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS salaries (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, total_hours REAL NOT NULL, hourly_rate REAL NOT NULL, total_advances REAL NOT NULL, net_salary REAL NOT NULL, payment_date TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS shifts (id INTEGER PRIMARY KEY AUTOINCREMENT, cashier_name TEXT NOT NULL, opening_balance REAL NOT NULL, start_time DATETIME DEFAULT CURRENT_TIMESTAMP, end_time DATETIME, actual_cash REAL, difference REAL, status TEXT DEFAULT 'open', note TEXT, archived INTEGER DEFAULT 0)`).run();
    try { db.prepare("ALTER TABLE shifts ADD COLUMN archived INTEGER DEFAULT 0").run(); } catch(e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, action TEXT NOT NULL, details TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS map_layout (id TEXT PRIMARY KEY, type TEXT, row INTEGER, col INTEGER, rotation INTEGER, name TEXT, capacity INTEGER)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS store_zones (id TEXT PRIMARY KEY, t_key TEXT NOT NULL, name TEXT NOT NULL)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS store_shelves (id TEXT PRIMARY KEY, zone_id TEXT NOT NULL, name TEXT NOT NULL, type TEXT DEFAULT 'shelf', capacity INTEGER DEFAULT 100)`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS mapped_products (barcode TEXT PRIMARY KEY, clean_name TEXT NOT NULL, dirty_names TEXT)`).run();
    
    // 🔴 1. بناء الجدول الجديد بدون القيد المزعج (بدون FOREIGN KEY للرفوف)
    db.prepare(`CREATE TABLE IF NOT EXISTS shelf_products (id INTEGER PRIMARY KEY AUTOINCREMENT, shelf_id TEXT NOT NULL, barcode TEXT NOT NULL, quantity REAL DEFAULT 0, expiry_date TEXT, FOREIGN KEY (barcode) REFERENCES mapped_products(barcode))`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS store_layouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, is_active INTEGER DEFAULT 0, grid_rows INTEGER DEFAULT 10, grid_cols INTEGER DEFAULT 14, items_json TEXT)`).run();

    // 🔴 2. الترحيل الذكي: نتحقق إذا كان الجدول القديم مربوطاً، فنقوم بفك ارتباطه ونسخ بياناته
    try {
      const tableInfo = db.prepare("PRAGMA foreign_key_list(shelf_products)").all();
      const hasOldConstraint = tableInfo.some(fk => fk.table === 'store_shelves');
      if (hasOldConstraint) {
        db.prepare(`CREATE TABLE shelf_products_new (id INTEGER PRIMARY KEY AUTOINCREMENT, shelf_id TEXT NOT NULL, barcode TEXT NOT NULL, quantity REAL DEFAULT 0, expiry_date TEXT, FOREIGN KEY (barcode) REFERENCES mapped_products(barcode))`).run();
        db.prepare(`INSERT INTO shelf_products_new SELECT id, shelf_id, barcode, quantity, expiry_date FROM shelf_products`).run();
        db.prepare(`DROP TABLE shelf_products`).run();
        db.prepare(`ALTER TABLE shelf_products_new RENAME TO shelf_products`).run();
        console.log('✅ Migration: Unlinked old store_shelves from shelf_products successfully.');
      }
    } catch (e) {
      console.log('Migration note:', e.message);
    }

    db.prepare(`
      CREATE TABLE IF NOT EXISTS daily_closures (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        closure_date TEXT,
        total_opening REAL,
        total_actual REAL,
        total_sales REAL,
        closed_by TEXT
      )
    `).run();
   try { db.prepare("ALTER TABLE shifts ADD COLUMN daily_closure_id INTEGER").run(); } catch(e) {}
  } catch (error) { console.error('خطأ أثناء تهيئة قاعدة البيانات:', error); }
}
  
function logAudit(username, action, details) { 
  try { db.prepare("INSERT INTO audit_logs (username, action, details) VALUES (?, ?, ?)").run(username, action, details || ''); } catch (error) {} 
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
    if (existingUser || existingEmp) return { success: false, message: 'userExists' };
    
    const insertTx = db.transaction(() => {
      const userInfo = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(finalUsername, data.password, finalRole);
      db.prepare("INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)").run(finalUsername, finalRole, data.password);
      return userInfo.lastInsertRowid;
    });
    logAudit('Admin', 'ADD_USER', JSON.stringify({ username: finalUsername, role: finalRole }));
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
    logAudit('Admin', 'DELETE_USER', JSON.stringify({ username: user.username }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getEmployees() { return db.prepare("SELECT * FROM employees WHERE status = 'active' OR status IS NULL ORDER BY id DESC").all(); }
// دالة لجلب السلع المخزنة في رف معين بناءً على الـ ID الخاص به
function getShelfProducts(shelfId) {
  try {
    const products = db.prepare(`
      SELECT sp.id, sp.barcode, sp.quantity, mp.clean_name 
      FROM shelf_products sp 
      JOIN mapped_products mp ON sp.barcode = mp.barcode 
      WHERE sp.shelf_id = ?
    `).all(shelfId.toString());
    
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
function addEmployee(data) {
  try {
    const exist = db.prepare("SELECT * FROM employees WHERE pin_code = ? OR name = ?").get(data.pinCode, data.name);
    if (exist) return { error: 'employeeExists' };
    const insertTx = db.transaction(() => {
      const info = db.prepare(`INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)`).run(data.name, data.role, data.pinCode);
      try { db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(data.name, data.pinCode, data.role); } catch(e) {}
      return info.lastInsertRowid;
    });
    logAudit('Admin', 'ADD_EMPLOYEE', JSON.stringify({ name: data.name, role: data.role }));
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
      if (exist) return { error: 'employeeExists' };
      db.prepare("UPDATE employees SET name = ?, role = ?, pin_code = ? WHERE id = ?").run(finalName, finalRole, data.pinCode, id);
      db.prepare("UPDATE users SET username = ?, password = ?, role = ? WHERE username = ?").run(finalName, data.pinCode, finalRole, oldEmp.name);
      logAudit('Admin', 'UPDATE_EMPLOYEE', JSON.stringify({ name: finalName, role: finalRole }));
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
    
    logAudit('Admin', 'DELETE_EMPLOYEE', JSON.stringify({ name: emp.name }));

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

// ==========================================
// دوال إدارة المخططات المتعددة (Tabs)
// ==========================================
function getStoreLayouts() {
  try {
    const layouts = db.prepare('SELECT * FROM store_layouts ORDER BY id ASC').all();
    return { success: true, data: layouts };
  } catch (error) { return { success: false, error: error.message }; }
}

function saveStoreLayout(data) {
  try {
    const itemsJson = JSON.stringify(data.items || []);
    if (data.id) {
      db.prepare('UPDATE store_layouts SET name = ?, grid_rows = ?, grid_cols = ?, items_json = ? WHERE id = ?')
        .run(data.name, data.gridRows, data.gridCols, itemsJson, data.id);
      logAudit('Admin', 'UPDATE_LAYOUT', `تم تحديث المخطط: ${data.name}`);
      return { success: true, id: data.id };
    } else {
      // إذا كان هذا أول مخطط، نجعله مفعل (is_active = 1) تلقائياً
      const count = db.prepare('SELECT COUNT(*) as c FROM store_layouts').get().c;
      const isActive = count === 0 ? 1 : 0;
      
      const info = db.prepare('INSERT INTO store_layouts (name, is_active, grid_rows, grid_cols, items_json) VALUES (?, ?, ?, ?, ?)')
        .run(data.name, isActive, data.gridRows, data.gridCols, itemsJson);
      logAudit('Admin', 'CREATE_LAYOUT', `تم إنشاء مخطط جديد: ${data.name}`);
      return { success: true, id: info.lastInsertRowid };
    }
  } catch (error) { return { success: false, error: error.message }; }
}


function deleteStoreLayout(id) {
  try {
    db.prepare('DELETE FROM store_layouts WHERE id = ?').run(id);
    logAudit('Admin', 'DELETE_LAYOUT', `تم حذف المخطط (ID: ${id})`);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}



function activateStoreLayout(id) {
  try {
    db.transaction(() => {
      db.prepare('UPDATE store_layouts SET is_active = 0').run();
      db.prepare('UPDATE store_layouts SET is_active = 1 WHERE id = ?').run(id);
    })();
    logAudit('Admin', 'ACTIVATE_LAYOUT', `تم تفعيل المخطط (ID: ${id})`);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function addExpense(expense) { 
  const stmt = db.prepare('INSERT INTO expenses (description, category, amount, date, caisse_source) VALUES (?, ?, ?, ?, ?)'); 
  const date = expense.date || new Date().toISOString().split('T')[0]; 
  const caisse = expense.caisseSource || 'admin';
  const info = stmt.run(expense.description, expense.category, expense.amount, date, caisse); 
  logAudit(caisse, 'ADD_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount }));
  return { success: true, id: info.lastInsertRowid }; 
}

function openShift(data) { 
  const activeShift = db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(data.cashierName); 
  if (activeShift) return { success: false, message: 'shiftAlreadyOpen' }; 
  const info = db.prepare('INSERT INTO shifts (cashier_name, opening_balance, archived) VALUES (?, ?, 0)').run(data.cashierName, data.openingBalance); 
  logAudit(data.cashierName, 'OPEN_SHIFT', JSON.stringify({ opening: data.openingBalance }));
  return { success: true, shiftId: info.lastInsertRowid }; 
}

function getActiveShift(cashierName) { 
  return db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(cashierName); 
}

function closeShift(data) { 
  try {
    const endTime = new Date().toISOString(); 
    db.prepare(`UPDATE shifts SET end_time = ?, actual_cash = ?, difference = ?, status = 'closed', note = ? WHERE id = ?`)
      .run(endTime, data.actualCash, data.difference, data.note, data.shiftId); 
    
    const shiftInfo = db.prepare("SELECT cashier_name FROM shifts WHERE id = ?").get(data.shiftId);
    logAudit(shiftInfo?.cashier_name || 'System', 'CLOSE_SHIFT', JSON.stringify({ sales: data.difference, actual: data.actualCash }));
    return { success: true }; 
  } catch (error) { 
    return { success: false, error: error.message }; 
  }
}

function getShiftSummary(cashierName, startTime) { 
  try { 
    let paymentsRow, advancesRow, expensesRow; 
    if (cashierName === 'المدير العام' || cashierName === 'Super Admin' || cashierName === 'admin') { 
      expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ?").get(startTime); 
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ?").get(startTime); 
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ?").get(startTime); 
    } else { 
      expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime); 
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime); 
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime); 
    } 
    return { success: true, data: { expenses: expensesRow.total || 0, supplierPayments: paymentsRow.total || 0, advances: advancesRow.total || 0, totalOut: (expensesRow.total || 0) + (paymentsRow.total || 0) + (advancesRow.total || 0) } }; 
  } catch (error) { return { success: false, error: error.message }; } 
}

async function generateExcelBackup(outputPath) { const workbook = new ExcelJS.Workbook(); await workbook.xlsx.writeFile(outputPath); }

function updateExpense(id, expense) { 
  try {
    const result = db.prepare('UPDATE expenses SET description = ?, category = ?, amount = ?, date = ?, caisse_source = ? WHERE id = ?').run(expense.description, expense.category, expense.amount, expense.date, expense.caisseSource, id);
    logAudit(expense.caisseSource || 'Admin', 'UPDATE_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount }));
    return { success: result.changes > 0 };
  } catch (error) { return { success: false, error: error.message }; }
}

function updateAdvance(id, advanceData) {
  try {
    db.prepare('UPDATE advances SET amount = ?, date = ?, note = ?, caisse_source = ? WHERE id = ?').run(advanceData.amount, advanceData.date, advanceData.note, advanceData.caisseSource, id);
    logAudit(advanceData.caisseSource || 'Admin', 'UPDATE_ADVANCE', JSON.stringify({ amount: advanceData.amount }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function deleteAdvance(id) {
  try {
    const advance = db.prepare('SELECT * FROM advances WHERE id = ?').get(id);
    if (!advance) return { success: false, error: 'advanceNotFound' }; 
    if (advance.status === 'paid') return { success: false, error: 'cannotDeletePaid' }; 
    db.prepare('DELETE FROM advances WHERE id = ?').run(id);
    logAudit('Admin', 'DELETE_ADVANCE', JSON.stringify({ id }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function verifyLogin(username, password) { 
  try { 
    // ☢️ التكتيك النووي الناجح: فحص تاريخ ملف قاعدة البيانات من الويندوز مباشرة
    if (fs.existsSync(dbPath)) {
      const dbStats = fs.statSync(dbPath);
      const lastModifiedTime = dbStats.mtime.getTime(); // متى تم حفظ آخر شيء في الملف
      const currentTime = Date.now(); // وقت الحاسوب الآن
      
      // إذا كان وقت الحاسوب الحالي أقدم من آخر تعديل للملف (بفارق دقيقتين لتجنب الحساسية)
      if (currentTime < (lastModifiedTime - 120000)) {
         const d = new Date(lastModifiedTime);
         const pad = (n) => n.toString().padStart(2, '0');
         const formattedDate = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
         
         return { 
           success: false, 
           message: 'timeError',
           lastDate: formattedDate 
         };
      }
    }

    // إكمال الدخول العادي
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password); 
    if (user) {
      logAudit(user.username, 'LOGIN', JSON.stringify({ role: user.role }));
      return { success: true, user: { id: user.id, username: user.username, role: user.role } }; 
    }
    return { success: false, message: 'invalidCredentials' }; 
  } catch (error) { 
    return { success: false, message: error.message }; 
  } 
}


function handlePinEntry(pinCode) { 
  const employee = db.prepare("SELECT * FROM employees WHERE pin_code = ? AND status = 'active'").get(pinCode); 
  if (!employee) return { success: false, message: 'invalidPinOrInactive' }; 
  const today = new Date().toISOString().split('T')[0]; 
  const now = new Date().toLocaleTimeString('en-US', { hour12: false }); 
  const record = db.prepare("SELECT * FROM attendance WHERE employee_id = ? AND date = ?").get(employee.id, today); 
  
  if (!record) { 
    db.prepare("INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)").run(employee.id, today, now); 
    logAudit(employee.name, 'CHECK_IN', JSON.stringify({ time: now }));
    return { success: true, action: 'check_in', employeeName: employee.name, time: now }; 
  } else if (!record.time_out) { 
    db.prepare("UPDATE attendance SET time_out = ? WHERE id = ?").run(now, record.id); 
    logAudit(employee.name, 'CHECK_OUT', JSON.stringify({ time: now }));
    return { success: true, action: 'check_out', employeeName: employee.name, time: now }; 
  } else { 
    return { success: false, message: 'alreadyCompletedShift', employeeName: employee.name }; 
  } 
}

function updateAttendanceRecord(id, timeIn, timeOut) {
  try {
    const record = db.prepare("SELECT * FROM attendance WHERE id = ?").get(id);
    if (!record) return { success: false, error: 'Record not found' };
    const outVal = (timeOut && timeOut.trim() !== '') ? timeOut : null;
    db.prepare("UPDATE attendance SET time_in = ?, time_out = ? WHERE id = ?").run(timeIn, outVal, id);
    logAudit('Admin', 'UPDATE_ATTENDANCE', JSON.stringify({ id, timeIn, timeOut: outVal }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getTodayAttendance(date) { return db.prepare(`SELECT a.*, e.name as employee_name, e.role FROM attendance a JOIN employees e ON a.employee_id = e.id WHERE a.date = ? ORDER BY a.time_in DESC`).all(date); }
function getSuppliers() { return db.prepare("SELECT * FROM suppliers ORDER BY id DESC").all(); }

function addSupplier(supplierData) { 
  const status = supplierData.initialDebt > 0 ? 'indebted' : 'clear'; 
  const info = db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`).run(supplierData.name, supplierData.phone, supplierData.initialDebt, supplierData.initialDebt, status); 
  logAudit('Admin', 'ADD_SUPPLIER', JSON.stringify({ name: supplierData.name, debt: supplierData.initialDebt }));
  return db.prepare("SELECT * FROM suppliers WHERE id = ?").get(info.lastInsertRowid); 
}

function getSupplierDetails(supplierId) { const supplier = db.prepare('SELECT * FROM suppliers WHERE id = ?').get(supplierId); if (!supplier) return null; const receipts = db.prepare('SELECT * FROM receipts WHERE supplier_id = ? ORDER BY date DESC').all(supplierId); const payments = db.prepare('SELECT * FROM payments WHERE supplier_id = ? ORDER BY date DESC').all(supplierId); return { ...supplier, receipts, payments }; }

const updateReceipt = db.transaction((id, data) => { const old = db.prepare('SELECT * FROM receipts WHERE id = ?').get(id); if(!old) return { success: false, error: 'Not found' }; const diff = Number(data.amount) - old.amount; db.prepare('UPDATE receipts SET amount = ?, date = ?, note = ? WHERE id = ?').run(Number(data.amount), data.date, data.note, id); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = CASE WHEN (total_debt + ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, old.supplier_id); logAudit('Admin', 'UPDATE_RECEIPT', JSON.stringify({ amount: data.amount })); return { success: true }; });
const updatePayment = db.transaction((id, data) => { const old = db.prepare('SELECT * FROM payments WHERE id = ?').get(id); if(!old) return { success: false, error: 'Not found' }; const diff = Number(data.amount) - old.amount; db.prepare('UPDATE payments SET amount = ?, date = ?, note = ? WHERE id = ?').run(Number(data.amount), data.date, data.note, id); db.prepare("UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, old.supplier_id); logAudit('Admin', 'UPDATE_PAYMENT', JSON.stringify({ amount: data.amount })); return { success: true }; });

function updateSupplier(id, data) { try { const old = db.prepare('SELECT initial_debt, total_debt FROM suppliers WHERE id = ?').get(id); if (!old) return { success: false, error: 'Not found' }; const diff = Number(data.initialDebt) - old.initial_debt; db.prepare('UPDATE suppliers SET name = ?, phone = ?, initial_debt = ? WHERE id = ?').run(data.name, data.phone, data.initialDebt, id); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = CASE WHEN (total_debt + ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, id); logAudit('Admin', 'UPDATE_SUPPLIER', JSON.stringify({ name: data.name })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteSupplier(id) { try { const receipts = db.prepare("SELECT COUNT(*) as c FROM receipts WHERE supplier_id = ?").get(id).c; const payments = db.prepare("SELECT COUNT(*) as c FROM payments WHERE supplier_id = ?").get(id).c; if (receipts > 0 || payments > 0) return { success: false, errorKey: 'deleteProtected' }; db.prepare('DELETE FROM suppliers WHERE id = ?').run(id); logAudit('Admin', 'DELETE_SUPPLIER', JSON.stringify({ id })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteReceipt(id) { try { const receipt = db.prepare('SELECT amount, supplier_id FROM receipts WHERE id = ?').get(id); if (!receipt) return { success: false, error: 'Receipt not found' }; const transaction = db.transaction(() => { db.prepare('UPDATE suppliers SET total_debt = total_debt - ? WHERE id = ?').run(receipt.amount, receipt.supplier_id); db.prepare("UPDATE suppliers SET status = CASE WHEN total_debt <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(receipt.supplier_id); db.prepare('DELETE FROM receipts WHERE id = ?').run(id); }); transaction(); logAudit('Admin', 'DELETE_RECEIPT', JSON.stringify({ id })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deletePayment(id) { try { const payment = db.prepare('SELECT amount, supplier_id FROM payments WHERE id = ?').get(id); if (!payment) return { success: false, error: 'Payment not found' }; const transaction = db.transaction(() => { db.prepare('UPDATE suppliers SET total_debt = total_debt + ? WHERE id = ?').run(payment.amount, payment.supplier_id); db.prepare("UPDATE suppliers SET status = CASE WHEN total_debt <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(payment.supplier_id); db.prepare('DELETE FROM payments WHERE id = ?').run(id); }); transaction(); logAudit('Admin', 'DELETE_PAYMENT', JSON.stringify({ id })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteAgendaTask(id) { db.prepare("DELETE FROM agenda_tasks WHERE id = ?").run(id); logAudit('Admin', 'DELETE_TASK', JSON.stringify({ id })); return { success: true }; }
function rescheduleAgendaTask(id, newDate) { db.prepare("UPDATE agenda_tasks SET task_date = ? WHERE id = ?").run(newDate, id); logAudit('Admin', 'RESCHEDULE_TASK', JSON.stringify({ newDate })); return { success: true }; }

const addReceipt = db.transaction((data) => { const supplierId = Number(data.supplierId); const amount = Number(data.amount) || 0; const date = data.date || new Date().toISOString().split('T')[0]; const info = db.prepare('INSERT INTO receipts (supplier_id, amount, date, note) VALUES (?, ?, ?, ?)').run(supplierId, amount, date, data.note || ''); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = 'indebted' WHERE id = ?").run(amount, supplierId); logAudit('Admin', 'ADD_RECEIPT', JSON.stringify({ amount: amount })); return info.lastInsertRowid; });
const addPayment = db.transaction((data) => { const info = db.prepare('INSERT INTO payments (supplier_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.supplierId, data.amount, data.date, data.caisseSource || 'admin', data.note); db.prepare(`UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?`).run(data.amount, data.amount, data.supplierId); logAudit(data.caisseSource || 'Admin', 'ADD_PAYMENT', JSON.stringify({ amount: data.amount })); return info.lastInsertRowid; });

function getAdvances(employeeId) { if (employeeId) return db.prepare("SELECT * FROM advances WHERE employee_id = ? ORDER BY date DESC").all(employeeId); return db.prepare("SELECT a.*, e.name as employee_name FROM advances a JOIN employees e ON a.employee_id = e.id ORDER BY a.date DESC").all(); }
function addAdvance(data) { const info = db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.employeeId, data.amount, data.date, data.caisseSource || 'admin', data.note || ''); logAudit(data.caisseSource || 'Admin', 'ADD_ADVANCE', JSON.stringify({ amount: data.amount })); return { success: true, id: info.lastInsertRowid }; }


function calculateEmployeePayroll(employeeId, startDate, endDate, hourlyRate) { 
  const overlap = db.prepare(`SELECT start_date, end_date FROM salaries WHERE employee_id = ? AND start_date <= ? AND end_date >= ?`).get(employeeId, endDate, startDate);
  if (overlap) {
     // 🔴 نُرجع البيانات فقط لكي تترجمها الواجهة الأمامية
     return { isAlreadyPaid: true, overlapStart: overlap.start_date, overlapEnd: overlap.end_date };
  }

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
  const pendingAdvances = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE employee_id = ? AND status = 'pending'`).get(employeeId).total || 0; 
  const grossSalary = totalHours * hourlyRate; 
  const netSalary = grossSalary - pendingAdvances; 
  return { employeeId, startDate, endDate, totalHours: Number(totalHours.toFixed(2)), hourlyRate, grossSalary: Number(grossSalary.toFixed(2)), totalAdvances: pendingAdvances, netSalary: Number(netSalary.toFixed(2)) }; 
}


const paySalary = db.transaction((data) => { 
  try { 
    const empId = Number(data.employeeId); const pDate = data.date || new Date().toISOString().split('T')[0]; 
    db.prepare(`INSERT INTO salaries (employee_id, start_date, end_date, total_hours, hourly_rate, total_advances, net_salary, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(empId, data.startDate || '', data.endDate || '', Number(data.totalHours) || 0, Number(data.hourlyRate) || 0, Number(data.totalAdvances) || 0, Number(data.netSalary) || 0, pDate); 
    db.prepare(`UPDATE advances SET status = 'paid' WHERE employee_id = ? AND status = 'pending'`).run(empId); 
    if (Number(data.netSalary) < 0) { 
      db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note, status) VALUES (?, ?, ?, ?, ?, ?)').run(empId, Math.abs(Number(data.netSalary)), pDate, 'admin', data.rolloverNote || `ترحيل ديون سلفيات`, 'pending'); 
    } else if (Number(data.netSalary) > 0) { 
      db.prepare(`INSERT INTO expenses (description, category, amount, date, caisse_source) VALUES (?, ?, ?, ?, ?)`).run(data.expenseNote || `راتب`, 'salaries', Number(data.netSalary), pDate, 'admin'); 
    } 
    logAudit('Admin', 'PAY_SALARY', JSON.stringify({ amount: data.netSalary }));
    return { success: true }; 
  } catch (error) { return { success: false, error: error.message }; } 
});

function getAgendaTasks() { return db.prepare("SELECT * FROM agenda_tasks ORDER BY task_date ASC, task_time ASC").all(); }
function addAgendaTask(data) { const info = db.prepare('INSERT INTO agenda_tasks (title, type, task_date, task_time, amount) VALUES (?, ?, ?, ?, ?)').run(data.title, data.type, data.date, data.time || '', data.amount || 0); logAudit('Admin', 'ADD_TASK', JSON.stringify({ title: data.title })); return { ...data, id: info.lastInsertRowid, status: 'pending' }; }
function toggleAgendaTaskStatus(id, status) { db.prepare('UPDATE agenda_tasks SET status = ? WHERE id = ?').run(status, id); logAudit('Admin', 'UPDATE_TASK_STATUS', JSON.stringify({ status })); return { success: true }; }
function getDueThisWeek() { const today = new Date(); const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7); return db.prepare(`SELECT SUM(amount) as total FROM agenda_tasks WHERE type = 'payment' AND status = 'pending' AND task_date >= ? AND task_date <= ?`).get(today.toISOString().split('T')[0], nextWeek.toISOString().split('T')[0]).total || 0; }
function getDailySummary(date) { try { const expenses = db.prepare(`SELECT SUM(amount) as total FROM expenses WHERE date = ?`).get(date).total || 0; const payments = db.prepare(`SELECT SUM(amount) as total FROM payments WHERE date = ?`).get(date).total || 0; const advances = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE date = ?`).get(date).total || 0; return { success: true, data: { expenses, supplierPayments: payments, advances, totalOut: expenses + payments + advances } }; } catch (error) { return { success: false, error: error.message }; } }

function getAuditLogs() { return db.prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100").all(); }
function deleteExpense(id, username) { 
  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(id); 
  if (expense) logAudit(username || 'Admin', 'DELETE_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount })); 
  return { success: db.prepare('DELETE FROM expenses WHERE id = ?').run(id).changes > 0 }; 
}

function getDailyClosures() {
  try {
    const closures = db.prepare("SELECT * FROM daily_closures ORDER BY id DESC").all();
    return { success: true, data: closures };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


// ==========================================
// دوال الخريطة والمخزون التفاعلي (Space Management)
// ==========================================

function getStoreMapData() {
  try {
    const zonesConfig = db.prepare("SELECT id, t_key as tKey, name FROM store_zones").all();
    const shelves = db.prepare("SELECT id, zone_id as zoneId, name, type, capacity FROM store_shelves").all();
    
    // جلب المنتجات الموجودة في كل رف مع أسمائها النظيفة
    const products = db.prepare(`
      SELECT sp.shelf_id, sp.barcode, sp.quantity, mp.clean_name 
      FROM shelf_products sp 
      JOIN mapped_products mp ON sp.barcode = mp.barcode
    `).all();

    // دمج المنتجات مع الرفوف وحساب الحالة (Status)
    const shelvesWithStock = shelves.map(shelf => {
      const shelfProds = products.filter(p => p.shelf_id === shelf.id);
      const currentStock = shelfProds.reduce((sum, p) => sum + p.quantity, 0);
      
      let status = 'good';
      if (currentStock === 0) status = 'empty';
      else if ((currentStock / shelf.capacity) < 0.3) status = 'low';

      return { 
        ...shelf, 
        currentStock, 
        status, 
        products: shelfProds // لمعرفة ما بداخل الرف بالتفصيل عند الضغط عليه
      };
    });

    return { success: true, data: { zonesConfig, shelves: shelvesWithStock } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// هذه الدالة هي "الجسر" الذي سيستقبل بيانات الـ PDF ويحدث الرفوف
const processPdfInventoryEntry = db.transaction((shelfId, barcode, cleanName, dirtyNameFromPdf, quantityAdded) => {
  try {
    // 1. نظام القاموس: التأكد من وجود المنتج أو إضافته وتحديث الأسماء القذرة
    const existingProduct = db.prepare("SELECT * FROM mapped_products WHERE barcode = ?").get(barcode);
    if (!existingProduct) {
      // منتج جديد تماماً
      db.prepare("INSERT INTO mapped_products (barcode, clean_name, dirty_names) VALUES (?, ?, ?)").run(barcode, cleanName, JSON.stringify([dirtyNameFromPdf]));
    } else {
      // منتج موجود، نتأكد من أن الاسم القادم من الـ PDF محفوظ في ذاكرته
      let dirtyNames = JSON.parse(existingProduct.dirty_names || '[]');
      if (dirtyNameFromPdf && !dirtyNames.includes(dirtyNameFromPdf)) {
        dirtyNames.push(dirtyNameFromPdf);
        db.prepare("UPDATE mapped_products SET dirty_names = ? WHERE barcode = ?").run(JSON.stringify(dirtyNames), barcode);
      }
    }

    // 2. تحديث المخزون داخل الرف المحدد
    const existingShelfProd = db.prepare("SELECT * FROM shelf_products WHERE shelf_id = ? AND barcode = ?").get(shelfId, barcode);
    if (existingShelfProd) {
      db.prepare("UPDATE shelf_products SET quantity = quantity + ? WHERE id = ?").run(quantityAdded, existingShelfProd.id);
    } else {
      db.prepare("INSERT INTO shelf_products (shelf_id, barcode, quantity) VALUES (?, ?, ?)").run(shelfId, barcode, quantityAdded);
    }

    logAudit('System', 'UPDATE_INVENTORY', JSON.stringify({ barcode, qty: quantityAdded, shelfId }));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

function saveMapLayout(items) {
  try {
    const deleteStmt = db.prepare('DELETE FROM map_layout');
    const insertStmt = db.prepare('INSERT INTO map_layout (id, type, row, col, rotation, name, capacity) VALUES (?, ?, ?, ?, ?, ?, ?)');
    
    db.transaction(() => {
      deleteStmt.run(); // مسح المخطط القديم
      for(let item of items) {
        insertStmt.run(item.id, item.type, item.row, item.col, item.rotation, item.name, item.capacity);
      }
    })();
    logAudit('Admin', 'SAVE_STORE_MAP', 'تم تحديث المخطط ثلاثي الأبعاد للمحل');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function getMapLayout() {
  try {
    const layout = db.prepare('SELECT * FROM map_layout').all();
    return { success: true, data: layout };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


function getAllShiftsSummary() {
  try {
    const shifts = db.prepare("SELECT * FROM shifts WHERE archived = 0 OR archived IS NULL ORDER BY id DESC").all();
    let grandTotalSales = 0, grandTotalOpening = 0, grandTotalActual = 0;

    const detailedShifts = shifts.map(shift => {
      let expensesRow, paymentsRow, advancesRow;
      if (shift.cashier_name === 'المدير العام' || shift.cashier_name === 'Super Admin' || shift.cashier_name === 'admin') {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ?").get(shift.start_time);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ?").get(shift.start_time);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ?").get(shift.start_time);
      } else {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ?").get(shift.cashier_name, shift.start_time);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ?").get(shift.cashier_name, shift.start_time);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ?").get(shift.cashier_name, shift.start_time);
      }

      const totalOut = (expensesRow?.total || 0) + (paymentsRow?.total || 0) + (advancesRow?.total || 0);
      const shiftSales = shift.actual_cash ? (Number(shift.actual_cash) + totalOut) - Number(shift.opening_balance) : 0;

      if (shift.status === 'closed') {
        grandTotalSales += shiftSales;
        grandTotalActual += Number(shift.actual_cash || 0);
      }
      grandTotalOpening += Number(shift.opening_balance || 0);

      return { ...shift, totalOut, calculatedSales: shiftSales };
    });

    return { success: true, data: { shifts: detailedShifts, grandTotals: { opening: grandTotalOpening, actual: grandTotalActual, sales: grandTotalSales } } };
  } catch (error) { return { success: false, error: error.message }; }
}

function closeBusinessDay(adminName) {
  try {
    const openShifts = db.prepare("SELECT count(*) as count FROM shifts WHERE status = 'open' AND (archived = 0 OR archived IS NULL)").get();
    if (openShifts.count > 0) return { success: false, message: 'has_open_shifts' };

    const summaryRes = getAllShiftsSummary();
    if (!summaryRes.success || summaryRes.data.shifts.length === 0) return { success: false, message: 'no_shifts_to_close' };
    
    const totals = summaryRes.data.grandTotals;
    const stmt = db.prepare("INSERT INTO daily_closures (closure_date, total_opening, total_actual, total_sales, closed_by) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(new Date().toISOString(), totals.opening, totals.actual, totals.sales, adminName);
    const closureId = info.lastInsertRowid; 

    db.prepare("UPDATE shifts SET archived = 1, daily_closure_id = ? WHERE archived = 0 OR archived IS NULL").run(closureId);
    logAudit(adminName, 'CLOSE_DAY', JSON.stringify({ sales: totals.sales, actual: totals.actual }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getArchivedZReport(closureId) {
  try {
    const closure = db.prepare("SELECT * FROM daily_closures WHERE id = ?").get(closureId);
    if (!closure) return { success: false, message: 'not_found' };

    const shifts = db.prepare("SELECT * FROM shifts WHERE daily_closure_id = ?").all(closureId);
    const detailedShifts = shifts.map(shift => {
      let expensesRow, paymentsRow, advancesRow;
      const endTimeLimit = shift.end_time || new Date().toISOString();
      
      if (shift.cashier_name === 'المدير العام' || shift.cashier_name === 'Super Admin' || shift.cashier_name === 'admin') {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ? AND created_at <= ?").get(shift.start_time, endTimeLimit);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ? AND created_at <= ?").get(shift.start_time, endTimeLimit);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ? AND created_at <= ?").get(shift.start_time, endTimeLimit);
      } else {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ? AND created_at <= ?").get(shift.cashier_name, shift.start_time, endTimeLimit);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ? AND created_at <= ?").get(shift.cashier_name, shift.start_time, endTimeLimit);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ? AND created_at <= ?").get(shift.cashier_name, shift.start_time, endTimeLimit);
      }
      const totalOut = (expensesRow?.total || 0) + (paymentsRow?.total || 0) + (advancesRow?.total || 0);
      const shiftSales = shift.actual_cash ? (Number(shift.actual_cash) + totalOut) - Number(shift.opening_balance) : 0;
      return { ...shift, totalOut, calculatedSales: shiftSales };
    });

    return { success: true, data: { closure, shifts: detailedShifts } };
  } catch (error) { return { success: false, error: error.message }; }
}
// دالة حذف سلعة من الرف
function deleteShelfProduct(productId) {
  try {
    db.prepare('DELETE FROM shelf_products WHERE id = ?').run(productId);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

// دالة تعديل سلعة في الرف
function updateShelfProduct(productId, cleanName, quantity) {
  try {
    const sp = db.prepare('SELECT barcode FROM shelf_products WHERE id = ?').get(productId);
    if(sp) {
       db.prepare('UPDATE mapped_products SET clean_name = ? WHERE barcode = ?').run(cleanName, sp.barcode);
       db.prepare('UPDATE shelf_products SET quantity = ? WHERE id = ?').run(quantity, productId);
    }
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}
async function backupDatabase(destPath) { try { await db.backup(destPath); return { success: true }; } catch (error) { throw error; } }
// دالة استيراد ديون الموردين الذكية
async function importSuppliersFromExcel(filePath) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    
    let supplierName = "";
    let finalDebt = 0;
    
    // 1. استخراج الاسم من أول 10 أسطر في العمود الرابع (D) أو الثالث (C)
    for (let i = 1; i <= 10; i++) {
      let cellValue = worksheet.getRow(i).getCell(4).value; // العمود D
      if (!cellValue) cellValue = worksheet.getRow(i).getCell(3).value; // احتياطياً العمود C
      
      if (cellValue && typeof cellValue === 'string') {
        const val = cellValue.trim();
        // تجاهل التواريخ والعناوين مثل Date أو Montant
        if (val !== '' && !val.toLowerCase().includes('date') && !val.toLowerCase().includes('montant') && !val.toLowerCase().startsWith('le') && !/\d{2}\/\d{2}\/\d{4}/.test(val)) {
          supplierName = val;
          break;
        }
      }
    }
    
    // إذا لم نعثر على الاسم في الخلايا (مثل ملف DANOUN)، نأخذه من اسم الملف ذكياً
    if (!supplierName) {
      const path = require('path');
      let baseName = path.basename(filePath, path.extname(filePath));
      // تنظيف اسم الملف من الأرقام في البداية والأقواس (مثل "15 Fateh (1)" -> "Fateh")
      supplierName = baseName.replace(/^\d+\s*/, '').replace(/\(\d+\)/g, '').trim();
    }
    
    // 2. استخراج الرصيد النهائي من العمود السادس (F) المسمى Reste
    worksheet.eachRow((row, rowNumber) => {
      let cellValue = row.getCell(6).value; // العمود F
      
      // دعم قراءة الأرقام سواء كانت قيم مباشرة أو ناتجة عن معادلات إكسيل
      let val = (cellValue && typeof cellValue === 'object' && cellValue.result !== undefined) 
                ? cellValue.result 
                : cellValue;
      
      if (val !== null && val !== undefined && val !== '') {
        // محاولة تحويل القيمة إلى رقم (إزالة المسافات وتوحيد الفواصل)
        const num = parseFloat(val.toString().replace(/\s/g, '').replace(',', '.'));
        if (!isNaN(num)) {
          finalDebt = num; // سيستمر بالتحديث حتى يصل لآخر سطر فيه رقم
        }
      }
    });
    
    // 3. إدخال أو تحديث المورد في قاعدة البيانات
    const exist = db.prepare("SELECT id FROM suppliers WHERE name = ?").get(supplierName);
    const status = finalDebt > 0 ? 'indebted' : 'clear';

    if (exist) {
       // المورد موجود مسبقاً، نقوم بتحديث دينه إلى الرقم النهائي الموجود في الإكسيل
       db.prepare("UPDATE suppliers SET initial_debt = ?, total_debt = ?, status = ? WHERE id = ?").run(finalDebt, finalDebt, status, exist.id);
    } else {
       // مورد جديد، نقوم بإنشائه
       db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`).run(supplierName, '-', finalDebt, finalDebt, status);
    }
    
    logAudit('System', 'IMPORT_EXCEL', `استيراد ديون المورد ${supplierName} بمبلغ ${finalDebt}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}// دالة الذاكرة الذكية: فحص المنتجات المستخرجة من الـ PDF
function enrichExtractedItems(items) {
  try {
    // نبحث عن الباركود في جدول القاموس، ونجلب الرف الخاص به من جدول رفوف الخريطة
    const stmt = db.prepare(`
      SELECT mp.clean_name, sp.shelf_id 
      FROM mapped_products mp 
      LEFT JOIN shelf_products sp ON mp.barcode = sp.barcode 
      WHERE mp.barcode = ?
    `);
    
    return items.map(item => {
      const mapping = stmt.get(item.barcode);
      if (mapping) {
        return {
          ...item,
          cleanName: mapping.clean_name,
          selectedShelf: mapping.shelf_id || '',
          isKnown: true // 🧠 النظام تعرف على المنتج!
        };
      }
      return {
        ...item,
        cleanName: item.dirtyName, // كقيمة افتراضية
        selectedShelf: '',
        isKnown: false // منتج جديد يدوياً
      };
    });
  } catch (error) {
    console.error("Enrichment Error:", error);
    return items;
  }
}


module.exports = {
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, addEmployee, 
  handlePinEntry, getExpenses, addExpense, deleteExpense, updateExpense, getTodayAttendance,
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary, updateReceipt, updatePayment,
  getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek, deleteAgendaTask,
  rescheduleAgendaTask, getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,
  getUsers, addUser, deleteUser,dbPath,
  updateEmployee, deleteEmployee, logAudit, getAuditLogs, generateExcelBackup, backupDatabase, importSuppliersFromExcel, deleteSupplier, updateSupplier , deleteReceipt, deletePayment, updateAdvance, deleteAdvance, 
  getAllShiftsSummary, closeBusinessDay, getDailyClosures, getArchivedZReport, updateAttendanceRecord, getStoreMapData, processPdfInventoryEntry, enrichExtractedItems, saveMapLayout, getMapLayout,getStoreLayouts, saveStoreLayout, deleteStoreLayout, activateStoreLayout, getShelfProducts, deleteShelfProduct, updateShelfProduct
};
```

---

## `licenseManager.js`

```javascript
const { machineIdSync } = require('node-machine-id');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');

// 🔴 نضع الكلمة السرية مباشرة هنا بدون استخدام .env
const SECRET_SALT = "GHERBI_POS_SECRET_KEY_2026"; 

// مسار حفظ مفتاح التفعيل في حاسوب الزبون
const licensePath = path.join(app.getPath('userData'), 'system_license.key');

function getHardwareId() {
    try {
        const hwid = machineIdSync(true); 
        return hwid.toUpperCase();
    } catch (error) {
        return "UNKNOWN_DEVICE";
    }
}

function generateExpectedKey() {
    const hwid = getHardwareId();
    // استخدام نفس الكلمة السرية
    const hash = crypto.createHash('sha256').update(hwid + SECRET_SALT).digest('hex');
    const rawKey = hash.substring(0, 20).toUpperCase();
    return `${rawKey.substring(0,5)}-${rawKey.substring(5,10)}-${rawKey.substring(10,15)}-${rawKey.substring(15,20)}`;
}

function checkIsActivated() {
    try {
        if (fs.existsSync(licensePath)) {
            const savedKey = fs.readFileSync(licensePath, 'utf8').trim();
            const expectedKey = generateExpectedKey();
            return savedKey === expectedKey;
        }
        return false;
    } catch (e) {
        return false;
    }
}

function activateApp(userInputKey) {
    const expectedKey = generateExpectedKey();
    
    // إزالة المسافات وتوحيد الحروف لتجنب أخطاء النسخ واللصق
    if (userInputKey.trim().toUpperCase() === expectedKey) {
        fs.writeFileSync(licensePath, userInputKey.trim().toUpperCase());
        return { success: true };
    }
    
    return { success: false, message: 'invalid_key' };
}

module.exports = { 
    getHardwareId, 
    checkIsActivated, 
    activateApp, 
    generateExpectedKey 
};
```

---

## `main.js`

```javascript
const { app, BrowserWindow, ipcMain , Notification, dialog } = require('electron');
const db = require('./database'); 
const path = require('path');
const fs = require('fs');
// أضف هذا السطر لإخفاء تحذيرات الأمان أثناء التطوير
const licenseManager = require('./licenseManager');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const { 
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, 
  addEmployee, handlePinEntry, getExpenses, addExpense, deleteExpense, 
  updateExpense, getTodayAttendance, 
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary , getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask , getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,dbPath,
  getUsers, addUser, deleteUser, updateEmployee, deleteEmployee ,logAudit , getAuditLogs, backupDatabase, getShelfProducts,
  generateExcelBackup, updateSupplier, deleteSupplier, updateAdvance, deleteAdvance, getAllShiftsSummary , getDailyClosures, getArchivedZReport,updateAttendanceRecord,getStoreMapData, processPdfInventoryEntry, enrichExtractedItems, closeBusinessDay, getSuppliersList, saveInvoiceDebt, saveMapLayout, getMapLayout, getStoreLayouts, saveStoreLayout, deleteStoreLayout, activateStoreLayout
  , deleteReceipt, deletePayment, updateReceipt, updatePayment, importSuppliersFromExcel, deleteShelfProduct, updateShelfProduct, setWindowsTime
} = require('./database');

// 👇 استدعاء آمن للمكتبة ليتوافق مع جميع إصدارات Electron و Node.js
const pdfParseRaw = require('pdf-parse');
const parsePDF = typeof pdfParseRaw === 'function' ? pdfParseRaw : pdfParseRaw.default;
const { exec } = require('child_process');

const express = require('express');
const cors = require('cors');

ipcMain.handle('delete-shelf-product', (e, id) => db.deleteShelfProduct(id));
ipcMain.handle('update-shelf-product', (e, id, name, qty) => db.updateShelfProduct(id, name, qty));
function createWindow() {
  // 1. إنشاء شاشة الإقلاع أولاً
  const splash = new BrowserWindow({
    width: 650,
    height: 400,
    transparent: true, 
    frame: false,      
    alwaysOnTop: true, 
    icon: path.join(__dirname, 'assets', 'icon.png'), // 🔴 إضافة اللوجو هنا
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  splash.loadFile(path.join(__dirname, 'splash.html'));

  // 2. إنشاء النافذة الرئيسية
  const win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    show: false, 
    icon: path.join(__dirname, 'assets', 'icon.png'), // 🔴 إضافة اللوجو لشريط المهام
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);

  // 👇==== الحل السحري للشاشة البيضاء ====👇
  const isDev = !app.isPackaged; // هل نحن في وضع التطوير أم الإنتاج (exe)؟

  if (isDev) {
    // في وضع التطوير: اقرأ من سيرفر React
    win.loadURL('http://localhost:5173'); 
  } else {
    // في وضع الإنتاج (exe): اقرأ من الملفات المبنية مباشرة
    win.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
  // 👆=====================================👆

  // 3. إظهار النافذة بعد التحميل
  win.once('ready-to-show', () => {
    setTimeout(() => {
      if (!splash.isDestroyed()) {
        splash.close(); 
      }
      win.show(); 
    }, 3000); 
  });
}
// 👇===== الكود السحري لتوحيد وتصحيح التوقيت المحلي لجميع صفحات البرنامج =====👇
function fixDatesGlobal(data) {
  if (!data || typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(item => fixDatesGlobal(item));
  
  const obj = { ...data };
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      // البحث عن أي نص يشبه التوقيت العالمي (سواء بصيغة Node.js أو SQLite)
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
      const sqliteRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      
      if (isoRegex.test(value)) {
        const d = new Date(value);
        const pad = (n) => n.toString().padStart(2, '0');
        obj[key] = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      } else if (sqliteRegex.test(value)) {
        // إضافة Z لكي يتعرف عليه كأنه توقيت عالمي ويضيف له فارق الساعات الخاص بدولتك
        const d = new Date(value.replace(' ', 'T') + 'Z');
        const pad = (n) => n.toString().padStart(2, '0');
        obj[key] = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      }
    } else if (value !== null && typeof value === 'object') {
      obj[key] = fixDatesGlobal(value);
    }
  }
  return obj;
}

// 🔴 اعتراض كل الطلبات المرسلة للواجهة الأمامية وتمريرها على الفلتر أولاً
const originalIpcHandle = ipcMain.handle;
ipcMain.handle = function(channel, listener) {
  return originalIpcHandle.call(this, channel, async (event, ...args) => {
    const result = await listener(event, ...args);
    return fixDatesGlobal(result); // إرسال بيانات نظيفة بالوقت الصحيح
  });
};
// 👆========================================================================👆
function setupIpcHandlers() {
ipcMain.handle('login', async (event, credentials) => {
  console.log("==================================");
  console.log("👤 استلمت طلب الدخول من الواجهة:", credentials.username);
  
  try {
    // هنا نقوم باستدعاء الدالة المحصنة التي برمجناها في database.js
    const result = verifyLogin(credentials.username, credentials.password);
    console.log("📦 النتيجة المُرسلة للواجهة:", result);
    return result;
  } catch (error) {
    console.error("🔥 خطأ في كوبري الدخول:", error);
    return { success: false, message: 'serverError' };
  }
});
  ipcMain.handle('get-suppliers', () => getSuppliers());
  ipcMain.handle('add-supplier', (event, data) => addSupplier(data));
  

// 🔴 مسار تصحيح وقت الويندوز تلقائياً من داخل البرنامج (النسخة المدرعة)
  ipcMain.handle('set-windows-time', async (event, datetimeStr) => {
    return new Promise((resolve) => {
      try {
        // 1. تحويل الوقت القادم من الواجهة إلى كائن Date 
        const dateObj = new Date(datetimeStr);
        
        // التحقق من أن التاريخ صالح لتجنب تحطم السكريبت
        if (isNaN(dateObj.getTime())) {
          console.error("🔥 خطأ: التاريخ المرسل غير صالح:", datetimeStr);
          return resolve({ success: false, error: "invalid_date" });
        }
        
        // 2. تحويل التاريخ لصيغة ISO العالمية (تفهمها كل أنظمة الويندوز مهما كانت لغتها)
        const safeIsoDate = dateObj.toISOString(); 

        // 3. أمر PowerShell مدرع ضد مسافات النصوص وأخطاء الترجمة
        const command = `powershell.exe -Command "Start-Process powershell -Verb RunAs -WindowStyle Hidden -ArgumentList \\"-Command Set-Date -Date ([datetime]'${safeIsoDate}')\\""`;

        exec(command, (error) => {
          if (error) {
            console.error("🔥 خطأ في تحديث وقت الويندوز:", error);
            resolve({ success: false, error: error.message });
          } else {
            resolve({ success: true });
          }
        });
      } catch (err) {
        resolve({ success: false, error: err.message });
      }
    });
  });


  ipcMain.handle('get-supplier-details', (event, id) => getSupplierDetails(id));
  ipcMain.handle('add-receipt', (event, data) => {
    try { return { success: true, id: addReceipt(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });
  ipcMain.handle('add-payment', (event, data) => {
    try { return { success: true, id: addPayment(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });
  ipcMain.handle('save-map-layout', (event, items) => db.saveMapLayout(items));
  ipcMain.handle('get-map-layout', () => db.getMapLayout());
  ipcMain.handle('get-shelf-products', (event, shelfId) => db.getShelfProducts(shelfId));
  ipcMain.handle("print-receipt", async (event) => {
  
    const win = BrowserWindow.fromWebContents(event.sender);

    return new Promise((resolve)=>{

        win.webContents.print({

            silent:false,

            printBackground:true,

            margins:{
                marginType:"none"
            },

            scaleFactor:100,

            landscape:false,

            color:false

        },(success,errorType)=>{

            resolve({
                success,
                errorType
            });

        });

    });

});
  

  // --- مسارات الخريطة والمخزون الذكي ---
  ipcMain.handle('get-store-map-data', () => getStoreMapData());
  ipcMain.handle('process-pdf-inventory', (event, data) => processPdfInventoryEntry(data.shelfId, data.barcode, data.cleanName, data.dirtyName, data.quantity));

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
  ipcMain.handle('get-store-layouts', () => db.getStoreLayouts());
  ipcMain.handle('save-store-layout', (event, data) => db.saveStoreLayout(data));
  ipcMain.handle('delete-store-layout', (event, id) => db.deleteStoreLayout(id));
  ipcMain.handle('activate-store-layout', (event, id) => db.activateStoreLayout(id));
  // 🌟 مسارات استيراد الفواتير الذكية (PDF) 🌟
  
  // 1. جلب قائمة الموردين للنافذة المنسدلة
  ipcMain.handle('get-suppliers-list', async () => {
    try {
      // نستخدم دالة getSuppliers الموجودة لديك مسبقاً في database.js
      const suppliers = getSuppliers(); 
      return { success: true, data: suppliers };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // 2. ترحيل الفاتورة كدين (إضافة وصل استلام فاتورة)
  ipcMain.handle('save-invoice-debt', async (event, data) => {
    try {
      // تجهيز البيانات لتتناسب مع دالة addReceipt الموجودة لديك
      const receiptData = {
        supplierId: data.supplierId,
        amount: data.totalAmount,
        date: data.date,
        // إضافة ملاحظة توثيقية آلية لحماية حقوق المحل
        notes: `فاتورة مستوردة آلياً (PDF) - الاسم المصدر بالملف: ${data.pdfSupplierName}` 
      };
      
      const newId = addReceipt(receiptData);
      return { success: true, id: newId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
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


  ipcMain.handle('check-activation', () => licenseManager.checkIsActivated());
  ipcMain.handle('get-hardware-id', () => licenseManager.getHardwareId());
  ipcMain.handle('activate-app', (event, key) => licenseManager.activateApp(key));

  
ipcMain.handle('get-users', () => getUsers());
  ipcMain.handle('add-user', (event, data) => addUser(data));
  ipcMain.handle('delete-user', (event, id) => deleteUser(id));


  ipcMain.handle('update-employee', (event, id, data) => updateEmployee(id, data));
  ipcMain.handle('delete-employee', (event, id) => deleteEmployee(id));

  ipcMain.handle('get-audit-logs', () => getAuditLogs());

  ipcMain.handle('delete-expense', (event, id, username) => deleteExpense(id, username));
  
  ipcMain.handle('close-business-day', async (event, adminName) => closeBusinessDay(adminName));

  ipcMain.handle('get-archived-zreport', async (event, id) => getArchivedZReport(id));
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
        res.json({ success: true, data: fixDatesGlobal(result) });
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
// 2. استعادة البيانات
  ipcMain.handle('restore-database', async () => {
    
    // 🔴 لقد قمنا بحذف تعريف dbPath من هنا، لأنه سيستخدم المسار القادم من database.js مباشرة!
    
    // فتح نافذة للمستخدم لاختيار ملف النسخة الاحتياطية
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'اختيار ملف النسخة الاحتياطية (Select Backup File)',
      properties: ['openFile'],
      filters: [
        { name: 'Database Files', extensions: ['db', 'sqlite', 'sqlite3'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    try {
      const sourcePath = filePaths[0];
      
      const buffer = Buffer.alloc(16);
      const fd = fs.openSync(sourcePath, 'r');
      fs.readSync(fd, buffer, 0, 16, 0);
      fs.closeSync(fd);
      
      const header = buffer.toString('utf8');
      if (!header.startsWith('SQLite format 3')) {
        return { success: false, error: 'invalid_format' }; 
      }

      // 🔴 هنا سيقوم بنسخ الملف المختار واستبداله بالمسار الأصلي المعرف في database.js
      fs.copyFileSync(sourcePath, dbPath);
      
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
      title: 'استيراد ديون الموردين من ملفات إكسيل',
      properties: ['openFile', 'multiSelections'], // 🔴 تفعيل التحديد المتعدد
      filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    let successCount = 0;
    let errors = [];

    // قراءة كل الملفات المحددة واحداً تلو الآخر
    for (let filePath of filePaths) {
      const res = await db.importSuppliersFromExcel(filePath);
      if (res.success) {
        successCount++;
      } else {
        errors.push(`${require('path').basename(filePath)}: ${res.error}`);
      }
    }

    if (successCount > 0) {
      return { success: true, count: successCount, error: errors.join('\n') };
    } else {
      return { success: false, error: errors.join('\n') };
    }
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



ipcMain.handle('parse-pdf-invoice', async () => {
    try {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        title: 'اختر ملف PDF (Bon de Livraison)',
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
      });

      if (canceled || filePaths.length === 0) return { success: false, canceled: true };

      const PDFParser = require("pdf2json");
      
      return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        
        pdfParser.on("pdfParser_dataError", errData => {
           resolve({ success: false, error: "تعذر قراءة هيكل الملف." });
        });
        
        pdfParser.on("pdfParser_dataReady", pdfData => {
            let text = pdfParser.getRawTextContent();
            text = text.replace(/\r\n/g, '\n');
            
            const lines = text.split('\n');
            let extractedItems = [];
            
            // 🌟 كائن جديد لتخزين بيانات الفاتورة الأساسية
            let invoiceMeta = {
              supplierName: "",
              totalAmount: 0
            };

            for (let line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine) continue;

              // 1. استخراج اسم المورد
              if (trimmedLine.toUpperCase().includes('FOURNISSEUR')) {
                // استخراج ما بعد كلمة Fournisseur أو النقطتين
                const parts = trimmedLine.split(/[:|]/);
                if (parts.length > 1) {
                  invoiceMeta.supplierName = parts[1].trim();
                }
              }

              // 2. استخراج المبلغ الإجمالي
              if (trimmedLine.toUpperCase().includes('NET A PAYER') || trimmedLine.toUpperCase().includes('TOTAL TTC')) {
                // قنص الأرقام فقط من السطر (مع الفاصلة والنقطة)
                let amountStr = trimmedLine.replace(/[^0-9,.]/g, '');
                // توحيد الفواصل العشرية
                amountStr = amountStr.replace(',', '.');
                // بما أن الرقم قد يحتوي على مسافات (مثال 39 390)، استخراج الرقم كالتالي:
                const amountMatches = trimmedLine.match(/[\d\s]+[.,]\d{2}/);
                if (amountMatches) {
                   const cleanAmount = parseFloat(amountMatches[0].replace(/\s/g, '').replace(',', '.'));
                   if (!isNaN(cleanAmount)) {
                     invoiceMeta.totalAmount = cleanAmount;
                   }
                }
              }

              // 3. استخراج السلع (الخوارزمية المدرعة السابقة)
              const columns = trimmedLine.split(/\s{3,}/).map(col => col.trim());

              if (columns.length >= 5 && /^\d+$/.test(columns[0])) {
                const id = columns[0];
                const barcode = columns[1];
                
                const qtyIndex = columns.length - 4;
                const finalQtyIndex = qtyIndex > 1 ? qtyIndex : 2;
                
                const qtyStr = columns[finalQtyIndex];
                const qty = parseFloat(qtyStr.replace(/\s/g, '').replace(',', '.'));
                
                if (!isNaN(qty)) {
                  const dirtyName = columns.slice(2, finalQtyIndex).join(' ');
                  extractedItems.push({
                    id: id,
                    barcode: barcode,
                    dirtyName: dirtyName || "بدون اسم",
                    quantity: qty,
                  });
                }
              }
            }

            const enrichedItems = enrichExtractedItems(extractedItems);
            
            // 🌟 نرجع السلع + بيانات الفاتورة للواجهة الأمامية
            resolve({ success: true, data: enrichedItems, meta: invoiceMeta });
        });
        
        pdfParser.loadPDF(filePaths[0]);
      });

    } catch (error) {
      return { success: false, error: error.message };
    }
  });

ipcMain.handle('update-advance', (event, payload) => updateAdvance(payload.id, payload.data));
ipcMain.handle('delete-advance', (event, id) => deleteAdvance(id));

ipcMain.handle('get-all-shifts-summary', async () => getAllShiftsSummary());
ipcMain.handle('get-daily-closures', async () => getDailyClosures());
ipcMain.handle('update-attendance-record', (event, id, timeIn, timeOut) => updateAttendanceRecord(id, timeIn, timeOut)); 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

---

## `package.json`

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
    "dotenv": "^17.4.2",
    "exceljs": "^4.4.0",
    "express": "^5.2.1",
    "node-machine-id": "^1.1.12",
    "pdf-parse": "^1.1.1",
    "pdf2json": "^4.0.3"
  },
  "devDependencies": {
    "@electron/rebuild": "^4.2.0",
    "electron": "^43.1.1",
    "electron-builder": "^24.13.3"
  }
}

```

---

## `preload.js`

```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  login: (credentials) => ipcRenderer.invoke('login', credentials),
  printReceipt: () => ipcRenderer.invoke("print-receipt"),
  getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
  addSupplier: (data) => ipcRenderer.invoke('add-supplier', data),
  getSupplierDetails: (id) => ipcRenderer.invoke('get-supplier-details', id),
  addReceipt: (data) => ipcRenderer.invoke('add-receipt', data),
  addPayment: (data) => ipcRenderer.invoke('add-payment', data),
  
  getEmployees: () => ipcRenderer.invoke('get-employees'),
  addEmployee: (data) => ipcRenderer.invoke('add-employee', data),
  handlePinEntry: (pinCode) => ipcRenderer.invoke('handle-pin-entry', pinCode),
  getTodayAttendance: (date) => ipcRenderer.invoke('get-today-attendance', date),
  
  getStoreMapData: () => ipcRenderer.invoke('get-store-map-data'),
  processPdfInventory: (data) => ipcRenderer.invoke('process-pdf-inventory', data),

  parsePdfInvoice: () => ipcRenderer.invoke('parse-pdf-invoice'),
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
  getSuppliersList: () => ipcRenderer.invoke('get-suppliers-list'),
  saveInvoiceDebt: (data) => ipcRenderer.invoke('save-invoice-debt', data),
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
  deleteAdvance: (id) => ipcRenderer.invoke('delete-advance', id),
  getAllShiftsSummary: () => ipcRenderer.invoke('get-all-shifts-summary'),
  getDailyClosures: () => ipcRenderer.invoke('get-daily-closures'),
  closeBusinessDay: (adminName) => ipcRenderer.invoke('close-business-day', adminName),
  getArchivedZReport: (id) => ipcRenderer.invoke('get-archived-zreport', id),
  updateAttendanceRecord: (id, timeIn, timeOut) => ipcRenderer.invoke('update-attendance-record', id, timeIn, timeOut),
  saveMapLayout: (items) => ipcRenderer.invoke('save-map-layout', items),
  getMapLayout: () => ipcRenderer.invoke('get-map-layout'),
  getStoreLayouts: () => ipcRenderer.invoke('get-store-layouts'),
  saveStoreLayout: (data) => ipcRenderer.invoke('save-store-layout', data),
  deleteStoreLayout: (id) => ipcRenderer.invoke('delete-store-layout', id),
  activateStoreLayout: (id) => ipcRenderer.invoke('activate-store-layout', id),
  getShelfProducts: (shelfId) => ipcRenderer.invoke('get-shelf-products', shelfId),
  deleteShelfProduct: (id) => ipcRenderer.invoke('delete-shelf-product', id),
updateShelfProduct: (id, name, qty) => ipcRenderer.invoke('update-shelf-product', id, name, qty),
setWindowsTime: (datetimeStr) => ipcRenderer.invoke('set-windows-time', datetimeStr),
checkActivation: () => ipcRenderer.invoke('check-activation'),
  getHardwareId: () => ipcRenderer.invoke('get-hardware-id'),
  activateApp: (key) => ipcRenderer.invoke('activate-app', key),
  
});
```

---

## `project_structure39.md`

```markdown

```

---

## `splash.html`

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
        <!-- 🔴 هذا السطر هو الذي سيظهر صورتك بدلاً من النص -->
        <img src="./assets/icon.png" alt="Gherbi AI Logo" style="max-width: 220px; margin-bottom: 10px; drop-shadow: 0 4px 6px rgba(0,0,0,0.3);">
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
        <!-- 🔴 هذا السطر هو الذي سيظهر صورتك بدلاً من النص -->
        <img src="./assets/icon.png" alt="Gherbi AI Logo" style="max-width: 220px; margin-bottom: 10px; drop-shadow: 0 4px 6px rgba(0,0,0,0.3);">
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
    <title>GHERBI.AI POS System</title>
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
    "html2canvas": "^1.4.1",
    "i18next": "^26.3.6",
    "i18next-browser-languagedetector": "^8.2.1",
    "jspdf": "^4.2.1",
    "lucide-react": "^1.25.0",
    "react": "^19.2.7",
    "react-barcode": "^1.6.1",
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
  base: './',  // 🔴 هذا السطر هو الحل السحري! يخبر البرنامج أن يبحث عن الملفات في نفس المجلد
})
```

---

## `frontend\src\App.jsx`

```javascript
import React, { useState, useEffect } from 'react';
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
import POS from './components/pages/POS'; 
import DailyClosuresArchive from './components/DailyClosuresArchive';
import AuditLogs from './components/pages/AuditLogs';
import StoreMap from './components/pages/StoreMap'; 
import PdfImporter from './components/pages/PdfImporter'; 
import SystemClock from './components/ui/SystemClock'; 
import ActivationScreen from './components/ActivationScreen';
import Inventory from './components/pages/Inventory';
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};


const SuperAdminRoute = ({ children }) => {
  const user = useAuthStore(state => state.user);
  // السوبر أدمين فقط من يملك الصلاحية الآن
  const hasSuperAccess = user?.role === 'superadmin';
  if (!hasSuperAccess) return <Navigate to="/pos" replace />;
  return children;
};

const IndexRedirect = () => {
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin';
  return isSuperAdmin ? <Dashboard /> : <Navigate to="/pos" replace />; 
};

function App() {
  // --- حالة التفعيل ---
  const [isActivated, setIsActivated] = useState(null); // null = جاري التحقق

  useEffect(() => {
    const checkLicense = async () => {
      try {
        if (window.api && window.api.checkActivation) {
          const activated = await window.api.checkActivation();
          setIsActivated(activated);
        } else {
          // جعلناها false لتظهر الشاشة دائماً إذا لم يتم الاتصال بالباك اند بنجاح
          setIsActivated(false); 
        }
      } catch (err) {
        setIsActivated(false);
      }
    };
    
    checkLicense();
  }, []);

  // 1. شاشة التحميل (أثناء قراءة حالة التفعيل من النظام)
  if (isActivated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 font-sans" dir="rtl">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium tracking-wide">جاري فحص تراخيص النظام...</p>
      </div>
    );
  }

  // 2. إذا كان غير مفعل، نعرض شاشة التفعيل فقط (لن يتم تحميل باقي التطبيق نهائياً)
  if (isActivated === false) {
    return <ActivationScreen onActivate={() => setIsActivated(true)} />;
  }

  // 3. إذا كان مفعلاً بنجاح، يتم تحميل التطبيق الكامل
  return (
    <HashRouter>
      {/* 🔴 الساعة موضوعة هنا: خارج الـ Routes لكي تطفو فوق كل شاشات النظام ولا تعطل التوجيه */}
      <SystemClock />

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
          <Route path="suppliers" element={<SuperAdminRoute><Suppliers /></SuperAdminRoute>} />
          <Route path="hr" element={<SuperAdminRoute><HR /></SuperAdminRoute>} />
          <Route path="payroll" element={<SuperAdminRoute><Payroll /></SuperAdminRoute>} />
          <Route path="agenda" element={<SuperAdminRoute><Agenda /></SuperAdminRoute>} />
          
          {/* 👑 مسارات السوبر أدمين فقط */}
          <Route path="settings" element={<SuperAdminRoute><Settings /></SuperAdminRoute>} /> 
          <Route path="/archive" element={<DailyClosuresArchive />} />
          <Route path="audit-logs" element={<SuperAdminRoute><AuditLogs /></SuperAdminRoute>} />
          <Route path="inventory" element={<SuperAdminRoute><Inventory /></SuperAdminRoute>} />
          <Route path="store-map" element={<SuperAdminRoute><StoreMap /></SuperAdminRoute>} />
          <Route path="pdf-importer" element={<SuperAdminRoute><PdfImporter /></SuperAdminRoute>} />
          
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
import frTranslation from './locales/fr/translation.json'; 

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
  fr: { translation: frTranslation } 
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // اللغة البديلة في حال نقص أي كلمة
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

/* 🛠️ التنسيق العام للـ Ticket أثناء العرض على الشاشة */
.receipt-ticket-forced{

    width:80mm;

    min-width:80mm;

    max-width:80mm;

    margin:0;

    padding:2mm;

    box-sizing:border-box;

}

.header-title { text-align: center; font-size: 16px; font-weight: bold; margin: 0 0 1mm 0; }
.header-subtitle { text-align: center; font-size: 9px; letter-spacing: 1px; margin: 0 0 3mm 0; color: #333; text-transform: uppercase; }
.badge-action { display: block; border: 2px solid #000000; font-size: 14px; font-weight: bold; text-align: center; padding: 1.5mm 0; margin: 2mm auto; width: 85%; border-radius: 4px; }
.receipt-divider { border-top: 1px dashed #000000; margin: 3mm 0; width: 100%; }

/* الجداول والصناديق الداخلية */
.info-row { display: flex; justify-content: space-between; width: 100%; font-size: 11px; margin-bottom: 2mm; }
.info-row .label-field { font-weight: bold; white-space: nowrap; }
.info-row .value-field { font-weight: 600; text-align: right; }
[dir="ltr"] .info-row .value-field { text-align: left; }

.amount-box { border: 1.5px solid #000000; border-radius: 4px; text-align: center; padding: 2.5mm 0; margin: 3mm 0; background: #f8f9fa; }
.amount-box .box-title { font-size: 10px; display: block; margin-bottom: 1mm; font-weight: bold; }
.amount-box .box-value { font-size: 18px; font-weight: 900; }

.note-box { border: 1px solid #000; border-radius: 4px; padding: 2mm; font-size: 11px; margin: 3mm 0; text-align: start; }
.note-box .note-title { font-weight: bold; display: block; margin-bottom: 1mm; border-bottom: 1px solid #eee; padding-bottom: 1mm; }
.signatures-area { display: flex; justify-content: space-between; font-size: 10px; font-weight: bold; margin-top: 6mm; padding: 0 1mm; }
.footer-area { text-align: center; font-size: 10px; margin-top: 5mm; }
.footer-area .dev-brand { font-weight: 900; font-size: 11px; margin-bottom: 1mm; letter-spacing: 1px;}

/* =========================================
   تحسينات الطباعة الحرارية (80mm / A7) - التصميم المضغوط
   ========================================= */

/* =========================================
   الطباعة الحرارية المثالية (80mm) - التصميم النهائي
   ========================================= */

/* =========================================
   الطباعة الحرارية المثالية (80mm) - التصميم النهائي
   ========================================= */

@media print {
  @page {
    margin: 0; 
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: white;
  }

  /* إخفاء الأزرار نهائياً أثناء الطباعة */
  .no-print {
    display: none !important;
  }

  /* إلغاء حاوية الشاشة لمنع ضغط الفاتورة */
  .min-h-screen {
    min-height: auto !important;
    background: transparent !important;
    padding: 0 !important;
    display: block !important; 
  }
}

/* =========================================
   هيكل الوصل (80mm)
   ========================================= */
.receipt-ticket-forced {
  width: 80mm; 
  max-width: 100%;
  margin: 0 auto;
  padding: 4mm; 
  background: #fff;
  color: #000;
  font-family: 'Tajawal', system-ui, sans-serif;
  direction: rtl;
}

.header-title {
  text-align: center;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 2px;
}

.header-subtitle {
  text-align: center;
  font-size: 11px;
  margin-bottom: 6px;
  white-space: nowrap; 
}

.badge-action {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  border: 1.5px solid #000;
  padding: 4px;
  margin: 8px 0;
  border-radius: 4px;
}

/* صفوف المعلومات - إجبار أفقي صارم */
.info-row {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 5px 0 !important;
  border-bottom: 1px dashed #000 !important;
  font-size: 15px !important;
  font-weight: bold !important;
}

.label-field {
  white-space: nowrap !important;
  margin-left: 10px !important;
}

.value-field {
  text-align: left !important;
}

/* خانة المبلغ - إجبار أفقي صارم */
.amount-box {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  
  justify-content: space-between !important;
  align-items: center !important;
  padding: 8px 0 !important;
  margin: 6px 0 !important;
  border-bottom: 2px solid #000 !important;
  border-top: 2px solid #000 !important;
}

.amount-box .box-title {
  font-size: 16px !important;
  font-weight: bold !important;
  white-space: nowrap !important;
}

.amount-box .box-value {
  font-size: 20px !important;
  font-weight: 900 !important;
  text-align: left !important;
  direction: ltr; /* لضمان ظهور الرمز بشكل صحيح مع الرقم */
}

.signatures-area {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 13px;
  font-weight: bold;
}

.receipt-divider {
  border-top: 1.5px dashed #000;
  margin: 10px 0;
}

.footer-area {
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  margin-top: 10px;
}

.dev-brand {
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 1px;
}
/* صفحة الوصل الحراري (80mm) */
@page receipt-page {
  /* 200mm قيمة افتراضية احتياطية فقط؛ الطول الحقيقي يُضبط ديناميكياً
     عبر JS (انظر print-receipt.js) بحسب طول محتوى كل وصل */
  size: 80mm 200mm;
  margin: 0;
}

/* صفحة تقرير A4 (Z-Report) - منفصلة تماماً عن الوصل */
.print-a4 {
  page: report-page;
}

@page report-page {
  size: A4;
  margin: 10mm;
}

.print-a4 {
  width: 210mm !important;
  min-height: 297mm !important;
  margin: 0 auto !important;
  padding: 10mm !important;
  background: white !important;
}
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
    
    getStoreMapData: () => fetchFromServer('getStoreMapData'),
    processPdfInventory: (data) => fetchFromServer('processPdfInventoryEntry', [data.shelfId, data.barcode, data.cleanName, data.dirtyName, data.quantity]),

    parsePdfInvoice: () => fetchFromServer('parsePdfInvoice'),
    openShift: (data) => fetchFromServer('openShift', [data]),
    getActiveShift: (cashierName) => fetchFromServer('getActiveShift', [cashierName]),
    closeShift: (data) => fetchFromServer('closeShift', [data]),
    getShiftSummary: (cashierName, startTime) => fetchFromServer('getShiftSummary', [cashierName, startTime]),
    getStoreLayouts: () => fetchFromServer('getStoreLayouts'),
    saveStoreLayout: (data) => fetchFromServer('saveStoreLayout', [data]),
    deleteStoreLayout: (id) => fetchFromServer('deleteStoreLayout', [id]),
    activateStoreLayout: (id) => fetchFromServer('activateStoreLayout', [id]),
    getUsers: () => fetchFromServer('getUsers'),
    addUser: (data) => fetchFromServer('addUser', [data]),
    deleteUser: (id) => fetchFromServer('deleteUser', [id]),
    getAuditLogs: () => fetchFromServer('getAuditLogs'),
    getDailyClosures: () => fetchFromServer('getDailyClosures'),
    getArchivedZReport: (id) => fetchFromServer('getArchivedZReport', id),
    updateAttendanceRecord: (id, timeIn, timeOut) => fetchFromServer('updateAttendanceRecord', [id, timeIn, timeOut]),
    // 🔴 استخدام الترجمة بدلاً من النصوص العربية الثابتة
    backupDatabase: () => Promise.resolve({ success: false, error: i18n.t('common.serverOnlyFeature', 'This feature only works on the main server.') }),
    restoreDatabase: () => Promise.resolve({ success: false, error: i18n.t('common.serverOnlyFeature', 'This feature only works on the main server.') }),
    importSuppliersExcel: () => Promise.resolve({ success: false, error: i18n.t('common.serverOnlyFeature', 'This feature only works on the main server.') }),
    getAllShiftsSummary: () => fetchFromServer('getAllShiftsSummary'),
    closeBusinessDay: (adminName) => fetchFromServer('closeBusinessDay', adminName),
    getShelfProducts: (shelfId) => fetchFromServer('getShelfProducts', [shelfId]),
    deleteShelfProduct: (id) => fetchFromServer('deleteShelfProduct', [id]),
    checkActivation: () => fetchFromServer('checkActivation'),
    getHardwareId: () => fetchFromServer('getHardwareId'),
    activateApp: (key) => fetchFromServer('activateApp', [key]),
    updateShelfProduct: (id, name, qty) => fetchFromServer('updateShelfProduct', [id, name, qty]),
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

## `frontend\src\components\ActivationScreen.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Copy, Check, AlertTriangle, Key } from 'lucide-react';

export default function ActivationScreen({ onActivate }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [hardwareId, setHardwareId] = useState('...');
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHwid = async () => {
      try {
        if (window.api && window.api.getHardwareId) {
          const id = await window.api.getHardwareId();
          setHardwareId(id);
        }
      } catch (err) {
        setHardwareId('ERROR_READING_HWID');
      }
    };
    fetchHwid();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(hardwareId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleActivate = async (e) => {
    e.preventDefault();
    if (!licenseKey.trim()) {
      setError(t('activation.emptyKey', 'الرجاء إدخال مفتاح التفعيل!'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (window.api && window.api.activateApp) {
        const result = await window.api.activateApp(licenseKey);
        if (result.success) {
          onActivate(); 
        } else {
          setError(t('activation.invalidKey', 'مفتاح التفعيل غير صحيح، تأكد من نسخه بشكل كامل.'));
        }
      }
    } catch (err) {
      setError(t('activation.error', 'حدث خطأ أثناء الاتصال بالنظام.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-start" dir={i18n.dir()}>
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500/10 p-4 rounded-full mb-4 border border-blue-500/20">
            <ShieldCheck size={48} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {t('activation.title', 'تفعيل النظام')}
          </h1>
          <p className="text-slate-400 text-center text-sm leading-relaxed">
            {t('activation.subtitle', 'هذه النسخة غير مفعلة. يرجى إرسال رقم الجهاز للمطور للحصول على مفتاح التفعيل الخاص بك.')}
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-6">
          <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider text-start">
            {t('activation.machineId', 'رقم الجهاز (Machine ID)')}
          </label>
          <div className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-md p-2">
            <span className="text-slate-300 font-mono text-sm tracking-wider select-all" dir="ltr">
              {hardwareId}
            </span>
            <button 
              type="button"
              onClick={handleCopy}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors shrink-0"
              title={t('common.copy', 'نسخ')}
            >
              {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <form onSubmit={handleActivate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 text-start">
              {t('activation.licenseKey', 'مفتاح التفعيل (License Key)')}
            </label>
            <div className="relative">
              <Key size={18} className={`absolute top-1/2 -translate-y-1/2 text-slate-500 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className={`w-full bg-slate-950 border border-slate-700 rounded-lg py-3 text-white font-mono text-center tracking-widest focus:outline-none focus:border-blue-500 transition-colors uppercase placeholder-slate-700 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                dir="ltr"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertTriangle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-50"
          >
            {isLoading ? t('common.loading', 'جاري التحقق...') : t('activation.btn', 'تفعيل البرنامج')}
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## `frontend\src\components\DailyClosuresArchive.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive, Calendar, User, Printer, RotateCcw, X, AlertCircle } from 'lucide-react';

export default function DailyClosuresArchive() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // قراءة اسم المحل (نفس المصدر المستخدم في بقية المستندات المطبوعة)
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';
  
  const [closures, setClosures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // حالات عرض الوصل القديم
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const fetchClosures = async () => {
    setIsLoading(true);
    try {
      const res = await window.api.getDailyClosures();
      if (res && res.success) {
        setClosures(res.data);
      }
    } catch (error) {
      console.error("Error fetching archives:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClosures();
  }, []);

  // دالة جلب تقرير قديم بالتفصيل
  const handlePrintOldReport = async (closureId) => {
    setIsPrinting(true);
    try {
      const res = await window.api.getArchivedZReport(closureId);
      if (res && res.success) {
        setSelectedReport(res.data);
      } else {
        alert("حدث خطأ أثناء جلب تفاصيل التقرير!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
      
      {/* 🔴 شاشة طباعة الأرشيف (Z-Report) بحجم A4 */}
      {selectedReport && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/90 flex flex-col items-center p-4 backdrop-blur-sm overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
          
          <div className="flex gap-4 mb-4 no-print mt-4">
            <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 shadow-lg">
              <Printer size={20} /> طباعة التقرير (A4)
            </button>
            <button onClick={() => setSelectedReport(null)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 border border-slate-700">
              <X size={20} /> {t('common.close', 'إغلاق')}
            </button>
          </div>

          {/* ورقة التقرير A4 */}
          <div className="printable-area print-a4 bg-white text-black shadow-2xl relative font-sans w-full max-w-[210mm] min-h-[297mm] p-10 mx-auto">
            
            <div className="text-center mb-8 border-b-2 border-black pb-4">
              <h2 className="text-3xl font-bold mb-2">{currentStoreName}</h2>
              <h3 className="text-xl font-bold text-gray-700 mb-2">نسخة أرشيف: {t('zreport.title')}</h3>
              <div className="flex justify-between text-sm text-gray-600 mt-4">
                <span>{t('zreport.date')} <strong dir="ltr">{new Date(selectedReport.closure.closure_date).toLocaleString(i18n.language)}</strong></span>
                <span>{t('zreport.closed_by')} <strong>{selectedReport.closure.closed_by}</strong></span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4">{t('zreport.summary')}</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="border p-4 rounded">
                  <p className="text-sm text-gray-500 mb-1">{t('zreport.opening')}</p>
                  <p className="font-bold text-xl">{selectedReport.closure.total_opening.toLocaleString()} {t('currency')}</p>
                </div>
                <div className="border p-4 rounded bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">{t('zreport.net_sales')}</p>
                  <p className="font-bold text-xl">{selectedReport.closure.total_sales.toLocaleString()} {t('currency')}</p>
                </div>
                <div className="border p-4 rounded border-black bg-black text-white">
                  <p className="text-sm text-gray-400 mb-1">{t('zreport.actual_cash')}</p>
                  <p className="font-bold text-2xl">{selectedReport.closure.total_actual.toLocaleString()} {t('currency')}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4">{t('zreport.shifts_details')}</h4>
              
              {selectedReport.shifts.length === 0 ? (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 text-gray-500 flex flex-col items-center gap-2">
                   <AlertCircle size={32} />
                   <p>
                     {t('common.noResults')} <br />
                     ({({
                       ar: 'تم إغلاق هذا اليوم قبل تفعيل ميزة الربط المتقدمة',
                       fr: 'Cette journée a été clôturée avant l’activation de la fonctionnalité de liaison avancée',
                       en: 'This day was closed before the advanced linking feature was enabled',
                     }[i18n.language?.split('-')[0]] || 'This day was closed before the advanced linking feature was enabled')})
                   </p>
                </div>
              ) : (
                <table className="w-full border-collapse text-sm text-start">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="p-2 text-start">{t('zreport.cashier')}</th>
                      <th className="p-2 text-start">{t('zreport.time_in')}</th>
                      <th className="p-2 text-start">{t('zreport.time_out')}</th>
                      <th className="p-2 text-center">{t('zreport.opening')}</th>
                      <th className="p-2 text-center">{t('zreport.deductions')}</th>
                      <th className="p-2 text-center">{t('zreport.sales')}</th>
                      <th className="p-2 text-center">{t('zreport.actual_drawer')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.shifts.map((s, idx) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <td className="p-2 font-bold">{s.cashier_name}</td>
                        <td className="p-2" dir="ltr">{new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="p-2" dir="ltr">{s.end_time ? new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : t('zreport.not_closed')}</td>
                        <td className="p-2 text-center">{Number(s.opening_balance).toLocaleString()}</td>
                        <td className="p-2 text-center">{s.totalOut?.toLocaleString()}</td>
                        <td className="p-2 text-center font-bold">{s.calculatedSales?.toLocaleString()}</td>
                        <td className="p-2 text-center font-bold bg-gray-100">{Number(s.actual_cash || 0).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="mt-16 pt-8 border-t border-gray-300 flex justify-between">
              <div className="text-center w-48">
                <p className="border-b border-black pb-1 mb-2">{t('zreport.manager_sig')}</p>
              </div>
              <div className="text-center w-48">
                <p className="border-b border-black pb-1 mb-2">{t('zreport.company_seal')}</p>
              </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 text-center text-xs font-bold text-gray-400 font-mono">
               POWERED BY GHERBI.AI
            </div>
          </div>
        </div>
      )}

      {/* المحتوى الأساسي للشاشة */}
      {!selectedReport && (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                <Archive className="text-purple-500" /> {t('zreport.archive_title', 'أرشيف اليوميات')}
              </h1>
              
              <p className="text-sm text-slate-500">{t('zreport.archive_desc', 'سجل الأيام المغلقة والترحيلات المالية السابقة')}</p>
            </div>
            <button onClick={fetchClosures} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors">
              <RotateCcw size={18} className={isLoading ? 'animate-spin' : ''} />
              <span>{t('common.refresh')}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse" dir={i18n.dir()}>
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80">
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">التاريخ والوقت</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('zreport.closed_by')}</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.opening')}</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.net_sales')}</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.actual_cash')}</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.loading')}</td></tr>
                  ) : closures.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.noResults')}</td></tr>
                  ) : (
                    closures.map(c => (
                      <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
<td className="px-6 py-4 font-medium text-white">
  <div className="flex items-center gap-3">
    <Calendar size={18} className="text-purple-400 shrink-0"/>
    <div className="flex flex-col items-start">
      {/* بناء التاريخ يدوياً لتجنب انهيار التنسيق في المتصفح */}
      <span className="text-sm tracking-widest font-mono" dir="ltr">
        {(() => {
          const d = new Date(c.closure_date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        })()}
      </span>
      {/* الوقت يظهر بشكل صحيح، لذلك نتركه كما هو */}
      <span className="text-xs text-slate-400 mt-1 whitespace-nowrap">
        {new Date(c.closure_date).toLocaleTimeString(i18n.language)}
      </span>
    </div>
  </div>
</td>
                        <td className="px-6 py-4 text-slate-300 flex items-center gap-2">
                          <User size={14} className="text-slate-500"/> {c.closed_by}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-slate-400">
                          {Number(c.total_opening).toLocaleString()} {t('currency')}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-amber-400">
                          +{Number(c.total_sales).toLocaleString()} {t('currency')}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-emerald-400 bg-slate-950/50">
                          {Number(c.total_actual).toLocaleString()} {t('currency')}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => handlePrintOldReport(c.id)}
                            disabled={isPrinting}
                            className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-2 mx-auto transition-colors disabled:opacity-50"
                          >
                            <Printer size={16} /> {t('eod.print_receipt', 'طباعة')}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

---

## `frontend\src\components\EndOfDay.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Lock, Calculator, Banknote, AlertCircle, Clock, CheckCircle2, RotateCcw, User, LineChart, Printer, X, Download, Globe } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Modal from './ui/Modal'; 
import html2canvas from 'html2canvas'; 
import { jsPDF } from 'jspdf';

export default function EndOfDay() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin';
  const cashierName = isSuperAdmin ? t('common.superAdmin', i18n.language === 'ar' ? 'المدير العام' : 'Super Admin') : (user?.username || 'Cashier');

  // قراءة اسم المحل
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  const [activeShift, setActiveShift] = useState(null);
  const [openingBalanceInput, setOpeningBalanceInput] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0 });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  const [autoPrintEnabled, setAutoPrintEnabled] = useState(true);

  // حالات خاصة بالكاشير (وصل 80mm)
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  
  // حالات خاصة بالمدير (تقرير A4)
  const [isCloseDayModalOpen, setIsCloseDayModalOpen] = useState(false);
  const [showZReport, setShowZReport] = useState(false); 
  const [zReportData, setZReportData] = useState(null);
  const [allShifts, setAllShifts] = useState([]);
  const [grandTotals, setGrandTotals] = useState({ opening: 0, actual: 0, sales: 0 });
  
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (isSuperAdmin && window.api && window.api.getAllShiftsSummary) {
        const res = await window.api.getAllShiftsSummary();
        if (res.success) {
          setAllShifts(res.data.shifts);
          setGrandTotals(res.data.grandTotals);
        }
      } else if (window.api && window.api.getActiveShift) {
        const shift = await window.api.getActiveShift(cashierName);
        if (shift) {
          setActiveShift(shift);
          const summaryRes = await window.api.getShiftSummary(cashierName, shift.start_time);
          if (summaryRes.success) setSummary(summaryRes.data);
        } else {
          setActiveShift(null);
          setSummary({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0 });
        }
      }
    } catch (error) {
      console.error("Error fetching shift data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cashierName, isSuperAdmin]);

  const handleOpenShift = async (e) => {
    e.preventDefault();
    if (!openingBalanceInput) return;
    try {
      const res = await window.api.openShift({ cashierName, openingBalance: Number(openingBalanceInput) });
      if (res.success) {
        setOpeningBalanceInput('');
        fetchData();
      } else {
        const errorMsg = res.message ? t(`backendErrors.${res.message}`, { defaultValue: res.message }) : t('common.error');
        showToast('error', errorMsg);
      }
    } catch (err) { console.error(err); }
  };

  const totalOut = summary.totalOut || 0;
  const currentOpeningBalance = activeShift ? activeShift.opening_balance : 0;
  const todaySales = (actualAmount === '' || actualAmount === 0) ? 0 : (Number(actualAmount) + totalOut) - Number(currentOpeningBalance);
  
  // ------------------------------------------------------------------
  // الأزرار الأربعة
  // ------------------------------------------------------------------
  
  // 1. زر تغيير اللغة
  const toggleLanguage = () => {
    const langs = ['ar', 'fr', 'en'];
    const nextLang = langs[(langs.indexOf(i18n.language) + 1) % langs.length];
    i18n.changeLanguage(nextLang);
  };

  // ------------------------------------------------------------------
  // 2. زر الطباعة المباشرة (تم حل مشكلة تآكل الحواف بإضافة Padding 6mm)
  // ------------------------------------------------------------------
  const handlePrint = () => {
    const printElement = document.getElementById('printable-receipt');
    if (!printElement) return;

    let iframe = document.getElementById('silent-print-iframe');
    if (iframe) document.body.removeChild(iframe);

    iframe = document.createElement('iframe');
    iframe.id = 'silent-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    // 🔴 تم التعديل هنا فقط: وضعنا padding: 0 6mm لإجبار النص على الدخول للوسط وحماية الحواف
    doc.write(`
      <!DOCTYPE html>
      <html lang="${i18n.language}" dir="${isRTL ? 'rtl' : 'ltr'}">
      <head>
        <title>Print</title>
        <style>
          @page { margin: 0; }
          html, body { 
            margin: 0; 
            padding: 0;
            width: 100%;
            background: #fff; 
            color: #000; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          }
          .print-wrapper {
            width: 100%;
            max-width: 72mm; 
            margin: 0 auto;
            /* 🔴 السر هنا لحل مشكلة التآكل: هوامش يمين ويسار بـ 6 ملم لدفع النص للداخل */
            padding: 2mm 6mm; 
            box-sizing: border-box;
          }
          /* --- نسخ الكلاسات الخاصة بك بدقة --- */
          .receipt-ticket-forced { width: 100%; box-sizing: border-box; }
          .header-title { text-align: center; font-size: 18px; font-weight: 900; margin: 0 0 2px 0; }
          .header-subtitle1 { text-align: center; font-size: 11px; margin: 0 0 6px 0; letter-spacing: 1px; }
          .badge-action { text-align: center; font-size: 15px; font-weight: bold; border: 2px solid #000; padding: 6px; margin: 8px 0; border-radius: 4px; }
          .receipt-divider { border-top: 1.5px dashed #000; margin: 10px 0; }
          .flex { display: flex; }
          .flex-col { flex-direction: column; }
          .w-full { width: 100%; }
          .my-2 { margin: 8px 0; }
          .info-row { display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; margin-bottom: 6px; }
          .label-field { white-space: nowrap; }
          .value-field { text-align: ${isRTL ? 'left' : 'right'}; }
          .amount-box { display: flex; justify-content: space-between; align-items: center; border: 2px solid #000; border-radius: 4px; padding: 8px 6px; margin: 10px 0; }
          .box-title { font-size: 15px; font-weight: bold; }
          .box-value { font-size: 18px; font-weight: 900; direction: ltr; }
          .signatures-area { text-align: center; font-size: 12px; font-weight: bold; margin-top: 15px; }
          .footer-area { text-align: center; font-size: 11px; margin-top: 10px; font-weight: bold; }
          .dev-brand { font-size: 12px; font-weight: 900; }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          ${printElement.outerHTML}
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
    }, 500);
  };

  // 3. زر حفظ الـ PDF 
  const handleSavePDF = async () => {
    const element = document.getElementById('printable-receipt');
    if (!element) return;
    
    try {
      element.classList.remove('shadow-2xl');
      const canvas = await html2canvas(element, { 
        scale: 3, 
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 80;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Shift_Receipt_${cashierName}_${new Date().toISOString().split('T')[0]}.pdf`);
      element.classList.add('shadow-2xl');
      
      showToast('success', t('common.success', i18n.language === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully'));
    } catch (error) {
      console.error("PDF Generation Error: ", error);
      showToast('error', t('common.error'));
    }
  };

  // 4. الإغلاق
  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setActiveShift(null);
    setActualAmount('');
    setNotes('');
  };

  // طباعة وحفظ تلقائي إذا كان الزر مفعلاً
  useEffect(() => {
    if (showReceipt && receiptData && autoPrintEnabled && !isSuperAdmin) {
      const timer = setTimeout(() => {
        handlePrint();
        handleSavePDF();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showReceipt, receiptData, autoPrintEnabled, isSuperAdmin]);

  const executeCloseShift = async () => {
    try {
      const res = await window.api.closeShift({
        shiftId: activeShift.id, actualCash: Number(actualAmount), difference: todaySales, note: notes
      });
      if (res.success) {
        setReceiptData({
          cashier: cashierName,
          startTime: activeShift.start_time,
          endTime: new Date().toISOString(),
          opening: currentOpeningBalance,
          out: totalOut,
          actual: Number(actualAmount),
          sales: todaySales
        });
        
        setIsConfirmModalOpen(false);
        setShowReceipt(true);
      }
    } catch (err) { console.error(err); }
  };

  const executeCloseDay = async () => {
    try {
      const reportSnapshot = {
        date: new Date().toISOString(),
        adminName: cashierName,
        totals: { ...grandTotals },
        shifts: [...allShifts]
      };

      const res = await window.api.closeBusinessDay(cashierName);
      if (res.success) {
        setZReportData(reportSnapshot);
        setIsCloseDayModalOpen(false);
        setShowZReport(true); 
        showToast('success', t('common.success'));
        fetchData(); 
      } else {
        setIsCloseDayModalOpen(false);
        const errorMsg = res.message ? t(`backendErrors.${res.message}`, { defaultValue: res.message }) : t('common.error');
        showToast('error', errorMsg);
      }
    } catch (err) { console.error(err); }
  };

  const renderToast = () => toast && (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
      toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
    }`}>
      {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span className="font-bold">{toast.message}</span>
    </div>
  );

  // دالة لتنظيم التاريخ بشكل يدوي وتفادي تقاطع الأرقام
  const getFormattedDate = () => {
    const d = new Date();
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  };

  // ==========================================
  // واجهة المراقبة للمدير (SuperAdmin)
  // ==========================================
  if (isSuperAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
        {renderToast()}
        
        {/* تقرير Z-Report للمدير */}
        {showZReport && zReportData && (
          <div className="fixed inset-0 z-[9999] bg-slate-950/90 flex flex-col items-center p-4 backdrop-blur-sm overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
            <div className="flex gap-4 mb-4 no-print mt-4">
              <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 shadow-lg">
                <Printer size={20} /> {t('common.printReport', i18n.language === 'ar' ? 'طباعة التقرير (A4)' : 'Print Report')}
              </button>
              <button onClick={() => setShowZReport(false)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 border border-slate-700">
                <X size={20} /> {t('common.close', 'إغلاق')}
              </button>
            </div>

            <div className="printable-area bg-white text-black shadow-2xl relative font-sans w-full max-w-[210mm] min-h-[297mm] p-10 mx-auto" style={{ color: '#000000', backgroundColor: '#ffffff' }}>
              <div className="text-center mb-8 border-b-2 border-black pb-4">
                <h2 className="text-3xl font-bold mb-2">{currentStoreName}</h2>
                <h3 className="text-xl font-bold mb-2">{t('zreport.title', i18n.language === 'ar' ? 'التقرير الختامي (Z-REPORT)' : 'Final Report (Z-REPORT)')}</h3>
                <div className="flex justify-between text-sm mt-4 font-bold">
                  <span>{t('zreport.date', i18n.language === 'ar' ? 'التاريخ:' : 'Date:')} <span dir="ltr">{getFormattedDate()}</span></span>
                  <span>{t('zreport.closed_by', i18n.language === 'ar' ? 'تم الإغلاق بواسطة:' : 'Closed by:')} <span>{zReportData.adminName}</span></span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4 border border-black">{t('zreport.summary', i18n.language === 'ar' ? 'الملخص المالي لليوم' : 'Financial Summary')}</h4>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="border-2 border-black rounded-lg p-4">
                    <p className="text-sm font-bold mb-1">{t('zreport.opening', i18n.language === 'ar' ? 'إجمالي الافتتاح' : 'Total Opening')}</p>
                    <p className="font-black text-xl" dir="ltr">{zReportData.totals.opening.toLocaleString()} {t('currency', 'د.ج')}</p>
                  </div>
                  <div className="border-2 border-black rounded-lg p-4 bg-gray-50">
                    <p className="text-sm font-bold mb-1">{t('zreport.net_sales', i18n.language === 'ar' ? 'صافي المبيعات' : 'Net Sales')}</p>
                    <p className="font-black text-xl" dir="ltr">{zReportData.totals.sales.toLocaleString()} {t('currency', 'د.ج')}</p>
                  </div>
                  <div className="border-2 border-black rounded-lg p-4 bg-gray-100">
                    <p className="text-sm font-bold mb-1">{t('zreport.actual_cash', i18n.language === 'ar' ? 'إجمالي الصندوق الفعلي' : 'Actual Cash')}</p>
                    <p className="font-black text-2xl" dir="ltr">{zReportData.totals.actual.toLocaleString()} {t('currency', 'د.ج')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4 border border-black">{t('zreport.shifts_details', i18n.language === 'ar' ? 'تفاصيل الورديات' : 'Shifts Details')}</h4>
                <table className="w-full border-collapse text-sm text-center border-2 border-black">
                  <thead>
                    <tr className="border-b-2 border-black bg-gray-100">
                      <th className="p-3 border border-black">{t('zreport.cashier', i18n.language === 'ar' ? 'الكاشير' : 'Cashier')}</th>
                      <th className="p-3 border border-black">{t('zreport.time_in', i18n.language === 'ar' ? 'الدخول' : 'Time In')}</th>
                      <th className="p-3 border border-black">{t('zreport.time_out', i18n.language === 'ar' ? 'الخروج' : 'Time Out')}</th>
                      <th className="p-3 border border-black">{t('zreport.opening', i18n.language === 'ar' ? 'الافتتاح' : 'Opening')}</th>
                      <th className="p-3 border border-black">{t('zreport.deductions', i18n.language === 'ar' ? 'مسحوبات' : 'Deductions')}</th>
                      <th className="p-3 border border-black">{t('zreport.sales', i18n.language === 'ar' ? 'المبيعات' : 'Sales')}</th>
                      <th className="p-3 border border-black">{t('zreport.actual_drawer', i18n.language === 'ar' ? 'الدرج الفعلي' : 'Actual Drawer')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zReportData.shifts.map((s, idx) => (
                      <tr key={idx} className="border-b border-black font-bold">
                        <td className="p-3 border border-black">{s.cashier_name}</td>
                        <td className="p-3 border border-black" dir="ltr">{new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="p-3 border border-black" dir="ltr">{s.end_time ? new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : t('zreport.not_closed', 'لم تُغلق')}</td>
                        <td className="p-3 border border-black" dir="ltr">{Number(s.opening_balance).toLocaleString()}</td>
                        <td className="p-3 border border-black" dir="ltr">{s.totalOut?.toLocaleString()}</td>
                        <td className="p-3 border border-black" dir="ltr">{s.calculatedSales?.toLocaleString()}</td>
                        <td className="p-3 border border-black bg-gray-50" dir="ltr">{Number(s.actual_cash || 0).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-16 pt-8 border-t-2 border-black flex justify-between font-bold text-lg px-8">
                <div className="text-center w-48">
                  <p className="border-b-2 border-black pb-2 mb-2">{t('zreport.manager_sig', i18n.language === 'ar' ? 'توقيع الإدارة' : 'Manager Signature')}</p>
                </div>
                <div className="text-center w-48">
                  <p className="border-b-2 border-black pb-2 mb-2">{t('zreport.company_seal', i18n.language === 'ar' ? 'ختم المحل' : 'Company Seal')}</p>
                </div>
              </div>

              <div className="absolute bottom-6 left-0 right-0 text-center text-sm font-bold text-gray-500">
                 POWERED BY GHERBI.AI
              </div>
            </div>
          </div>
        )}

        {!showZReport && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                  <LineChart className="text-blue-500" /> {t('eod.masterDashboardTitle', 'لوحة المراقبة الشاملة')}
                </h1>
                <p className="text-sm text-slate-500">{t('eod.masterDashboardDesc', 'مراقبة وإغلاق الورديات اليومية')}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsCloseDayModalOpen(true)} disabled={allShifts.length === 0} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50 shadow-lg shadow-red-900/20">
                  <Lock size={18} />
                  <span>{t('eod.close_day_btn', 'إغلاق اليومية (Z-Report)')}</span>
                </button>
                <button onClick={fetchData} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors border border-slate-700">
                  <RotateCcw size={18} className={isLoading ? 'animate-spin' : ''} />
                  <span>{t('common.refresh', 'تحديث')}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-blue-500">
                <h3 className="text-slate-400 text-sm mb-1">{t('eod.grandTotalOpening', 'إجمالي الافتتاح')}</h3>
                <p className="text-3xl font-bold text-white mt-2">{grandTotals.opening.toLocaleString()} {t('currency')}</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-emerald-500">
                <h3 className="text-slate-400 text-sm mb-1">{t('eod.grandTotalActual', 'إجمالي الدرج الفعلي')}</h3>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{grandTotals.actual.toLocaleString()} {t('currency')}</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-amber-500">
                <h3 className="text-slate-400 text-sm mb-1">{t('eod.grandTotalSales', 'إجمالي المبيعات')}</h3>
                <p className="text-3xl font-bold text-amber-400 mt-2">{grandTotals.sales.toLocaleString()} {t('currency')}</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800 bg-slate-950/30">
                <h3 className="font-bold text-white">{t('eod.allShifts', 'جميع الورديات')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse" dir={i18n.dir()}>
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80">
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('eod.cashierName', 'الكاشير')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('hr.table.status', 'الحالة')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.timing', 'التوقيت')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.opening_balance', 'صندوق الافتتاح')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.today_sales', 'المبيعات')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allShifts.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-12 text-slate-500">{t('common.noResults', 'لا توجد بيانات')}</td></tr>
                    ) : (
                      allShifts.map(s => (
                        <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                            <div className="bg-slate-800 p-2 rounded-full"><User size={14} className="text-blue-400"/></div>
                            {s.cashier_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${s.status === 'open' ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                              {s.status === 'open' ? t('eod.statusOpen', 'مفتوح') : t('eod.statusClosed', 'مغلق')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-slate-400">
                            <div className="flex flex-col gap-1">
                              <span className="text-emerald-400/80" dir="ltr">{new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
                              {s.end_time ? <span className="text-red-400/80" dir="ltr">{new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span> : <span className="text-slate-600">---</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-slate-300" dir="ltr">{Number(s.opening_balance).toLocaleString()} {t('currency', 'د.ج')}</td>
                          <td className="px-6 py-4 text-center font-bold text-amber-400" dir="ltr">{s.status === 'open' ? '---' : `+${s.calculatedSales.toLocaleString()} ${t('currency', 'د.ج')}`}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <Modal isOpen={isCloseDayModalOpen} onClose={() => setIsCloseDayModalOpen(false)} title={t('eod.close_day_btn', 'إغلاق اليومية')}>
              <div className="p-4 text-start">
                <p className="text-white mb-6 text-lg">{t('eod.close_day_confirm', 'هل أنت متأكد من إغلاق اليومية؟')}</p>
                <div className="bg-slate-950 p-4 rounded-lg mb-6 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <span className="text-slate-400">{t('eod.grandTotalActual', 'إجمالي الدرج الفعلي')}</span>
                      <span className="text-emerald-400 font-bold text-xl" dir="ltr">{grandTotals.actual.toLocaleString()} {t('currency', 'د.ج')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                      <span className="text-slate-400">{t('eod.grandTotalSales', 'إجمالي المبيعات')}</span>
                      <span className="text-amber-400 font-bold text-xl" dir="ltr">{grandTotals.sales.toLocaleString()} {t('currency', 'د.ج')}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setIsCloseDayModalOpen(false)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600">{t('common.cancel', 'إلغاء')}</button>
                  <button onClick={executeCloseDay} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2"><Lock size={18}/> {t('common.confirm', 'تأكيد')}</button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    );
  }

  // ==========================================
  // واجهة الكاشير العادي
  // ==========================================
  if (isLoading) return <div className="p-6 text-center text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</div>;

  if (!activeShift && !showReceipt) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex items-center justify-center relative">
        {renderToast()}
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Play size={32} className="text-blue-500 ms-1" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('eod.open_shift_title', 'فتح وردية جديدة')}</h1>
            <p className="text-slate-500 text-sm">{t('eod.open_shift_desc', 'جاري فتح الصندوق للموظف')} <span className="font-bold text-white">{cashierName}</span></p>
          </div>
          <form onSubmit={handleOpenShift} className="space-y-6 text-start" dir={isRTL ? "rtl" : "ltr"}>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.opening_balance', 'مبلغ الافتتاح (فوندوكاس)')}</label>
              <div className="relative">
                <Banknote size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="number" min="0" required value={openingBalanceInput} onChange={(e) => setOpeningBalanceInput(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 text-lg font-bold" placeholder="0.00" />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-lg">
              <Play size={18} /> {t('eod.open_shift_btn', 'بدء الوردية')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const shiftStartTime = activeShift ? new Date(activeShift.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative">
      {renderToast()}

      {/* 🔴 النافذة الاحترافية لخيارات الطباعة والمعاينة */}
      {showReceipt && receiptData && !isSuperAdmin && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 flex items-center justify-center p-4 backdrop-blur-md" dir={isRTL ? "rtl" : "ltr"}>
          
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
            
            {/* القسم الأيسر: المعاينة الحية للوصل */}
            <div className="bg-slate-800 p-8 flex justify-center items-center w-full md:w-1/2 border-b md:border-b-0 md:border-l border-slate-700 relative overflow-y-auto max-h-[85vh]">
              <div className="absolute top-4 left-4 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">Live Preview</span>
              </div>
              
              {/* 
                  هنا يوجد كود الوصل الخاص بك كما هو،
                  وضعناه في حاوية تصغره ليلائم الشاشة بدون المساس بالكود 
              */}
              <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center', marginTop: '2rem' }}>
                <div id="printable-receipt" className="receipt-ticket-forced mx-auto shadow-2xl bg-white text-black print:shadow-none" dir={isRTL ? "rtl" : "ltr"}>
                  <div className="header-title">GHERBI.AI</div>
                  <div className="header-subtitle1">CODE &bull; MULTIMEDIA &bull; ALGO &bull; AI</div>
                  <div className="header-title" style={{ marginTop: '1mm' }}><bdi>{currentStoreName}</bdi></div>
                  
                  <div className="badge-action">
                    {t('eod.x_report', i18n.language === 'ar' ? 'تقرير الوردية (X-REPORT)' : i18n.language === 'fr' ? 'Rapport de Quart (X-REPORT)' : 'Shift Report (X-REPORT)')}
                    
                    {/* حل مشكلة التاريخ المقلوب */}
                    <div style={{ fontSize: '10px', marginTop: '2px', fontWeight: 'normal' }} dir="ltr">
                      {getFormattedDate()}
                    </div>
                  </div>
                  
                  <div className="receipt-divider"></div>

                  <div className="flex flex-col w-full my-2">
                    <div className="info-row">
                      <span className="label-field">{t('eod.cashierName', i18n.language === 'ar' ? 'الكاشير:' : i18n.language === 'fr' ? 'Caissier:' : 'Cashier:')}</span>
                      <span className="value-field">{receiptData.cashier}</span>
                    </div>
                    <div className="info-row">
                      <span className="label-field">{t('hr.table.timeIn', i18n.language === 'ar' ? 'الدخول:' : i18n.language === 'fr' ? 'Entrée:' : 'Time In:')}</span>
                      <span className="value-field" dir="ltr">{new Date(receiptData.startTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="info-row">
                      <span className="label-field">{t('eod.time_out', i18n.language === 'ar' ? 'الخروج:' : i18n.language === 'fr' ? 'Sortie:' : 'Time Out:')}</span>
                      <span className="value-field" dir="ltr">{new Date(receiptData.endTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <div className="receipt-divider"></div>

                  <div className="flex flex-col w-full my-2">
                    <div className="info-row">
                      <span className="label-field">{t('eod.opening_balance', i18n.language === 'ar' ? 'الافتتاح:' : i18n.language === 'fr' ? 'Ouverture:' : 'Opening:')}</span>
                      <span className="value-field" dir="ltr"><bdi>{receiptData.opening.toLocaleString()} {t('currency', 'DA')}</bdi></span>
                    </div>
                    <div className="info-row">
                      <span className="label-field">{t('eod.total_deducted', i18n.language === 'ar' ? 'المسحوبات:' : i18n.language === 'fr' ? 'Déductions:' : 'Deductions:')}</span>
                      <span className="value-field" dir="ltr"><bdi>{(receiptData.out || 0).toLocaleString()} {t('currency', 'DA')}</bdi></span>
                    </div>
                  </div>

                  <div className="amount-box">
                    <span className="box-title">{t('eod.actual_cash', i18n.language === 'ar' ? 'الدرج الفعلي:' : i18n.language === 'fr' ? 'Tiroir Réel:' : 'Actual Drawer:')}</span>
                    <span className="box-value" dir="ltr">
                      <bdi>{(receiptData.actual || 0).toLocaleString()} {t('currency', 'DA')}</bdi>
                    </span>
                  </div>

                  <div className="amount-box">
                    <span className="box-title">{t('eod.today_sales', i18n.language === 'ar' ? 'المبيعات:' : i18n.language === 'fr' ? 'Ventes:' : 'Sales:')}</span>
                    <span className="box-value" dir="ltr">
                      <bdi>{(receiptData.sales || 0).toLocaleString()} {t('currency', 'DA')}</bdi>
                    </span>
                  </div>

                  <div className="signatures-area" style={{ justifyContent: 'center', marginTop: '8mm' }}>
                    <span>{t('eod.receipt_footer', i18n.language === 'ar' ? 'احتفظ بالوصل للمراجعة' : i18n.language === 'fr' ? 'Conservez ce reçu' : 'Keep for review')}</span>
                  </div>

                  <div className="receipt-divider"></div>

                  <div className="footer-area">
                    <div className="dev-brand">POWERED BY GHERBI.AI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* القسم الأيمن: أزرار التحكم الاحترافية الخاصة بالطباعة */}
            <div className="p-8 w-full md:w-1/2 flex flex-col justify-center space-y-8 bg-slate-900">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{t('common.printSettings', i18n.language === 'ar' ? 'إعدادات الطباعة' : 'Print Settings')}</h2>
                <p className="text-slate-400 text-sm">{i18n.language === 'ar' ? 'النافذة الاحترافية الخاصة بالطباعة' : 'Professional Print Dashboard'}</p>
              </div>

              <div className="space-y-4 mt-6">
                {/* 1. زر تغيير اللغة */}
                <button onClick={toggleLanguage} className="w-full flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all text-white font-bold group">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                      <Globe size={22} className="text-blue-400 group-hover:text-white" />
                    </div>
                    <span className="text-lg">{t('common.language', i18n.language === 'ar' ? 'تغيير لغة الوصل' : 'Change Receipt Language')}</span>
                  </div>
                  <span className="text-sm bg-blue-900/30 border border-blue-800 text-blue-300 px-3 py-1 rounded-md uppercase tracking-wider">{i18n.language}</span>
                </button>

                {/* 2. زر الطباعة المباشرة (النسخة المعزولة 100%) */}
                <button onClick={handlePrint} className="w-full flex items-center justify-between p-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-500 rounded-xl transition-all text-emerald-500 hover:text-white font-bold group">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/20 group-hover:bg-emerald-500 p-2 rounded-lg transition-colors">
                      <Printer size={22} className="text-emerald-400 group-hover:text-white" />
                    </div>
                    <span className="text-lg">{t('common.print', i18n.language === 'ar' ? 'طباعة مباشرة' : 'Direct Print')}</span>
                  </div>
                  <span className="text-xs bg-emerald-950 border border-emerald-800 text-emerald-400 px-3 py-1 rounded-md">XPrinter 80mm</span>
                </button>

                {/* 3. زر حفظ الـ PDF */}
                <button onClick={handleSavePDF} className="w-full flex items-center justify-between p-4 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 hover:text-white font-bold group">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-500/20 group-hover:bg-indigo-500 p-2 rounded-lg transition-colors">
                      <Download size={22} className="text-indigo-400 group-hover:text-white" />
                    </div>
                    <span className="text-lg">{t('common.save', i18n.language === 'ar' ? 'حفظ' : 'Save PDF')}</span>
                  </div>
                  <span className="text-xs bg-indigo-950 border border-indigo-800 text-indigo-400 px-3 py-1 rounded-md">Digital Copy</span>
                </button>
              </div>

              <div className="pt-8 mt-auto">
                {/* 4. زر الإغلاق */}
                <button onClick={handleCloseReceipt} className="w-full flex items-center justify-center gap-2 p-4 bg-red-950/30 hover:bg-red-600 text-red-500 hover:text-white border border-red-900/50 hover:border-red-500 rounded-xl transition-all font-bold text-lg">
                  <X size={24} /> <span>{t('common.close', i18n.language === 'ar' ? 'إغلاق' : 'Close')}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* لوحة تحكم إغلاق الكاشير (إغلاق الوردية) */}
      {!showReceipt && (
        <>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3"><Lock className="text-red-500" /> {t('eod.title', 'نهاية الوردية')}</h1>
              <p className="text-slate-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{t('eod.active_shift', 'الوردية النشطة')}: <strong className="text-white">{cashierName}</strong></p>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg">
              <Clock className="text-blue-400" size={18} />
              <span className="text-sm font-medium" dir="ltr">{t('hr.table.timeIn')}: {shiftStartTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-emerald-500">
              <h3 className="text-slate-400 text-sm mb-1">{t('eod.opening_balance', 'فوندوكاس')}</h3>
              <p className="text-2xl font-bold text-white" dir="ltr">{currentOpeningBalance.toLocaleString()} {t('currency')}</p>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-red-500">
              <h3 className="text-slate-400 text-sm mb-1">{t('eod.total_deducted', 'إجمالي المسحوبات')}</h3>
              <p className="text-2xl font-bold text-red-400" dir="ltr">{totalOut.toLocaleString()} {t('currency')}</p>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-blue-500">
              <h3 className="text-slate-400 text-sm mb-1">{t('eod.advances', 'التسبيقات والدفع')}</h3>
              <p className="text-2xl font-bold text-blue-400" dir="ltr">{(summary.advances + summary.supplierPayments).toLocaleString()} {t('currency')}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <form onSubmit={(e) => { e.preventDefault(); if (actualAmount !== '') setIsConfirmModalOpen(true); }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-start" dir={isRTL ? "rtl" : "ltr"}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-emerald-400 mb-2">{t('eod.actual_cash', 'المبلغ الفعلي في الدرج')}</label>
                  <div className="relative">
                    <Calculator size={20} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="number" min="0" required value={actualAmount} onChange={(e) => setActualAmount(e.target.value)} className="w-full bg-slate-950 border-2 border-emerald-900/50 rounded-lg py-4 ps-12 pe-4 text-white focus:outline-none focus:border-emerald-500 text-2xl font-bold transition-colors shadow-inner" placeholder="0.00" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.notes', 'ملاحظات (اختياري)')}</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 shadow-inner" rows="3" placeholder={t('eod.notesPlaceholder')}></textarea>
                  
                  <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-lg border border-slate-800 shadow-inner mt-4 cursor-pointer hover:bg-slate-900 transition-colors" onClick={() => setAutoPrintEnabled(!autoPrintEnabled)}>
                    <button
                      type="button"
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none ${autoPrintEnabled ? 'bg-blue-600' : 'bg-slate-700'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoPrintEnabled ? (isRTL ? '-translate-x-6' : 'translate-x-6') : (isRTL ? '-translate-x-1' : 'translate-x-1')}`} />
                    </button>
                    <span className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Printer size={16} className={autoPrintEnabled ? "text-blue-400" : "text-slate-500"} />
                      {t('eod.auto_print', i18n.language === 'ar' ? 'الطباعة والحفظ التلقائي' : 'Auto Print & Save')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-center shadow-inner">
                <div className="text-center mb-8">
                  <h3 className="text-slate-400 mb-2">{t('eod.today_sales', 'المبيعات المحسوبة')}</h3>
                  <p className={`text-5xl font-bold ${todaySales > 0 ? 'text-emerald-400' : todaySales < 0 ? 'text-red-500' : 'text-slate-300'}`} dir="ltr">{todaySales > 0 ? '+' : ''}{todaySales.toLocaleString()} <span className="text-2xl text-slate-500">{t('currency')}</span></p>
                </div>
                <button type="submit" disabled={actualAmount === ''} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition flex justify-center items-center gap-2 text-lg shadow-lg shadow-red-900/20">
                  <Lock size={24} /> {t('eod.save_btn', 'إغلاق الوردية')}
                </button>
              </div>
            </form>
          </div>

          <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title={t('eod.title', 'تأكيد الإغلاق')}>
            <div className="p-4 text-start">
              <p className="text-white mb-6 text-lg">{t('eod.confirmClose', 'هل أنت متأكد من إغلاق ورديتك؟')}</p>
              <div className="bg-slate-950 p-4 rounded-lg mb-6 text-center border border-slate-800">
                <p className="text-sm text-slate-400 mb-1">{t('eod.today_sales', 'المبيعات')}</p>
                <p className={`text-2xl font-bold ${todaySales > 0 ? 'text-emerald-400' : 'text-red-400'}`} dir="ltr">{todaySales.toLocaleString()} {t('currency')}</p>
              </div>
              <div className="flex items-center justify-end gap-3 mt-4">
                <button onClick={() => setIsConfirmModalOpen(false)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600">{t('common.cancel', 'إلغاء')}</button>
                <button onClick={executeCloseShift} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2"><Lock size={18} /> {t('eod.save_btn', 'تأكيد الإغلاق')}</button>
              </div>
            </div>
          </Modal>
        </>
      )}
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

  if (currentUser?.role !== 'superadmin') {
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
            // 🔴 دعم الترجمة إذا كان الملف خاطئاً (ليس قاعدة بيانات)
            if (result.error === 'invalid_format') {
               showToast('error', t('database.messages.invalidFile', 'The selected file is invalid! Please choose a valid database file (.db or .sqlite).'));
            } else {
               showToast('error', t('database.messages.error') + "\n" + (result.error || '')); 
            }
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
                  <option value="superadmin">{t('hr.roles.admin')}</option>
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
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${u.role === 'superadmin' ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-900/50 text-emerald-400'}`}>
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
import useAuthStore from "../../store/authStore";

// 🔴 تم تنظيف هذا السطر من التكرار بشكل كامل
import { 
  LayoutDashboard, Users, Briefcase, Receipt, Calendar, 
  Banknote, Settings, Archive, Activity, Map, Database, LayoutList 
} from 'lucide-react'; 

export default function Sidebar() {
  // 🔴 أضفنا استخراج i18n لكي لا يحدث خطأ عند فحص اللغة
  const { t, i18n } = useTranslation();
  
  // معرفة هل المستخدم الحالي يمتلك صلاحيات مدير
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'superadmin';

  // إضافة خاصية adminOnly للتحكم في ظهور الرابط
  const menuItems = [
    { path: '/', name: t('sidebar.dashboard', 'لوحة القيادة'), icon: <LayoutDashboard size={20} />, adminOnly: true },
    { path: '/suppliers', name: t('sidebar.suppliers', 'الموردين'), icon: <Users size={20} />, adminOnly: true },
    { path: '/hr', name: t('sidebar.hr', 'الموارد البشرية'), icon: <Briefcase size={20} />, adminOnly: true },
    { path: '/expenses', name: t('sidebar.expenses', 'المصاريف'), icon: <Receipt size={20} />, adminOnly: true },
    { path: '/payroll', name: t('sidebar.payroll', 'الرواتب'), icon: <Banknote size={20} />, adminOnly: true },
    { path: '/agenda', name: t('sidebar.agenda', 'الأجندة'), icon: <Calendar size={20} />, adminOnly: true },
    { path: '/audit-logs', name: t('sidebar.auditLogs', 'سجل النشاطات'), icon: <Activity size={20} />, adminOnly: true },
    { path: '/end-of-day', name: t('sidebar.end_of_day', 'نهاية الوردية'), icon: <Calendar size={20} />, adminOnly: false }, // الكاشير يمكنه رؤية هذا
    { path: '/store-map', name: t('sidebar.storeMap', 'مخطط المحل'), icon: <Map size={20} />, adminOnly: true },
    { path: '/pdf-importer', name: t('sidebar.pdfImporter', 'استيراد الفواتير (PDF)'), icon: <Database size={20} />, adminOnly: true },
    
    // 🔴 صفحة الجرد مدعومة بـ 3 لغات
    { 
      path: '/inventory', 
      name: t('sidebar.inventory', i18n.language === 'ar' ? 'الجرد والمخزون' : i18n.language === 'fr' ? 'Inventaire' : 'Inventory'), 
      icon: <LayoutList size={20} />, 
      adminOnly: true 
    },
    
    { path: '/archive', name: t('zreport.archive_title', 'أرشيف اليوميات'), icon: <Archive size={20} />, adminOnly: true }, 
    { path: '/settings', name: t('sidebar.settings', 'الإعدادات'), icon: <Settings size={20} />, adminOnly: true }, 
  ];

  // فلترة القائمة بناءً على صلاحيات المستخدم
  const visibleItems = menuItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-wider">
          GHERBI.AI <span className="text-blue-500"> POS</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
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
    const langs = ['ar', 'en', 'fr'];
    const currentLang = i18n.language.split('-')[0];
    const currentIndex = langs.indexOf(currentLang) !== -1 ? langs.indexOf(currentLang) : 0;
    const nextLang = langs[(currentIndex + 1) % langs.length];
    i18n.changeLanguage(nextLang);
  };

  const getLangLabel = () => {
    if(i18n.language.startsWith('en')) return 'English';
    if(i18n.language.startsWith('fr')) return 'Français';
    return 'العربية';
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
        <button onClick={toggleLanguage} className="flex items-center gap-2 hover:text-white transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
          <Globe size={18} />
          <span className="text-xs font-bold">{getLangLabel()}</span>
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
import ConfirmAlert from '../ui/ConfirmAlert';

export default function Agenda() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [filter, setFilter] = useState('all'); 
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  // 🔴 حفظ اليوم المحدد (يتم تحديثه عند الضغط على التقويم)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date().toISOString().split('T')[0]);
  
  const todayString = new Date().toISOString().split('T')[0];
  const currentMonthName = currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  
  const isCurrentMonth = new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
  const currentDay = new Date().getDate();

  const prevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  // 🔴 الضغط على اليوم في التقويم
  const handleDayClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 12);
    setSelectedCalendarDate(clickedDate.toISOString().split('T')[0]);
  };

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
        showToast('success', t('common.success'));
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
  // 🔴 مهام اليوم المحدد (إما اليوم الفعلي أو اليوم المضغوط في التقويم)
  const selectedDateTasks = filteredTasks.filter(task => task.date === selectedCalendarDate);
  const upcomingTasks = filteredTasks.filter(task => task.date && task.date > todayString && task.date !== selectedCalendarDate);

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
              <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}><Clock size={14} /> <bdi dir="ltr">{displayTime}</bdi> {task.date !== todayString && <bdi dir="ltr">| {task.date}</bdi>}</span>
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
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
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
                {[...Array(daysInMonth)].map((_, i) => {
                  const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1, 12).toISOString().split('T')[0];
                  // تحديد اليوم (أزرق غامق إذا كان اليوم الفعلي، أزرق فاتح إذا كان اليوم المختار للاستعراض)
                  const isRealToday = dayDate === todayString;
                  const isSelected = dayDate === selectedCalendarDate;

                  return (
                    <div 
                      key={i} 
                      onClick={() => handleDayClick(i + 1)}
                      className={`p-1.5 rounded-md cursor-pointer transition-colors 
                        ${isSelected ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900' : 
                          isRealToday ? 'bg-blue-900/50 text-blue-300 font-bold border border-blue-800' : 
                          'text-slate-300 hover:bg-slate-800'}`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
                {[...Array(42 - (firstDayOfMonth + daysInMonth))].map((_, i) => (
                   <div key={`empty-next-${i}`} className="p-1.5 text-slate-700">{i + 1}</div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedCalendarDate(todayString)} 
              className="w-full mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-900/20 py-2 rounded-lg transition-colors border border-blue-900/50"
            >
              {t('common.today', 'العودة لليوم')}
            </button>
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
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              {selectedCalendarDate === todayString ? t('agenda.sections.today') : `${t('agenda.modal.dateLabel')} : ${selectedCalendarDate}`}
            </h3>
            {selectedDateTasks.length > 0 ? (
              <div className="space-y-3">{selectedDateTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={false} />)}</div>
            ) : (
              <div className="text-center p-8 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">{t('common.noResults')}</div>
            )}
          </div>

          {upcomingTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-slate-400 mb-4 border-b border-slate-800 pb-2 mt-8">{t('agenda.sections.upcoming')}</h3>
              <div className="space-y-3">{upcomingTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={false} />)}</div>
            </div>
          )}
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
              <input type="date" defaultValue={selectedCalendarDate} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required />
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
import { Clock, LogIn, LogOut, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, Calendar as CalendarIcon } from "lucide-react";

const Attendance = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);

  // 🔴 التحكم بالتاريخ عبر أسهم التنقل
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dbDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
  const displayDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(selectedDate.getDate() + 1);
    setSelectedDate(next);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

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
    const interval = setInterval(fetchRecords, 60000);
    return () => clearInterval(interval);
  }, [dbDate]); // 🔴 جلب البيانات مجدداً عند تغير التاريخ

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    try {
      if (window.api && window.api.handlePinEntry) {
        const result = await window.api.handlePinEntry(pinInput.trim());
        if (result && result.success) {
          const actionText = result.action === 'check_in' ? t('hr.messages.checkIn', 'تم تسجيل الدخول') : t('hr.messages.checkOut', 'تم تسجيل الخروج');
          setFeedback({ type: 'success', message: `${actionText}: ${result.employeeName} (${result.time})` });
          // العودة لتاريخ اليوم إذا سجل حضوره لكي يرى اسمه فوراً
          if(dbDate !== new Date().toISOString().split('T')[0]) {
             handleToday();
          } else {
             fetchRecords(); 
          }
        } else {
          setFeedback({ type: 'error', message: result?.message || t('common.error') });
        }
      }
    } catch (err) { setFeedback({ type: 'error', message: t('common.error') }); }

    setPinInput("");
    if(inputRef.current) inputRef.current.focus();
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full text-slate-100 min-h-[calc(100vh-100px)]" dir={i18n.dir()}>
      <div className="w-full lg:w-1/3 bg-slate-900/80 rounded-xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg h-fit">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="bg-slate-800/50 p-4 rounded-full mb-6"><Clock size={48} className="text-blue-400" /></div>
        <h2 className="text-2xl font-bold mb-2 text-center">{t('hr.scanner.title', 'تسجيل الدخول / الخروج')}</h2>
        <p className="text-slate-400 mb-8 text-center text-sm">{t('hr.scanner.placeholder', 'أدخل رمز PIN الخاص بك لتسجيل حضورك أو انصرافك')}</p>
        <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-4">
          <input ref={inputRef} type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} placeholder="****" className="w-full text-center text-4xl py-6 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 tracking-[1em] shadow-inner" autoFocus />
          <button type="submit" className="w-full text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md">{t('hr.scanner.submit', 'تأكيد الرمز')}</button>
        </form>
        {feedback && (
          <div className={`mt-6 w-full p-4 rounded-lg flex items-center justify-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 ${feedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}<span>{feedback.message}</span>
          </div>
        )}
      </div>

      <div className="w-full lg:w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-lg h-fit">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
          <h3 className="font-bold text-lg flex items-center gap-2"><Clock size={18} className="text-blue-400"/> {t('hr.attendanceLog', 'سجل حركة الموظفين')}</h3>
          
          {/* 🔴 أزرار التنقل بين الأيام المضافة حديثاً */}
          <div className="flex items-center gap-2 bg-slate-900 rounded-lg border border-slate-700 p-1">
             <button onClick={isRTL ? handleNextDay : handlePrevDay} className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors" title={t('common.previous', 'السابق')}><ChevronLeft size={16}/></button>
             <button onClick={handleToday} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-sm font-bold text-white transition-colors" title={t('common.today', 'اليوم')}>
               <CalendarIcon size={14} className="text-blue-400" /> <bdi dir="ltr">{displayDate}</bdi>
             </button>
             <button onClick={isRTL ? handlePrevDay : handleNextDay} className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors" title={t('common.next', 'التالي')}><ChevronRight size={16}/></button>
          </div>
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
                <tr><td colSpan={4} className="text-center py-12 text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</td></tr>
              ) : records.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-16 text-slate-500">{t('hr.table.emptyRecord', 'لا توجد حركات تسجيل دخول في هذا اليوم.')}</td></tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 text-start"><div className="font-medium text-white">{record.employee_name || record.name}</div><div className="text-xs text-slate-500 mt-1">{t(`hr.roles.${record.role}`, record.role)}</div></td>
                    <td className="py-4 px-6 text-center text-emerald-400 font-medium"><div className="flex items-center justify-center gap-2"><LogIn size={14} /> {record.time_in || '--:--'}</div></td>
                    <td className="py-4 px-6 text-center text-orange-400 font-medium">{record.time_out ? (<div className="flex items-center justify-center gap-2"><LogOut size={14} /> {record.time_out}</div>) : (<span className="text-slate-600">--:--</span>)}</td>
                    <td className="py-4 px-6 text-center"><span className={`px-3 py-1.5 rounded-full text-xs font-medium border inline-block ${!record.time_out ? 'bg-blue-950 text-blue-400 border-blue-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>{!record.time_out ? t('hr.status.present', 'متواجد حالياً') : t('hr.status.departed', 'أنهى الدوام')}</span></td>
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

## `frontend\src\components\pages\AuditLogs.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, Search, ShieldAlert, User, Clock, Filter } from 'lucide-react';
import useAuditStore from '../../store/auditStore';

export default function AuditLogs() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const { logs, fetchLogs, isLoading } = useAuditStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // 🔴 دالة جديدة لتنسيق التاريخ والوقت بشكل رياضي دقيق ومنظم
  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    }).replace(',', ' -'); // تظهر النتيجة هكذا: 31/07/2026 - 15:25:23
  };

  const renderAuditDetails = (log) => {
    try {
      const p = JSON.parse(log.details);
      switch(log.action) {
        case 'LOGIN': return `تسجيل دخول للنظام (${p.role})`;
        case 'ADD_EXPENSE': return `إضافة مصروف: ${p.desc} (${p.amount} د.ج)`;
        case 'UPDATE_EXPENSE': return `تعديل مصروف: ${p.desc} (${p.amount} د.ج)`;
        case 'DELETE_EXPENSE': return `حذف مصروف: ${p.desc} (${p.amount} د.ج)`;
        case 'CLOSE_DAY': return `إغلاق وتأكيد يومية المتجر. المبيعات: ${p.sales} د.ج`;
        case 'CLOSE_SHIFT': return `إغلاق وردية كاشير. المبيعات: ${p.sales} د.ج`;
        case 'OPEN_SHIFT': return `فتح وردية جديدة بفوندوكاس: ${p.opening} د.ج`;
        case 'ADD_EMPLOYEE': return `إضافة موظف جديد: ${p.name} (${p.role})`;
        case 'UPDATE_EMPLOYEE': return `تعديل بيانات الموظف: ${p.name}`;
        case 'DELETE_EMPLOYEE': return `حذف/تعطيل الموظف: ${p.name}`;
        case 'ADD_USER': return `إنشاء حساب للنظام: ${p.username} (${p.role})`;
        case 'DELETE_USER': return `حذف حساب: ${p.username}`;
        case 'PAY_SALARY': return `صرف راتب موظف بقيمة: ${p.amount} د.ج`;
        case 'ADD_SUPPLIER': return `إضافة مورد جديد: ${p.name} (دين أولي: ${p.debt})`;
        case 'UPDATE_SUPPLIER': return `تعديل بيانات المورد: ${p.name}`;
        case 'DELETE_SUPPLIER': return `حذف بيانات المورد (ID: ${p.id})`;
        case 'ADD_RECEIPT': return `استلام فاتورة/سلعة بقيمة: ${p.amount} د.ج`;
        case 'UPDATE_RECEIPT': return `تعديل فاتورة مورد إلى: ${p.amount} د.ج`;
        case 'DELETE_RECEIPT': return `حذف فاتورة مورد (ID: ${p.id})`;
        case 'ADD_PAYMENT': return `تسديد دفعة لمورد بقيمة: ${p.amount} د.ج`;
        case 'UPDATE_PAYMENT': return `تعديل تسديد مورد إلى: ${p.amount} د.ج`;
        case 'DELETE_PAYMENT': return `حذف تسديد مورد (ID: ${p.id})`;
        case 'ADD_ADVANCE': return `تقديم سلفة بقيمة: ${p.amount} د.ج`;
        case 'UPDATE_ADVANCE': return `تعديل سلفة إلى: ${p.amount} د.ج`;
        case 'DELETE_ADVANCE': return `إلغاء سلفة (ID: ${p.id})`;
        case 'ADD_TASK': return `إضافة مهمة للأجندة: ${p.title}`;
        case 'UPDATE_TASK_STATUS': return `تغيير حالة مهمة إلى: ${p.status}`;
        case 'DELETE_TASK': return `حذف مهمة من الأجندة (ID: ${p.id})`;
        case 'RESCHEDULE_TASK': return `تأجيل مهمة إلى تاريخ: ${p.newDate}`;
        case 'CHECK_IN': return `تسجيل حضور الساعة: ${p.time}`;
        case 'CHECK_OUT': return `تسجيل انصراف الساعة: ${p.time}`;
        case 'UPDATE_ATTENDANCE': return `تعديل وقت حضور/انصراف الموظف`;
        default: return t(`audit.details.${log.action}`, p) || JSON.stringify(p);
      }
    } catch (e) { return log.details; }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (log.details || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const uniqueActions = ['all', ...new Set(logs.map(log => log.action))];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Activity className="text-blue-500" /> {t('sidebar.auditLogs', 'سجل النشاطات الشامل')}
          </h1>
          <p className="text-slate-500">{t('audit.subtitle', 'مراقبة وتتبع جميع حركات النظام والمستخدمين بدقة')}</p>
        </div>
        <button onClick={fetchLogs} className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm">
          تحديث السجل
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-[calc(100vh-180px)]">
        <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex gap-4">
          <div className="relative flex-1">
            <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-slate-500 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input type="text" placeholder={t('common.search', 'بحث...')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 text-white focus:outline-none focus:border-blue-500 ${isRTL ? 'pr-10' : 'pl-10'}`} />
          </div>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg px-3">
            <Filter size={18} className="text-slate-500" />
            <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="bg-transparent text-white focus:outline-none py-2.5">
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action === 'all' ? t('common.all', 'الكل') : action}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {isLoading ? (
            <div className="text-center py-12 text-slate-500">{t('common.loading', 'جاري التحميل...')}</div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-2 text-slate-500">
              <ShieldAlert size={32} />
              <p>{t('common.noResults', 'لا توجد سجلات مطابقة.')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map(log => (
                <div key={log.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center font-bold shrink-0 uppercase">
                      {log.username.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1 text-lg">{renderAuditDetails(log)}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><User size={12}/> {log.username}</span>
                        {/* 🔴 استخدام دالة التاريخ الجديدة هنا */}
                        <span className="flex items-center gap-1"><Clock size={12}/> <span dir="ltr" className="font-mono text-slate-400">{formatDateTime(log.created_at)}</span></span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded bg-slate-800 text-slate-300 border border-slate-700 self-start md:self-auto shrink-0">
                    {log.action}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
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

  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // 🔴 دالة تنسيق التاريخ المنظم
  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', { 
      year: 'numeric', month: '2-digit', day: '2-digit', 
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
    }).replace(',', ' -');
  };

  const renderAuditDetails = (log) => {
    try {
      const p = JSON.parse(log.details);
      switch(log.action) {
        case 'LOGIN': return `تسجيل دخول (${p.role})`;
        case 'ADD_EXPENSE': return `إضافة مصروف: ${p.desc} (${p.amount})`;
        case 'UPDATE_EXPENSE': return `تعديل مصروف: ${p.desc} (${p.amount})`;
        case 'DELETE_EXPENSE': return `حذف مصروف: ${p.desc} (${p.amount})`;
        case 'CLOSE_DAY': return `إغلاق وتأكيد اليومية. المبيعات: ${p.sales}`;
        case 'CLOSE_SHIFT': return `إغلاق وردية كاشير. المبيعات: ${p.sales}`;
        case 'OPEN_SHIFT': return `فتح وردية جديدة بفوندوكاس: ${p.opening}`;
        case 'ADD_EMPLOYEE': return `إضافة موظف جديد: ${p.name}`;
        case 'UPDATE_EMPLOYEE': return `تعديل بيانات الموظف: ${p.name}`;
        case 'DELETE_EMPLOYEE': return `حذف/تعطيل الموظف: ${p.name}`;
        case 'ADD_USER': return `إنشاء حساب نظام: ${p.username}`;
        case 'DELETE_USER': return `حذف حساب: ${p.username}`;
        case 'PAY_SALARY': return `صرف راتب موظف بقيمة: ${p.amount}`;
        case 'ADD_SUPPLIER': return `إضافة مورد جديد: ${p.name}`;
        case 'UPDATE_SUPPLIER': return `تعديل بيانات المورد: ${p.name}`;
        case 'DELETE_SUPPLIER': return `حذف بيانات المورد`;
        case 'ADD_RECEIPT': return `استلام فاتورة/سلعة بقيمة: ${p.amount}`;
        case 'UPDATE_RECEIPT': return `تعديل فاتورة مورد إلى: ${p.amount}`;
        case 'DELETE_RECEIPT': return `حذف فاتورة مورد`;
        case 'ADD_PAYMENT': return `تسديد دفعة لمورد بقيمة: ${p.amount}`;
        case 'UPDATE_PAYMENT': return `تعديل تسديد مورد إلى: ${p.amount}`;
        case 'DELETE_PAYMENT': return `حذف تسديد مورد`;
        case 'ADD_ADVANCE': return `تقديم سلفة بقيمة: ${p.amount}`;
        case 'UPDATE_ADVANCE': return `تعديل سلفة إلى: ${p.amount}`;
        case 'DELETE_ADVANCE': return `إلغاء سلفة مالية`;
        case 'ADD_TASK': return `إضافة مهمة للأجندة: ${p.title}`;
        case 'UPDATE_TASK_STATUS': return `تغيير حالة مهمة إلى: ${p.status}`;
        case 'DELETE_TASK': return `حذف مهمة من الأجندة`;
        case 'RESCHEDULE_TASK': return `تأجيل مهمة إلى تاريخ: ${p.newDate}`;
        case 'CHECK_IN': return `تسجيل حضور الساعة: ${p.time}`;
        case 'CHECK_OUT': return `تسجيل انصراف الساعة: ${p.time}`;
        case 'UPDATE_ATTENDANCE': return `تعديل وقت حضور/انصراف الموظف`;
        default: return t(`audit.details.${log.action}`, p) || JSON.stringify(p);
      }
    } catch (e) { return log.details; }
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [storeName, setStoreName] = useState(localStorage.getItem('storeName') || 'GHERBI.AI');

  const handleSaveStoreName = (e) => {
    e.preventDefault();
    localStorage.setItem('storeName', storeName);
    setIsSettingsOpen(false);
    showToast('success', t('settings.modal.saveSuccess', 'تم حفظ التغييرات بنجاح!'));
  };

  useEffect(() => {
    const fetchAndNotifyUrgentData = async () => {
      try {
        if (window.api && window.api.getAgendaTasks) {
          const tasks = await window.api.getAgendaTasks();
          const todayString = new Date().toISOString().split('T')[0];
          const urgent = tasks.filter(task => ((task.task_date && task.task_date <= todayString) || (task.date && task.date <= todayString)) && task.status === 'pending');
          setUrgentTasks(urgent);
          if (urgent.length > 0) {
            const hasNotified = sessionStorage.getItem('notified_urgent_tasks');
            if (!hasNotified && window.api.showNotification) {
              window.api.showNotification({ title: t('dashboard.alerts.systemTitle', 'تنبيهات النظام'), body: t('dashboard.alerts.urgentBody', { count: urgent.length, defaultValue: `لديك ${urgent.length} مهام مستحقة.` }) });
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
            window.api.getSuppliers(), window.api.getExpenses(), window.api.getTodayAttendance(todayString), window.api.getDueThisWeek()
          ]);
          const totalDebts = suppliers.reduce((sum, s) => sum + (s.total_debt || s.totalDebt || 0), 0);
          const topCreditors = [...suppliers].filter(s => (s.total_debt || s.totalDebt || 0) > 0).sort((a, b) => (b.total_debt || b.totalDebt || 0) - (a.total_debt || a.totalDebt || 0)).slice(0, 5).map(s => ({ name: s.name, debt: s.total_debt || s.totalDebt || 0 }));
          const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
          const presentEmployees = attendance.filter(emp => emp.status === 'present').length;
          let totalEmployees = 0;
          if (window.api.getEmployees) {
             const employeesObj = await window.api.getEmployees();
             totalEmployees = (Array.isArray(employeesObj) ? employeesObj : Object.values(employeesObj).filter(e => typeof e === 'object' && e !== null)).length;
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
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('dashboard.title', 'لوحة القيادة')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('dashboard.subtitle', 'نظرة عامة على النظام')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors">
            <Settings size={18} /><span>{t('sidebar.settings', 'الإعدادات')}</span>
          </button>
          <button onClick={() => navigate('/expenses')} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors">
            <Plus size={18} /><span>{t('dashboard.quickActionExpense', 'إضافة مصروف')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.totalDebts', 'إجمالي ديون الموردين')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.totalDebts.toLocaleString()} {t('currency', 'د.ج')}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><TrendingUp size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-red-900/30 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.dueThisWeek', 'مستحقات هذا الأسبوع')}</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">{stats.dueThisWeek.toLocaleString()} {t('currency', 'د.ج')}</h3>
            </div>
            <div className="p-2 bg-red-950/50 rounded-lg text-red-400"><AlertCircle size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.activeEmployees', 'العمال الحاضرين')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.presentEmployees} / {stats.totalEmployees || 0}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><Users size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.expenses', 'إجمالي المصاريف')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.totalExpenses.toLocaleString()} {t('currency', 'د.ج')}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><Wallet size={20} /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-6">{t('dashboard.charts.topCreditors', 'أكبر الدائنين')}</h3>
          <div className="flex-1 w-full" dir="ltr"> 
            {stats.topCreditors.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topCreditors} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <RechartsTooltip cursor={{fill: '#1e293b'}} contentStyle={customTooltipStyle} formatter={(value) => [`${value.toLocaleString()} ${t('currency', 'د.ج')}`, t('suppliers.table.totalDebt', 'الدين')]} />
                  <Bar dataKey="debt" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">{t('common.noResults', 'لا توجد نتائج')}</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-2">{t('dashboard.charts.expensesDist', 'توزيع المصاريف')}</h3>
          <div className="flex-1 w-full h-full relative"><ExpensesPieChart /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-4">{t('dashboard.lists.urgentAlerts', 'تنبيهات عاجلة')}</h3>
          <div className="space-y-3">
            {urgentTasks.length === 0 ? (
              <p className="text-slate-500 text-sm">{t('dashboard.alerts.noTasks', 'لا توجد مهام.')}</p>
            ) : (
              urgentTasks.slice(0, 5).map(task => (
                <div key={task.id} className="p-3 bg-red-950/20 border border-red-900/50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-red-200 text-sm">{task.title}</p>
                    <p className="text-xs text-red-400 mt-1">{task.date || task.task_date}</p>
                  </div>
                  {task.amount > 0 && <span className="font-bold text-slate-300 text-sm">{task.amount.toLocaleString()} {t('currency', 'د.ج')}</span>}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-4">{t('dashboard.lists.recentAudit', 'سجل النشاطات الحديثة')}</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {logs.length === 0 ? (
              <div className="text-center p-4 text-slate-500 text-sm border border-dashed border-slate-800 rounded-lg">
                {t('dashboard.lists.noAuditLogs', 'لا يوجد نشاط مسجل حديثاً.')}
              </div>
            ) : (
              logs.slice(0, 8).map(log => (
                <div key={log.id} className="flex justify-between items-center p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-300">{renderAuditDetails(log)}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span className="text-blue-400 font-bold">{log.username}</span> 
                      {/* 🔴 استخدام دالة التاريخ الجديدة هنا */}
                      • <span dir="ltr" className="font-mono text-slate-400">{formatDateTime(log.created_at)}</span>
                    </p>
                  </div>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                    {log.action}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title={t('settings.modal.title', 'إعدادات المتجر')}>
        <form onSubmit={handleSaveStoreName} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
               {t('settings.modal.storeNameLabel', 'اسم المتجر')}
            </label>
            <input 
              type="text" 
              value={storeName} 
              onChange={e => setStoreName(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" 
              placeholder={t('settings.modal.storeNamePlaceholder', 'أدخل اسم المتجر')}
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
               {t('common.cancel', 'إلغاء')}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">
               {t('settings.modal.saveBtn', 'حفظ')}
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
import { Plus, Search, ArrowDownCircle, Wallet, Edit, Trash2, ShieldAlert, Filter, Info, CheckCircle2, AlertCircle } from 'lucide-react';
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
  const [hasActiveShift, setHasActiveShift] = useState(true); 
  const [toast, setToast] = useState(null); 

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

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

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

  useEffect(() => {
    const checkShift = async () => {
      if (isSuperAdmin) {
        setHasActiveShift(true);
        return;
      }
      try {
        if (window.api && window.api.getActiveShift) {
          const shift = await window.api.getActiveShift(myCaisseName);
          setHasActiveShift(!!shift); 
        }
      } catch (error) {
        console.error("Error checking shift:", error);
      }
    };
    checkShift();
  }, [isSuperAdmin, myCaisseName]);

  const openAddModal = () => {
    if (!hasActiveShift && !isSuperAdmin) {
       showToast('warning', t('expenses.shiftRequiredAlert', i18n.language === 'ar' ? 'الرجاء فتح ورديتك من شاشة الصندوق أولاً!' : i18n.language === 'fr' ? 'Veuillez ouvrir votre caisse en premier!' : 'Please open your shift first!'));
       return;
    }
    setEditingExpense(null);
    setFormData({ 
      description: '', category: 'utilities', amount: '', 
      employeeId: '', 
      supplierId: '', caisseSource: myCaisseName, 
      date: new Date().toISOString().split('T')[0] 
    });
    setIsModalOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setFormData({
      description: expense.description,
      category: expense.category,
      amount: expense.amount,
      employeeId: expense.employee_id || expense.employeeId || '',
      supplierId: expense.supplier_id || expense.supplierId || '',
      caisseSource: expense.caisse_source || myCaisseName, 
      date: expense.date || new Date().toISOString().split('T')[0] 
    });
    setIsModalOpen(true);
  };

  // 🔴 الإصلاح السحري هنا: تمرير (expenseToDelete.id) للباك-اند وليس الكائن بأكمله
  const confirmDelete = async () => {
    if (!expenseToDelete) return;
    try {
      let result;
      if (expenseToDelete.category === 'advance' && window.api.deleteAdvance) {
        result = await window.api.deleteAdvance(expenseToDelete.id); // تمرير الـ ID فقط
      } else if (expenseToDelete.category === 'supplier_payment' && window.api.deletePayment) {
        result = await window.api.deletePayment(expenseToDelete.id); // تمرير الـ ID فقط
      } else if (window.api.deleteExpense) {
        result = await window.api.deleteExpense(expenseToDelete.id, user?.username || 'Unknown'); // تمرير الـ ID واسم المستخدم
      }

      if (result && result.success) {
        fetchExpensesList();
        showToast('success', t('common.success', i18n.language === 'ar' ? 'تم الحذف بنجاح' : i18n.language === 'fr' ? 'Supprimé avec succès' : 'Deleted successfully'));
      } else {
        showToast('error', t('common.error', i18n.language === 'ar' ? 'حدث خطأ أثناء الحذف' : 'Error deleting'));
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
      if (editingExpense) {
        if (formData.category === 'advance' && window.api.updateAdvance) {
          await window.api.updateAdvance(editingExpense.id, {
             employeeId: formData.employeeId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        } else if (formData.category === 'supplier_payment' && window.api.updatePayment) {
          await window.api.updatePayment(editingExpense.id, {
             supplierId: formData.supplierId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        } else if (window.api.updateExpense) {
          await window.api.updateExpense(editingExpense.id, { 
            description: formData.description, category: formData.category, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource 
          });
        }
      } else {
        if (formData.category === 'advance' && window.api.addAdvance) {
          await window.api.addAdvance({
            employeeId: formData.employeeId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        } else if (formData.category === 'supplier_payment' && window.api.addPayment) {
          await window.api.addPayment({
            supplierId: formData.supplierId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        } else if (window.api.addExpense) {
          await window.api.addExpense({ 
            description: formData.description, category: formData.category, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource 
          });
        }
      }

      setIsModalOpen(false);
      setEditingExpense(null);
      fetchExpensesList(); 
      showToast('success', t('common.success', i18n.language === 'ar' ? 'تم الحفظ بنجاح' : i18n.language === 'fr' ? 'Enregistré avec succès' : 'Saved successfully'));
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

      {!hasActiveShift && !isSuperAdmin && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/50 p-4 rounded-xl flex items-center gap-3 animate-in fade-in">
          <ShieldAlert className="text-amber-400 shrink-0" size={24} />
          <div>
            <h3 className="text-amber-400 font-bold">{t('expenses.shiftRequired', i18n.language === 'ar' ? 'لا توجد وردية مفتوحة!' : i18n.language === 'fr' ? 'Aucune caisse ouverte!' : 'No open shift!')}</h3>
            <p className="text-amber-200/80 text-sm">
              {t('expenses.shiftRequiredHint', i18n.language === 'ar' ? 'لا يمكنك إضافة مصاريف أو سلفيات. الرجاء الذهاب إلى شاشة "الصندوق" وفتح ورديتك أولاً.' : i18n.language === 'fr' ? 'Vous devez ouvrir votre caisse avant d\'ajouter des dépenses.' : 'You must open your shift before adding expenses.')}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Wallet className="text-blue-500" /> {t('expenses.title', i18n.language === 'ar' ? 'المصاريف والسلف' : i18n.language === 'fr' ? 'Dépenses et Avances' : 'Expenses & Advances')}
          </h1>
          <p className="text-slate-500">{t('expenses.subtitle', i18n.language === 'ar' ? 'تتبع كل الحركات المالية الخارجة' : i18n.language === 'fr' ? 'Suivre toutes les transactions sortantes' : 'Track all outgoing transactions')}</p>
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
                 <option value="all">{t('expenses.allCaisses', i18n.language === 'ar' ? 'كل الصناديق' : i18n.language === 'fr' ? 'Toutes les caisses' : 'All Caisses')}</option>
                 {availableCaisses.map(c => (
                   <option key={c} value={c}>
                     {c === 'admin' ? t('expenses.adminCaisse', i18n.language === 'ar' ? 'صندوق المدير' : i18n.language === 'fr' ? 'Caisse Admin' : 'Admin Caisse') : t('expenses.cashierCaisse', { name: c, defaultValue: i18n.language === 'ar' ? `صندوق الكاشير: ${c}` : `Caisse: ${c}` })}
                   </option>
                 ))}
               </select>
             </div>
          )}

          <button 
            onClick={openAddModal} 
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              !hasActiveShift && !isSuperAdmin 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Plus size={18} /><span>{t('expenses.addExpense', i18n.language === 'ar' ? 'إضافة مصروف' : i18n.language === 'fr' ? 'Ajouter une dépense' : 'Add Expense')}</span>
          </button>
        </div>
      </div>

      {!isSuperAdmin && (
        <div className="mb-6 bg-blue-900/20 border border-blue-800/50 rounded-lg p-3 flex items-center gap-3 text-blue-300 text-sm" dir={i18n.dir()}>
           <Info size={18} className="text-blue-400 shrink-0" />
           <p className="leading-relaxed">
             {t('expenses.cashierNotice', { name: myCaisseName, defaultValue: i18n.language === 'ar' ? `أنت تشاهد المصاريف والدفعات التي تمت من صندوقك الخاص فقط (${myCaisseName}).` : i18n.language === 'fr' ? `Vous consultez uniquement les dépenses de votre caisse (${myCaisseName}).` : `Viewing expenses for your caisse only (${myCaisseName}).` })}
           </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.today', i18n.language === 'ar' ? 'مصاريف اليوم' : i18n.language === 'fr' ? 'Dépenses du jour' : 'Today Expenses')}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{todayTotal.toLocaleString()} {t('currency', 'DA')}</h3>
          </div>
          <div className="p-3 bg-red-950/30 rounded-lg text-red-400"><ArrowDownCircle size={24} /></div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.month', i18n.language === 'ar' ? 'إجمالي المصاريف' : i18n.language === 'fr' ? 'Dépenses Totales' : 'Total Expenses')}</p>
            <h3 className="text-2xl font-bold text-slate-300 mt-1">{monthTotal.toLocaleString()} {t('currency', 'DA')}</h3>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg text-slate-400"><Wallet size={24} /></div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 bg-slate-950/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('common.search', i18n.language === 'ar' ? 'بحث...' : i18n.language === 'fr' ? 'Rechercher...' : 'Search...')} className="w-full bg-slate-900 border border-slate-700 rounded-lg ps-10 pe-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner text-start" dir={isRTL ? "rtl" : "ltr"} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.date', i18n.language === 'ar' ? 'التاريخ' : i18n.language === 'fr' ? 'Date' : 'Date')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.description', i18n.language === 'ar' ? 'البيان / الوصف' : i18n.language === 'fr' ? 'Description' : 'Description')}</th>
                {isSuperAdmin && <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('expenses.caisseSourceLabel', i18n.language === 'ar' ? 'المصدر' : i18n.language === 'fr' ? 'Source' : 'Source')}</th>}
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.amount', i18n.language === 'ar' ? 'المبلغ' : i18n.language === 'fr' ? 'Montant' : 'Amount')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions', i18n.language === 'ar' ? 'الإجراءات' : i18n.language === 'fr' ? 'Actions' : 'Actions')}</th>
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
                         {exp.caisse_source === 'admin' ? t('common.superAdmin', i18n.language === 'ar' ? 'المدير' : i18n.language === 'fr' ? 'Admin' : 'Admin') : exp.caisse_source}
                       </span>
                     </td>
                  )}

                  <td className="px-6 py-4 text-start font-bold text-red-400">{exp.amount.toLocaleString()} {t('currency', 'DA')}</td>
                  
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEditModal(exp)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('expenses.editExpense', i18n.language === 'ar' ? 'تعديل' : i18n.language === 'fr' ? 'Modifier' : 'Edit')}>
                        <Edit size={18} />
                      </button>
                      <button onClick={() => setExpenseToDelete(exp)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors" title={t('suppliers.actions.delete', i18n.language === 'ar' ? 'حذف' : i18n.language === 'fr' ? 'Supprimer' : 'Delete')}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr><td colSpan={isSuperAdmin ? "5" : "4"} className="px-6 py-12 text-center text-slate-500">{t('common.noResults', i18n.language === 'ar' ? 'لا توجد نتائج' : i18n.language === 'fr' ? 'Aucun résultat' : 'No results')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmAlert isOpen={!!expenseToDelete} onClose={() => setExpenseToDelete(null)} onConfirm={confirmDelete} title={t('suppliers.actions.delete', i18n.language === 'ar' ? 'حذف' : 'Delete')} message={t('expenses.deleteConfirm', i18n.language === 'ar' ? 'هل أنت متأكد من حذف هذا السجل؟' : 'Are you sure?')} confirmText={t('suppliers.actions.confirmDeleteBtn', i18n.language === 'ar' ? 'نعم، احذف' : 'Yes, Delete')} />

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingExpense(null); }} title={editingExpense ? t('expenses.editExpense', i18n.language === 'ar' ? 'تعديل' : 'Edit') : t('expenses.addExpense', i18n.language === 'ar' ? 'إضافة مصروف' : 'Add Expense')}>
        <form className="space-y-4" onSubmit={handleSubmitExpense} dir={isRTL ? "rtl" : "ltr"}>
          
          {isSuperAdmin && (
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.caisseSourceLabel', i18n.language === 'ar' ? 'مصدر الأموال' : i18n.language === 'fr' ? 'Source des fonds' : 'Fund Source')}</label>
               <select value={formData.caisseSource} onChange={e => setFormData({...formData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                 <option value="admin">{t('expenses.adminCaisse', i18n.language === 'ar' ? 'صندوق المدير' : i18n.language === 'fr' ? 'Caisse Admin' : 'Admin Caisse')}</option>
                 {availableCaisses.filter(c => c !== 'admin').map(c => <option key={c} value={c}>{t('expenses.cashierCaisse', { name: c, defaultValue: i18n.language === 'ar' ? `صندوق الكاشير: ${c}` : `Caisse: ${c}` })}</option>)}
               </select>
             </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.category', i18n.language === 'ar' ? 'التصنيف' : i18n.language === 'fr' ? 'Catégorie' : 'Category')}</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" disabled={!!editingExpense}>
              <option value="utilities">{t('expenses.categories.utilities', i18n.language === 'ar' ? 'فواتير وخدمات' : i18n.language === 'fr' ? 'Factures' : 'Utilities')}</option>
              <option value="maintenance">{t('expenses.categories.maintenance', i18n.language === 'ar' ? 'صيانة وإصلاح' : i18n.language === 'fr' ? 'Maintenance' : 'Maintenance')}</option>
              <option value="supplies">{t('expenses.categories.supplies', i18n.language === 'ar' ? 'مستلزمات المتجر' : i18n.language === 'fr' ? 'Fournitures' : 'Supplies')}</option>
              <option value="advance">{t('expenses.categories.advance', i18n.language === 'ar' ? 'سلفة عامل' : i18n.language === 'fr' ? 'Avance Employé' : 'Employee Advance')}</option>
              <option value="supplier_payment">{t('expenses.categories.supplier_payment', i18n.language === 'ar' ? 'تسديد مورد' : i18n.language === 'fr' ? 'Paiement Fournisseur' : 'Supplier Payment')}</option>
            </select>
          </div>

          {formData.category === 'advance' && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2 text-start">
                {t('expenses.selectEmployee', i18n.language === 'ar' ? 'اختر الموظف' : i18n.language === 'fr' ? 'Choisir un employé' : 'Select Employee')}
              </label>
              <select 
                value={formData.employeeId} 
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })} 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 text-start"
                required
              >
                <option value="" disabled>{t('expenses.selectEmployeePlaceholder', i18n.language === 'ar' ? '-- اختر الموظف لتقديم السلفة --' : '-- Choose employee --')}</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} {emp.name === user?.username ? t('expenses.myAdvance', i18n.language === 'ar' ? " - (سلفتي الشخصية)" : " - (My Advance)") : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.category === 'supplier_payment' && (
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('suppliers.modal.nameLabel', i18n.language === 'ar' ? 'المورد' : i18n.language === 'fr' ? 'Fournisseur' : 'Supplier')}</label>
               <select required value={formData.supplierId} onChange={e => setFormData({...formData, supplierId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                 <option value="" disabled>{t('suppliers.modal.selectSupplier', i18n.language === 'ar' ? '-- اختر مورداً --' : '-- Choose supplier --')}</option>
                 {suppliers.map(sup => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
               </select>
             </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.dateLabel', i18n.language === 'ar' ? 'التاريخ' : i18n.language === 'fr' ? 'Date' : 'Date')}</label>
            <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.amount', i18n.language === 'ar' ? 'المبلغ' : i18n.language === 'fr' ? 'Montant' : 'Amount')} ({t('currency', 'DA')})</label>
            <input type="number" min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.description', i18n.language === 'ar' ? 'البيان / الوصف' : i18n.language === 'fr' ? 'Description' : 'Description')}</label>
            <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required />
          </div>

          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setIsModalOpen(false); setEditingExpense(null); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel', i18n.language === 'ar' ? 'إلغاء' : i18n.language === 'fr' ? 'Annuler' : 'Cancel')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{editingExpense ? t('expenses.saveChanges', i18n.language === 'ar' ? 'حفظ التعديلات' : i18n.language === 'fr' ? 'Sauvegarder' : 'Save Changes') : t('expenses.addExpense', i18n.language === 'ar' ? 'إضافة مصروف' : i18n.language === 'fr' ? 'Ajouter' : 'Add Expense')}</button>
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
import { Search, Plus, UserCheck, AlertCircle, ScanLine, Users, X, Clock, Edit, Trash2, CheckCircle2, Printer, IdCard, Download } from "lucide-react";
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas'; 
import { jsPDF } from 'jspdf';         

import useEmployeeStore from "../../store/employeeStore";
import useAttendanceStore from "../../store/attendanceStore";
import useAuthStore from '../../store/authStore';
import ConfirmAlert from '../ui/ConfirmAlert'; 
import Modal from '../ui/Modal'; 

const HR = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [activeTab, setActiveTab] = useState('attendance');
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin'; 
  
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

  const [employeeToDelete, setEmployeeToDelete] = useState(null); 
  const [toast, setToast] = useState(null);
  
  const [isEditAttendanceOpen, setIsEditAttendanceOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [attTimeIn, setAttTimeIn] = useState('');
  const [attTimeOut, setAttTimeOut] = useState('');

  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [searchPin, setSearchPin] = useState('');
  const [badgeEmployee, setBadgeEmployee] = useState(null);
  const [searchError, setSearchError] = useState('');
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

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
       const actionText = result.action === 'check_in' ? t('hr.messages.checkIn', 'تم تسجيل الدخول') : t('hr.messages.checkOut', 'تم تسجيل الخروج');
       setFeedback({ type: 'success', message: `${actionText}: ${result.employeeName}` });
       fetchAttendanceForDate(attendanceDate); 
    } else if (result) {
       const errorMsg = result.message ? t(`backendErrors.${result.message}`, { name: result.employeeName, defaultValue: result.message }) : t('hr.messages.error', 'حدث خطأ');
       setFeedback({ type: 'error', message: errorMsg });
    }
    
    setPinInput("");
    if(inputRef.current) inputRef.current.focus();
    setTimeout(() => setFeedback(null), 4000);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    const store = useEmployeeStore.getState();
    const idToDelete = employeeToDelete.id;
    
    setEmployeeToDelete(null);
    
    try {
      const res = await window.api.deleteEmployee(idToDelete);
      if (res && res.success) {
        if (res.isSoftDeleted) {
          showToast('warning', t('hr.employees.softDeleted', 'تم تعطيل الحساب بنجاح')); 
        } else {
          showToast('success', t('common.success', 'تمت العملية بنجاح'));
        }
        store.fetchEmployees();
      } else {
        showToast('error', t('common.error', 'حدث خطأ'));
      }
    } catch(e) { 
      showToast('error', t('common.error', 'حدث خطأ'));
    }
  };

  const openEditAttendance = (record) => {
    setEditingRecord(record);
    setAttTimeIn(record.time_in || '');
    setAttTimeOut(record.time_out || '');
    setIsEditAttendanceOpen(true);
  };

  const saveAttendanceEdit = async (e) => {
    e.preventDefault();
    if(!editingRecord) return;
    try {
      if (window.api && window.api.updateAttendanceRecord) {
        const res = await window.api.updateAttendanceRecord(editingRecord.id, attTimeIn, attTimeOut);
        if (res.success) {
          showToast('success', t('common.success', 'تم التعديل بنجاح'));
          setIsEditAttendanceOpen(false);
          fetchAttendanceForDate(attendanceDate); 
        } else {
          showToast('error', t('common.error', 'فشل التعديل'));
        }
      }
    } catch (err) {
      showToast('error', t('common.error', 'فشل التعديل'));
    }
  };

  const handleSearchBadge = (e) => {
    e.preventDefault();
    setSearchError('');
    try {
      const emp = employees.find(e => e.pin_code === searchPin.trim());
      if (emp) {
        setBadgeEmployee(emp);
      } else {
        setSearchError(t('hr.badge.notFound', i18n.language === 'ar' ? 'لم يتم العثور على موظف بهذا الرمز!' : i18n.language === 'fr' ? 'Aucun employé trouvé avec ce code PIN !' : 'No employee found with this PIN!'));
        setBadgeEmployee(null);
      }
    } catch (error) {
      setSearchError(t('common.error', 'حدث خطأ في البحث'));
    }
  };

  // ------------------------------------------------------------------
  // 🔴 2. دالة الطباعة المباشرة لبطاقة الموظف (التقنية المعزولة - Padding 6mm)
  // ------------------------------------------------------------------
  const handleExecutePrint = () => {
    const printElement = document.getElementById('printable-badge');
    if (!printElement) return;

    let iframe = document.getElementById('silent-print-iframe');
    if (iframe) document.body.removeChild(iframe);

    iframe = document.createElement('iframe');
    iframe.id = 'silent-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="${i18n.language}" dir="${isRTL ? 'rtl' : 'ltr'}">
      <head>
        <title>Print Badge</title>
        <style>
          @page { margin: 0; }
          html, body { 
            margin: 0; 
            padding: 0;
            width: 100%;
            background: #fff; 
            color: #000; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          }
          .print-wrapper {
            width: 100%;
            max-width: 72mm; 
            margin: 0 auto;
            padding: 4mm 6mm; /* الحماية من الحواف */
            box-sizing: border-box;
          }
          .receipt-ticket-forced { width: 100%; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          ${printElement.outerHTML}
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
    }, 500);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-badge');
    if (!element) return;

    try {
      element.classList.remove('shadow-2xl');
      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      element.classList.add('shadow-2xl');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 105] 
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 80, 105);
      pdf.save(`Badge_${badgeEmployee.name.replace(/\s+/g, '_')}.pdf`);
      showToast('success', t('common.success', 'تم تحميل البطاقة بنجاح'));
    } catch (error) {
      console.error("PDF Generation Error: ", error);
      showToast('error', t('common.error', 'حدث خطأ أثناء استخراج الملف'));
    }
  };

  const presentCount = attendanceRecords.filter(r => !r.time_out).length;
  const absentCount = Math.max(0, employees.length - attendanceRecords.length);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans flex flex-col gap-6 relative text-start">
      
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

      <div className="flex justify-between items-end flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('hr.title', 'الموارد البشرية')}</h1>
          <p className="text-slate-400">{t('hr.subtitle', 'إدارة الحضور، الانصراف وسجلات العمال')}</p>
        </div>
        
        {isSuperAdmin && (
          <button 
            onClick={() => { setIsBadgeModalOpen(true); setBadgeEmployee(null); setSearchPin(''); setSearchError(''); }} 
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-lg shrink-0"
          >
            <IdCard size={18} />
            <span>{t('hr.badge.printBtn', i18n.language === 'ar' ? 'بطاقة موظف' : i18n.language === 'fr' ? 'Badge Employé' : 'Employee Badge')}</span>
          </button>
        )}
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1">
        <button onClick={() => setActiveTab('attendance')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <ScanLine size={18} /> {t('hr.tabs.attendance', 'تسجيل الدخول')}
        </button>
        <button onClick={() => setActiveTab('employees')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'employees' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <Users size={18} /> {t('hr.tabs.employees', 'قائمة العمال')}
        </button>
      </div>

      {activeTab === 'attendance' && (
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:h-[calc(100vh-220px)]">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-slate-800 p-2 rounded-lg text-blue-400"><ScanLine size={24} /></div>
                <h3 className="text-xl font-bold">{t('hr.scanner.title', 'تسجيل الدخول / الخروج')}</h3>
              </div>
              <form onSubmit={handleAttendanceSubmit} className="flex flex-col gap-4">
                <input ref={inputRef} type="password" placeholder={t('hr.scanner.placeholder', 'مسح الباركود أو أدخل الرمز...')} value={pinInput} onChange={(e) => setPinInput(e.target.value)} className="w-full text-center text-xl py-6 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 tracking-widest" autoFocus />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 rounded-lg font-medium transition-colors">{t('hr.scanner.submit', 'تسجيل')}</button>
              </form>
              
              <p className="text-xs text-slate-500 text-center mt-3">
                {t('hr.scannerHint', 'القارئ يعمل كلوحة مفاتيح. ضع المؤشر في الحقل وقم بالمسح.')}
              </p>

              {feedback && <div className={`mt-4 p-3 rounded-lg text-sm text-center border ${feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>{feedback.message}</div>}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center shadow-lg">
                <UserCheck className="text-emerald-500 mb-2" size={32} />
                <span className="text-3xl font-bold">{presentCount}</span>
                <span className="text-slate-400 text-sm mt-1">{t('hr.kpi.present', 'حاضر اليوم')}</span>
              </div>
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center shadow-lg">
                <AlertCircle className="text-red-500 mb-2" size={32} />
                <span className="text-3xl font-bold">{absentCount}</span>
                <span className="text-slate-400 text-sm mt-1">{t('hr.kpi.absent', 'غائب')}</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /> {t('hr.attendanceLog', 'سجل حركة الموظفين لليوم')}</h3>
              <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} className="bg-slate-950 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                    <th className="px-6 py-4 font-medium text-start">{t('hr.table.nameWithRole', 'الموظف')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.timeIn', 'وقت الدخول')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.timeOut', 'وقت الخروج')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.status', 'الحالة')}</th>
                    {isSuperAdmin && <th className="px-6 py-4 font-medium text-center">{t('suppliers.table.actions', 'إجراء')}</th>}
                  </tr>
                </thead>
                <tbody>
                  {attLoading ? (
                    <tr><td colSpan={isSuperAdmin ? 5 : 4} className="text-center py-12 text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</td></tr>
                  ) : attendanceRecords.length === 0 ? (
                    <tr><td colSpan={isSuperAdmin ? 5 : 4} className="text-center py-12 text-slate-500">{t('hr.table.emptyRecord', 'لا توجد سجلات')}</td></tr>
                  ) : (
                    attendanceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-start text-white">
                          {record.employee_name || record.name} 
                          {record.role && <span className="text-xs text-slate-500 mx-2">({t(`hr.roles.${record.role}`, {defaultValue: record.role})})</span>}
                        </td>
                        <td className="px-6 py-4 text-center text-emerald-400 font-bold">{record.time_in || '--:--'}</td>
                        <td className="px-6 py-4 text-center text-orange-400 font-bold">{record.time_out || '--:--'}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${!record.time_out ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                            {!record.time_out ? t('hr.status.present', 'في الدوام') : t('hr.status.departed', 'أنهى الدوام')}
                          </span>
                        </td>
                        {isSuperAdmin && (
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => openEditAttendance(record)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('hr.employees.actions.edit', 'تعديل الوقت')}>
                              <Edit size={16} />
                            </button>
                          </td>
                        )}
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
              <Plus size={18} /> {t('hr.employees.addBtn', 'إضافة موظف')}
            </button>
            <div className="relative w-1/3 text-start">
              <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder={t('hr.employees.search', 'بحث...')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" dir={isRTL ? "rtl" : "ltr"} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.name', 'الاسم')}</th>
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.role', 'المنصب')}</th>
                  <th className="px-6 py-4 font-medium text-center">{t('hr.employees.table.status', 'الحالة')}</th>
                  <th className="px-6 py-4 font-medium text-center">{t('hr.employees.table.actions', 'إجراء')}</th>
                </tr>
              </thead>
              <tbody>
                {empLoading ? (
                  <tr><td colSpan={4} className="text-center py-8 text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</td></tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-8 text-slate-500">{t('hr.employees.empty', 'لا يوجد')}</td></tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                      <td className="px-6 py-4 font-medium text-start text-white">{emp.name}</td>
                      <td className="px-6 py-4 text-slate-400 text-start">{t(`hr.roles.${emp.role}`, { defaultValue: emp.role })}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{t('hr.status.active', 'نشط')}</span>
                      </td>
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button onClick={() => { setFormData({ name: emp.name, role: emp.role, pinCode: emp.pin_code }); setEditingEmployee(emp); setIsDialogOpen(true); }} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title={t('hr.employees.actions.edit', 'تعديل')}><Edit size={18} /></button>
                        <button onClick={() => setEmployeeToDelete(emp)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title={t('hr.employees.actions.delete', 'حذف')}><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Modal isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title={editingEmployee ? t('hr.dialog.editTitle', 'تعديل') : t('hr.dialog.title', 'إضافة موظف')}>
              <div className="p-2 text-start">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!formData.name || !formData.pinCode) return;
                    const store = useEmployeeStore.getState();
                    let success;
                    if (editingEmployee) {
                       if (store.updateEmployee) success = await store.updateEmployee(editingEmployee.id, formData);
                    } else success = await store.addEmployee(formData);
                    
                    if (success) { 
                      setIsDialogOpen(false); 
                      store.fetchEmployees(); 
                      showToast('success', t('common.success', 'تمت العملية بنجاح'));
                    } else { showToast('error', t('common.error', 'حدث خطأ')); }
                  }} className="flex flex-col gap-4 text-start">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.name', 'الاسم')}</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.role', 'المنصب')}</label>
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required>
                      <option value="" disabled>{t('hr.dialog.rolePlaceholder', 'اختر...')}</option>
                      <option value="cashier">{t('hr.roles.cashier', 'كاشير')}</option>
                      <option value="scale">{t('hr.roles.scale', 'ميزان')}</option>
                      <option value="stock">{t('hr.roles.stock', 'ترتيبات')}</option>
                      <option value="superadmin">Super Admin (المدير العام)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.pin', 'رمز الدخول')}</label>
                    <input type="password" value={formData.pinCode} onChange={(e) => setFormData({...formData, pinCode: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white tracking-widest text-start" required />
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel', 'إلغاء')}</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">{editingEmployee ? t('hr.dialog.saveChanges', 'حفظ التعديلات') : t('hr.dialog.save', 'إضافة')}</button>
                  </div>
                </form>
              </div>
          </Modal>
        </div>
      )}

      {/* شاشة طباعة البطاقة (A7 Thermal Hardware Print) */}
      <Modal isOpen={isBadgeModalOpen} onClose={() => setIsBadgeModalOpen(false)} title={t('hr.badge.modalTitle', i18n.language === 'ar' ? 'إصدار بطاقة الدخول (Barcode)' : i18n.language === 'fr' ? "Émettre un badge d'accès" : 'Issue Access Badge (Barcode)')}>
        <div className="p-4 text-start" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-slate-400 mb-4 text-sm">
            {t('hr.badge.modalDesc', i18n.language === 'ar' ? 'أدخل الرمز السري للموظف لتحويله إلى باركود قابل للطباعة والمسح الضوئي.' : i18n.language === 'fr' ? "Entrez le code PIN de l'employé pour générer un code-barres." : 'Enter the employee PIN to generate a printable barcode.')}
          </p>
          
          <form onSubmit={handleSearchBadge} className="flex gap-2 mb-6">
            <input 
              type="password" 
              placeholder={t('hr.badge.searchPlaceholder', i18n.language === 'ar' ? 'أدخل رمز PIN...' : i18n.language === 'fr' ? 'Entrez le code PIN...' : 'Enter PIN code...')}
              value={searchPin}
              onChange={(e) => setSearchPin(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 tracking-widest text-center"
            />
            <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
              <Search size={18} />
            </button>
          </form>

          {searchError && <div className="text-red-400 text-sm mb-4 text-center">{searchError}</div>}

          {badgeEmployee && (
            <div className="flex flex-col items-center border-t border-slate-800 pt-6">
              
              <div 
                 id="printable-badge" 
                 className="receipt-ticket-forced bg-white text-black shadow-2xl p-4 rounded-md mb-6 flex flex-col justify-between" 
                 dir={isRTL ? "rtl" : "ltr"} 
                 style={{ width: '80mm', minHeight: '105mm', margin: '0 auto' }}
              >
                <div>
                    <div className="header-title" style={{ fontSize: '16px', marginBottom: '5px', textAlign: 'center', fontWeight: 'bold' }}>
                      {currentStoreName}
                    </div>
                    <div className="header-subtitle" style={{ borderBottom: '1px dashed #000', paddingBottom: '5px', textAlign: 'center', fontSize: '12px' }}>
                      {t('hr.badge.idCard', i18n.language === 'ar' ? 'بطاقة تعريف الموظف' : i18n.language === 'fr' ? "CARTE D'IDENTITÉ EMPLOYÉ" : 'EMPLOYEE ID CARD')}
                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                       <h2 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 5px 0' }}>{badgeEmployee.name}</h2>
                       <p style={{ fontSize: '13px', margin: '0 0 15px 0', color: '#444' }}>
                          {t(`hr.roles.${badgeEmployee.role}`, {defaultValue: badgeEmployee.role})}
                       </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                      <div dir="ltr"> 
                          <Barcode 
                            value={badgeEmployee.pin_code} 
                            width={2.5} 
                            height={70} 
                            fontSize={16}
                            margin={0}
                            background="#ffffff"
                            lineColor="#000000"
                          />
                      </div>
                    </div>
                </div>

                <div className="footer-area" style={{ marginTop: 'auto', paddingTop: '10px', fontSize: '11px', textAlign: 'center', borderTop: '1px dashed #000' }}>
                  {t('hr.badge.scanInstruction', i18n.language === 'ar' ? 'يرجى مسح هذا الباركود عند الدخول والخروج.' : i18n.language === 'fr' ? "Veuillez scanner ce code-barres à l'entrée et à la sortie." : 'Please scan this barcode upon entry and exit.')}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-4 no-print">
                 <button onClick={handleExecutePrint} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <Printer size={18} /> {t('hr.badge.printExecute', i18n.language === 'ar' ? 'طباعة' : i18n.language === 'fr' ? 'Imprimer' : 'Print')}
                 </button>

                 <button onClick={handleDownloadPDF} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <Download size={18} /> {t('hr.badge.downloadPDF', i18n.language === 'ar' ? 'استخراج PDF' : i18n.language === 'fr' ? 'Télécharger PDF' : 'Download PDF')}
                 </button>

                 <button onClick={() => setIsBadgeModalOpen(false)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-2 rounded-lg transition-colors">
                   {t('common.cancel', i18n.language === 'ar' ? 'إلغاء' : i18n.language === 'fr' ? 'Annuler' : 'Cancel')}
                 </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal isOpen={isEditAttendanceOpen} onClose={() => setIsEditAttendanceOpen(false)} title={t('hr.employees.actions.edit', 'تعديل توقيت الدوام')}>
        <form onSubmit={saveAttendanceEdit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('hr.table.nameWithRole', 'الموظف')}</label>
            <input type="text" value={editingRecord?.employee_name || editingRecord?.name || ''} disabled className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-400 cursor-not-allowed" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-emerald-400 mb-1 text-start">{t('hr.table.timeIn', 'وقت الدخول')}</label>
              <input type="time" step="1" required value={attTimeIn} onChange={(e) => setAttTimeIn(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-center text-lg" />
            </div>
            <div>
              <label className="block text-sm font-bold text-orange-400 mb-1 text-start">{t('hr.table.timeOut', 'وقت الخروج')}</label>
              <input type="time" step="1" value={attTimeOut} onChange={(e) => setAttTimeOut(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-center text-lg" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-start">اترك "وقت الخروج" فارغاً إذا كان الموظف لا يزال في الدوام.</p>
          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsEditAttendanceOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel', 'إلغاء')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{t('hr.dialog.saveChanges', 'حفظ التعديلات')}</button>
          </div>
        </form>
      </Modal>

      <ConfirmAlert 
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={confirmDelete}
        title={t('hr.employees.actions.delete', 'حذف')}
        message={t('hr.employees.deleteConfirmMsg', { name: employeeToDelete?.name, defaultValue: `تأكيد الحذف` })}
        cancelText={t('common.cancel', 'إلغاء')}
        confirmText={t('common.confirm', 'تأكيد')}
      />

    </div>
  );
};

export default HR;
```

---

## `frontend\src\components\pages\Inventory.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Printer, FileText, LayoutList, CheckCircle2, AlertCircle, Edit, Trash2, Tag, Layers, Package, ScanLine } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmAlert from '../ui/ConfirmAlert';

export default function Inventory() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  const [treeData, setTreeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // الفلاتر للواجهة
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // حالة النوافذ المنبثقة (Modals)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('product'); // 'family' | 'type' | 'product'
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // بيانات النماذج
  const [familyName, setFamilyName] = useState('');
  const [typeData, setTypeData] = useState({ familyId: '', name: '' });
  const [productData, setProductData] = useState({ typeId: '', name: '', piecesPerBox: 1, price: 0, systemQty: 0 });

  const [itemToDelete, setItemToDelete] = useState(null); // { kind: 'family|type|product', id: 1 }

  // وضع الجرد الرقمي
  const [isDigitalMode, setIsDigitalMode] = useState(false);

  // إشعارات
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // جلب البيانات
  const fetchTree = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getInventoryTree) {
        const res = await window.api.getInventoryTree();
        if (res.success) setTreeData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTree();
  }, []);

  // ----------------------------------------------------------------
  // معالجة الإضافات (عائلة، نوع، منتج)
  // ----------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (modalMode === 'family') {
        res = await window.api.addInvFamily(familyName);
      } else if (modalMode === 'type') {
        res = await window.api.addInvType(typeData.familyId, typeData.name);
      } else if (modalMode === 'product') {
        res = await window.api.addInvItem(productData);
      }

      if (res && res.success) {
        showToast('success', t('common.success', 'تمت الإضافة بنجاح'));
        setIsModalOpen(false);
        setFamilyName('');
        setTypeData({ familyId: '', name: '' });
        setProductData({ typeId: '', name: '', piecesPerBox: 1, price: 0, systemQty: 0 });
        fetchTree();
      } else {
        showToast('error', t('common.error', 'حدث خطأ'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    try {
      let res;
      if (itemToDelete.kind === 'family') res = await window.api.deleteInvFamily(itemToDelete.id);
      else if (itemToDelete.kind === 'type') res = await window.api.deleteInvType(itemToDelete.id);
      else if (itemToDelete.kind === 'product') res = await window.api.deleteInvItem(itemToDelete.id);

      if (res && res.success) {
        showToast('success', t('common.success', 'تم الحذف'));
        fetchTree();
      } else {
        showToast('error', t('common.error', 'خطأ في الحذف'));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setItemToDelete(null);
    }
  };

  // ----------------------------------------------------------------
  // تجميع وتصفية المنتجات للعرض والطباعة
  // ----------------------------------------------------------------
  const getAllDisplayProducts = () => {
    let products = [];
    treeData.forEach(family => {
      if (selectedFamily !== 'all' && selectedFamily !== family.id.toString()) return;
      family.types.forEach(type => {
        if (selectedType !== 'all' && selectedType !== type.id.toString()) return;
        type.items.forEach(item => {
          if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return;
          products.push({ ...item, familyName: family.name, typeName: type.name });
        });
      });
    });
    return products;
  };

  const displayProducts = getAllDisplayProducts();

  // ----------------------------------------------------------------
  // 🖨️ نظام الطباعة A4 المزدوج (الورقة مقسومة نصفين)
  // ----------------------------------------------------------------
  const handlePrintA4 = () => {
    const products = getAllDisplayProducts();
    if (products.length === 0) return alert('لا توجد منتجات للطباعة');

    let iframe = document.getElementById('silent-print-iframe');
    if (iframe) document.body.removeChild(iframe);
    iframe = document.createElement('iframe');
    iframe.id = 'silent-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    // قسمة المنتجات إلى نصفين
    const midpoint = Math.ceil(products.length / 2);
    const leftCol = products.slice(0, midpoint);
    const rightCol = products.slice(midpoint);

    const renderTableRows = (items) => {
      return items.map(item => `
        <tr style="border-bottom: 1px solid #000;">
          <td style="border: 1px solid #000; padding: 6px;"></td> <!-- خانة الكمية فارغة -->
          <td style="border: 1px solid #000; padding: 6px; text-align: center;">${item.pieces_per_box}</td>
          <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${item.name}</td>
          <td style="border: 1px solid #000; padding: 6px; text-align: center;">${item.price}</td>
        </tr>
      `).join('');
    };

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="${i18n.language}" dir="${isRTL ? 'rtl' : 'ltr'}">
      <head>
        <title>Inventory A4</title>
        <style>
          @page { size: A4; margin: 10mm; }
          body { font-family: sans-serif; color: #000; background: #fff; margin: 0; }
          h2 { text-align: center; margin: 0 0 5px 0; }
          .header-info { text-align: center; margin-bottom: 20px; font-size: 14px; }
          .container { display: flex; gap: 15px; width: 100%; }
          .column { flex: 1; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { background: #f0f0f0; border: 1px solid #000; padding: 8px 6px; text-align: center; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>${currentStoreName}</h2>
        <div class="header-info">ورقة جرد المخزون (Inventaire) - ${new Date().toISOString().split('T')[0]}</div>
        
        <div class="container">
          <!-- النصف الأول -->
          <div class="column">
            <table>
              <thead>
                <tr>
                  <th style="width: 20%;">Quantité<br>(الكمية)</th>
                  <th style="width: 15%;">Pièce/B<br>(حبة/علبة)</th>
                  <th style="width: 45%;">Produit<br>(المنتج)</th>
                  <th style="width: 20%;">Prix<br>(السعر)</th>
                </tr>
              </thead>
              <tbody>${renderTableRows(leftCol)}</tbody>
            </table>
          </div>
          
          <!-- النصف الثاني -->
          <div class="column">
            <table>
              <thead>
                <tr>
                  <th style="width: 20%;">Quantité<br>(الكمية)</th>
                  <th style="width: 15%;">Pièce/B<br>(حبة/علبة)</th>
                  <th style="width: 45%;">Produit<br>(المنتج)</th>
                  <th style="width: 20%;">Prix<br>(السعر)</th>
                </tr>
              </thead>
              <tbody>${renderTableRows(rightCol)}</tbody>
            </table>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; font-size: 10px; font-weight: bold;">POWERED BY GHERBI.AI</div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => { iframe.contentWindow.print(); setIsPrintModalOpen(false); }, 500);
  };

  // ----------------------------------------------------------------
  // 🖨️ نظام الطباعة الحراري A7 (72mm مع Padding لحماية الحواف)
  // ----------------------------------------------------------------
  const handlePrintA7 = () => {
    const products = getAllDisplayProducts();
    if (products.length === 0) return alert('لا توجد منتجات للطباعة');

    let iframe = document.getElementById('silent-print-iframe');
    if (iframe) document.body.removeChild(iframe);
    iframe = document.createElement('iframe');
    iframe.id = 'silent-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="${i18n.language}" dir="${isRTL ? 'rtl' : 'ltr'}">
      <head>
        <title>Inventory A7</title>
        <style>
          @page { margin: 0; }
          html, body { margin: 0; padding: 0; width: 72mm; background: #fff; color: #000; font-family: sans-serif; }
          .print-wrapper { width: 100%; padding: 2mm 5mm; box-sizing: border-box; }
          h2 { text-align: center; font-size: 16px; margin: 0 0 5px 0; font-weight: 900; }
          .subtitle { text-align: center; font-size: 12px; margin-bottom: 10px; border-bottom: 2px dashed #000; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; font-size: 11px; font-weight: bold; }
          th { border-bottom: 1px solid #000; padding: 4px 2px; text-align: ${isRTL ? 'right' : 'left'}; }
          td { border-bottom: 1px dashed #ccc; padding: 6px 2px; }
          .qty-box { display: inline-block; width: 25px; height: 15px; border: 1px solid #000; }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          <h2>${currentStoreName}</h2>
          <div class="subtitle">Inventaire (جرد سريع)<br>${new Date().toISOString().split('T')[0]}</div>
          <table>
            <thead>
              <tr>
                <th style="width: 55%;">المنتج</th>
                <th style="width: 25%;">العلبة</th>
                <th style="width: 20%; text-align: center;">الكمية</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.pieces_per_box} p/B</td>
                  <td style="text-align: center;"><div class="qty-box"></div></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div style="text-align: center; margin-top: 15px; font-size: 10px; font-weight: 900;">POWERED BY GHERBI.AI</div>
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => { iframe.contentWindow.print(); setIsPrintModalOpen(false); }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      {/* 🔴 الشريط العلوي */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <LayoutList className="text-blue-500" /> إدارة وجرد المخزون (Inventaire)
          </h1>
          <p className="text-sm text-slate-500 mt-2">قم بإنشاء العائلات والأنواع ثم قم بطباعة أوراق الجرد لعمالك.</p>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => { setModalMode('family'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors border border-slate-700">
            <Layers size={18} /> + Famille (عائلة)
          </button>
          <button onClick={() => { setModalMode('type'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors border border-slate-700">
            <Tag size={18} /> + Type (نوع)
          </button>
          <button onClick={() => { setModalMode('product'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
            <Package size={18} /> + Produit (منتج)
          </button>
        </div>
      </div>

      {/* 🔴 شريط الفلاتر */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-wrap gap-4 justify-between items-center shadow-lg">
        <div className="flex gap-4 flex-1">
          <select value={selectedFamily} onChange={(e) => { setSelectedFamily(e.target.value); setSelectedType('all'); }} className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 min-w-[150px]">
            <option value="all">جميع العائلات (Toutes les familles)</option>
            {treeData.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>

          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 min-w-[150px]" disabled={selectedFamily === 'all'}>
            <option value="all">جميع الأنواع (Tous les types)</option>
            {treeData.find(f => f.id.toString() === selectedFamily)?.types.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <div className="relative flex-1 max-w-sm">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="بحث عن منتج..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg ps-10 pe-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setIsDigitalMode(!isDigitalMode)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${isDigitalMode ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-emerald-400 border border-emerald-900/50 hover:bg-slate-700'}`}>
            <ScanLine size={18} /> {isDigitalMode ? 'إلغاء الجرد الرقمي' : 'إدخال جرد رقمي'}
          </button>
          
          <button onClick={() => setIsPrintModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold transition-colors shadow-lg">
            <Printer size={18} /> طباعة ورقة جرد
          </button>
        </div>
      </div>

      {/* 🔴 جدول المنتجات */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">المنتج</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">التصنيف</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">العلبة (Pièce/B)</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">السعر</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">الكمية (في النظام)</th>
                {isDigitalMode ? (
                  <th className="px-6 py-4 text-sm font-bold text-emerald-400 text-center">الكمية (الواقعية)</th>
                ) : (
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">إجراءات</th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="6" className="text-center py-12 text-slate-500">جاري التحميل...</td></tr>
              ) : displayProducts.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-12 text-slate-500">لا توجد منتجات مطابقة للبحث</td></tr>
              ) : (
                displayProducts.map(item => (
                  <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-bold text-white">{item.name}</td>
                    <td className="px-6 py-4 text-center text-xs text-slate-400">
                      <span className="bg-slate-950 px-2 py-1 rounded border border-slate-700">{item.familyName}</span>
                      <span className="mx-1">/</span>
                      <span className="bg-slate-950 px-2 py-1 rounded border border-slate-700">{item.typeName}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-slate-300">{item.pieces_per_box}</td>
                    <td className="px-6 py-4 text-center font-bold text-amber-400">{item.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-300">{item.system_qty}</td>
                    
                    {isDigitalMode ? (
                      <td className="px-6 py-2 text-center bg-emerald-950/20">
                        <input type="number" placeholder="أدخل العدد" className="w-24 bg-slate-950 border border-emerald-900/50 rounded-lg px-2 py-2 text-center text-white focus:outline-none focus:border-emerald-500 font-bold" />
                      </td>
                    ) : (
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button onClick={() => setItemToDelete({ kind: 'product', id: item.id })} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'family' ? 'إضافة عائلة (Famille)' : modalMode === 'type' ? 'إضافة نوع (Type)' : 'إضافة منتج (Produit)'}>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          
          {(modalMode === 'type' || modalMode === 'product') && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">العائلة (Famille)</label>
              <select required value={modalMode === 'type' ? typeData.familyId : productData.familyId || ''} 
                      onChange={(e) => {
                        if(modalMode === 'type') setTypeData({...typeData, familyId: e.target.value});
                        else setProductData({...productData, familyId: e.target.value, typeId: ''});
                      }} 
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500">
                <option value="" disabled>-- اختر العائلة --</option>
                {treeData.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
          )}

          {modalMode === 'product' && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">نوع المنتج (Type de Produit)</label>
              <select required value={productData.typeId} onChange={(e) => setProductData({...productData, typeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" disabled={!productData.familyId}>
                <option value="" disabled>-- اختر النوع --</option>
                {treeData.find(f => f.id.toString() === productData.familyId)?.types.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">الاسم (Nom)</label>
            <input type="text" required 
                   value={modalMode === 'family' ? familyName : modalMode === 'type' ? typeData.name : productData.name} 
                   onChange={(e) => {
                     if(modalMode === 'family') setFamilyName(e.target.value);
                     else if(modalMode === 'type') setTypeData({...typeData, name: e.target.value});
                     else setProductData({...productData, name: e.target.value});
                   }} 
                   className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" placeholder="مثال: حليب، عصائر، صابون..." />
          </div>

          {modalMode === 'product' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">حبة في العلبة (Pièce dans la boite)</label>
                <input type="number" min="1" required value={productData.piecesPerBox} onChange={(e) => setProductData({...productData, piecesPerBox: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">السعر (Le Prix)</label>
                <input type="number" min="0" required value={productData.price} onChange={(e) => setProductData({...productData, price: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800">{t('common.cancel', 'إلغاء')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">حفظ الإضافة</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} title="خيارات طباعة ورقة الجرد">
        <div className="p-6 flex flex-col gap-4">
          <p className="text-slate-400 mb-4 text-center">اختر مقاس الورق المناسب لطباعة القائمة الحالية المفلترة.</p>
          
          <button onClick={handlePrintA4} className="w-full flex items-center justify-between p-4 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 hover:text-white font-bold group">
            <div className="flex items-center gap-4">
              <FileText size={24} className="text-indigo-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">ورقة جرد كبيرة (A4)</div>
                <div className="text-xs font-normal opacity-80 mt-1">تطبع مقسومة على عمودين لتوفير المساحة</div>
              </div>
            </div>
            <Printer size={20} />
          </button>

          <button onClick={handlePrintA7} className="w-full flex items-center justify-between p-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-500 rounded-xl transition-all text-emerald-500 hover:text-white font-bold group">
            <div className="flex items-center gap-4">
              <Printer size={24} className="text-emerald-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">ورقة جرد حرارية (80mm)</div>
                <div className="text-xs font-normal opacity-80 mt-1">جرد سريع للمنطقة المحددة (طابعة الكاشير)</div>
              </div>
            </div>
            <Printer size={20} />
          </button>
        </div>
      </Modal>

      <ConfirmAlert isOpen={!!itemToDelete} onClose={() => setItemToDelete(null)} onConfirm={executeDelete} title="تأكيد الحذف" message="هل أنت متأكد أنك تريد حذف هذا العنصر؟ سيتم حذف جميع المتفرعات التابعة له." confirmText="نعم، احذف" cancelText="إلغاء" />
    </div>
  );
}
```

---

## `frontend\src\components\pages\Login.jsx`

```javascript
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ShieldCheck, Globe, AlertTriangle, Clock } from 'lucide-react'; // 🔴 تمت إضافة أيقونات النافذة المنبثقة
import useAuthStore from '../../store/authStore';

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 🔴 متغيرات التحكم في نافذة تصحيح الوقت
  const [showTimeFixModal, setShowTimeFixModal] = useState(false);
  const [manualTime, setManualTime] = useState('');
  const [lastRecordedTime, setLastRecordedTime] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (window.api && window.api.login) {
        const response = await window.api.login({ username, password });
        
        if (response && response.success) {
          login(response.user); 
          
          if (response.user.role === 'admin' || response.user.role === 'superadmin') {
            navigate('/'); 
          } else {
            navigate('/end-of-day'); 
          }
          
        } else {
          // 🔴 التعديل هنا: اصطياد خطأ الوقت المتأخر
          if (response.message === 'timeError') {
            setLastRecordedTime(response.lastDate); // نأخذ تاريخ آخر حركة من الباك إند
            setShowTimeFixModal(true); // نظهر نافذة الإنقاذ
          } else {
            // الأخطاء العادية (كلمة سر خاطئة الخ...)
            setError(response.message ? t(`backendErrors.${response.message}`, { defaultValue: response.message }) : t('login.error'));
          }
        }
      } else {
        // Fallback for development
        alert("تنبيه للمبرمج: نافذة Electron غير متصلة! (window.api مفقود)");
        setIsLoading(false);
        return;
        if(username === 'admin' && password === 'admin123') {
           login({ username: 'admin', role: 'superadmin' });
           navigate('/');
        } else if (username === 'cashier' && password === '123') { 
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

  // 🔴 دالة إصلاح وقت الويندوز
  const handleFixTime = async () => {
    if (!manualTime) return;
    
    // تحويل الوقت المدخل إلى صيغة يفهمها الويندوز
    const d = new Date(manualTime);
    const pad = (n) => n.toString().padStart(2, '0');
    const formattedTime = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    
    try {
      const result = await window.api.setWindowsTime(formattedTime);
      
      if (result.success) {
        setShowTimeFixModal(false);
        // نستخدم Alert بسيط قبل عمل Reload لتنبيه المستخدم بالنجاح
        alert(t('login.timeFixed', 'تم تحديث وقت الحاسوب بنجاح! سيتم إعادة تشغيل النظام.'));
        window.location.reload(); 
      } else {
        setError(t('login.timeFixError', 'فشلت العملية. يجب الموافقة (Yes) على شاشة الصلاحيات الزرقاء.'));
        setShowTimeFixModal(false);
      }
    } catch (error) {
      setError(t('login.serverError'));
      setShowTimeFixModal(false);
    }
  };

  const toggleLanguage = () => {
    const langs = ['ar', 'en', 'fr'];
    const currentLang = i18n.language.split('-')[0];
    const currentIndex = langs.indexOf(currentLang) !== -1 ? langs.indexOf(currentLang) : 0;
    const nextLang = langs[(currentIndex + 1) % langs.length];
    i18n.changeLanguage(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  const getLangLabel = () => {
    if(i18n.language.startsWith('en')) return 'English';
    if(i18n.language.startsWith('fr')) return 'Français';
    return 'العربية';
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative" dir={i18n.language.startsWith('ar') ? 'rtl' : 'ltr'}>
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 z-10">

        <div className="text-center mb-8 relative">
          <button onClick={toggleLanguage} className="absolute start-0 top-0 flex items-center gap-2 hover:bg-slate-800 transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
            <Globe size={18} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-300">{getLangLabel()}</span>
          </button>
          
          <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 mt-8">
            <ShieldCheck size={32} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('login.title')}</h1>
          <p className="text-slate-500 text-sm">{t('login.subtitle')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-900 rounded-lg flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle size={18} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 text-start">{t('login.username')}</label>
            <div className="relative flex items-center">
              <User size={18} className="absolute start-4 text-slate-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 transition-colors text-start"
                placeholder="admin"
                dir="ltr"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 text-start">{t('login.password')}</label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute start-4 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 transition-colors text-start"
                placeholder="••••••••"
                dir="ltr"
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

        <p className="text-center text-xs text-slate-600 mt-8 font-bold tracking-wider uppercase">
          Mohamed Cherif Gherbi &copy; 2026
        </p>
      </div>

      {/* 🛡️ نافذة الإنقاذ المنبثقة (Modal) لإصلاح الوقت - تظهر فقط عند الحاجة */}
      {showTimeFixModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-red-500/50 p-6 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{t('login.timeModalTitle', 'تنبيه: وقت الحاسوب غير صحيح ⚠️')}</h2>
              
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-6 w-full text-start">
                 <p className="text-slate-400 text-sm leading-relaxed">
                   اكتشف النظام أن وقت الحاسوب متأخر عن آخر عملية مسجلة. لحماية البيانات من التلف، يرجى تحديث الوقت للزمن الحالي:
                 </p>
                 <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                    <Clock size={14} className="text-emerald-500"/>
                    <span>آخر عملية مسجلة: <strong className="text-emerald-400" dir="ltr">{lastRecordedTime}</strong></span>
                 </div>
              </div>
              
              <div className="w-full text-start mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">الوقت والتاريخ الصحيحين (الآن):</label>
                <div className="relative">
                  <Clock size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="datetime-local" 
                    value={manualTime}
                    onChange={(e) => setManualTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-red-500" 
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button onClick={() => setShowTimeFixModal(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-3 rounded-lg font-medium transition-colors">
                  {t('common.cancel', 'إلغاء')}
                </button>
                <button onClick={handleFixTime} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors">
                  {t('login.fixTimeBtn', 'تحديث وقت الحاسوب')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

  const [products] = useState([
    { id: 1, name: 'حليب جرجرة 1 لتر', price: 100, barcode: '123456789' },
    { id: 2, name: 'قهوة أروما 250غ', price: 250, barcode: '987654321' },
    { id: 3, name: 'سكر سيفيتال 1 كغ', price: 90, barcode: '112233445' },
    { id: 4, name: 'زيت عافية 2 لتر', price: 280, barcode: '554433221' },
    { id: 5, name: 'عصير رامي برتقال', price: 120, barcode: '998877665' },
  ]);

  const [cart, setCart] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState('');

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

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
      
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="mb-4 flex gap-2">
          <form onSubmit={handleBarcodeSubmit} className="flex-1 relative">
            <ScanBarcode className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-500" size={24} />
            <input 
              type="text" 
              autoFocus
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              placeholder={t('pos.scanPlaceholder')}
              className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl py-4 ps-12 pe-4 text-white text-lg focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
            />
          </form>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 rounded-xl p-4 cursor-pointer transition-all active:scale-95 shadow-lg flex flex-col justify-between h-32"
              >
                <h3 className="font-bold text-white leading-tight">{product.name}</h3>
                <p className="text-xl font-bold text-emerald-400 mt-2">{product.price} <span className="text-xs text-slate-500">{t('currency')}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`w-96 bg-slate-900 border-${isRTL ? 'r' : 'l'} border-slate-800 flex flex-col shadow-2xl z-10`}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingCart size={20} className="text-blue-400" /> {t('pos.cart')}
          </h2>
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">{cart.length}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
              <ShoppingCart size={64} className="mb-4" />
              <p>{t('pos.emptyCart')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map((item, index) => (
                <div key={index} className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col gap-2 relative">
                   <div className="flex justify-between items-start pe-6">
                      <h4 className="text-white font-medium text-sm leading-tight">{item.name}</h4>
                      <p className="font-bold text-emerald-400 whitespace-nowrap">{(item.price * item.qty).toLocaleString()} {t('currency')}</p>
                   </div>
                   
                   <div className="flex justify-between items-center">
                     {/* 🔴 الترجمة الديناميكية لكلمة "للوحدة / per unit" */}
                     <p className="text-xs text-slate-500">{item.price} {t('currency')} {t('pos.perUnit')}</p>
                     <div className="flex items-center gap-2 bg-slate-900 rounded-lg border border-slate-700">
                        <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} className="p-1 hover:text-white"><Minus size={14}/></button>
                        <span className="text-sm font-bold text-white w-6 text-center">{item.qty}</span>
                        <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} className="p-1 hover:text-white"><Plus size={14}/></button>
                     </div>
                   </div>

                   <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="absolute top-3 end-3 text-slate-600 hover:text-red-500">
                     <Trash2 size={16} />
                   </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 font-medium">{t('pos.total')}</span>
            <span className="text-4xl font-black text-white">{total.toLocaleString()} <span className="text-lg text-emerald-500">{t('currency')}</span></span>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => setCart([])} disabled={cart.length === 0} className="p-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl disabled:opacity-50 transition-colors">
              <Trash2 size={24} />
            </button>
            <button disabled={cart.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50 transition-colors shadow-lg shadow-blue-900/20">
              <CreditCard size={24} /> {t('pos.pay')}
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
import { Calculator, Banknote, Clock, MinusCircle, CheckCircle, Plus, AlertCircle, FileText, CheckCircle2, Edit, Trash2, Download } from 'lucide-react';

import useEmployeeStore from '../../store/employeeStore';
import usePayrollStore from '../../store/payrollStore';
import useAuthStore from '../../store/authStore';
import ConfirmAlert from '../ui/ConfirmAlert'; 
import Modal from '../ui/Modal'; 

export default function Payroll() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('calculator');

  const { employees, fetchEmployees } = useEmployeeStore();
  const { advances, salaries, fetchAdvances, fetchSalaries, addAdvance, calculatePayroll, payrollResult, paySalary, clearPayrollResult } = usePayrollStore();
  
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

  const [editingAdvance, setEditingAdvance] = useState(null);
  const [advanceToDelete, setAdvanceToDelete] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);

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
    
    // 🔴 التحقق المسبق من الباك-إند لمنع الدفع المزدوج
    if (window.api && window.api.calculatePayroll) {
      const checkRes = await window.api.calculatePayroll({ employeeId: selectedEmployee, startDate, endDate, hourlyRate: Number(hourlyRate) });
      if (checkRes && checkRes.isAlreadyPaid) {
        // استخدام الترجمة الديناميكية
        showToast('error', t('payroll.errors.overlap', { 
          start: checkRes.overlapStart, 
          end: checkRes.overlapEnd, 
          defaultValue: `لا يمكن الحساب! لقد تم دفع راتب مسبقاً (${checkRes.overlapStart} إلى ${checkRes.overlapEnd})` 
        }));
        clearPayrollResult(); 
        return; 
      }
    }

    await calculatePayroll({ employeeId: selectedEmployee, startDate, endDate, hourlyRate: Number(hourlyRate) });
  };


  
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

  const handleSaveAdvance = async (e) => {
    e.preventDefault();
    if (!advanceData.employeeId || !advanceData.caisseSource) return;
    
    let success = false;
    if (editingAdvance) {
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
      success = await addAdvance({ employeeId: advanceData.employeeId, amount: Number(advanceData.amount), date: advanceData.date, caisseSource: advanceData.caisseSource, note: advanceData.note });
    }

    if (success) {
      setIsAdvanceModalOpen(false);
      setEditingAdvance(null);
      setAdvanceData({ employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' });
      if (payrollResult) handleCalculate(); 
      fetchAdvances();
      showToast('success', editingAdvance ? t('common.success', 'تمت العملية بنجاح') : t('common.success', 'تمت العملية بنجاح'));
    } else {
      showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
    }
  };

  const executeDeleteAdvance = async () => {
    if (!advanceToDelete) return;
    if (window.api && window.api.deleteAdvance) {
      const res = await window.api.deleteAdvance(advanceToDelete);
      if (res?.success) {
        fetchAdvances();
        showToast('success', t('common.success', 'تمت العملية بنجاح'));
      } else {
        const translatedError = res.error ? t(`payroll.errors.${res.error}`, {defaultValue: res.error}) : t('common.error', 'حدث خطأ غير متوقع');
        showToast('error', translatedError);
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
      rolloverNote: t('payroll.rolloverNote', { start: payrollResult.startDate, end: payrollResult.endDate, defaultValue: `ترحيل ديون سلفيات (${payrollResult.startDate} إلى ${payrollResult.endDate})` }),
      expenseNote: t('payroll.expenseNote', { name: employeeName, start: payrollResult.startDate, end: payrollResult.endDate, defaultValue: `راتب: ${employeeName} (${payrollResult.startDate} إلى ${payrollResult.endDate})` })
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
      showToast('success', t('common.success', 'تمت العملية بنجاح'));
    } else {
      showToast('error', t('common.error', 'حدث خطأ غير متوقع') + ' \n' + res.error);
    }
    setConfirmModalData(null);
  };

  const exportSalariesToWord = (salariesList, isSingle = false) => {
    if (!salariesList || salariesList.length === 0) return;

    const dir = isRTL ? 'rtl' : 'ltr';
    const alignStart = isRTL ? 'right' : 'left';
    const alignEnd = isRTL ? 'left' : 'right';
    // قراءة اسم المحل (نفس المصدر المستخدم في بقية المستندات المطبوعة)
    const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';
    const curr = t('currency', 'د.ج');
    const title = isSingle ? t('payroll.payslip', 'كشف راتب موظف') : t('payroll.comprehensiveReport', 'سجل الرواتب والحضور المفصل');
    
    const totalEmployeesText = t('payroll.totalEmployees', isRTL ? 'إجمالي الموظفين' : 'Total Employees');

    let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: ${dir}; color: #000; }
        h2 { text-align: center; color: #1e293b; margin-bottom: 5px; font-size: 22px; text-transform: uppercase; }
        h3 { text-align: center; color: #475569; margin-top: 0; font-size: 13px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #334155; padding: 8px; text-align: center; font-size: 11px; vertical-align: middle; }
        th { background-color: #e2e8f0; font-weight: bold; font-size: 12px; color: #0f172a; }
        .net-salary { font-weight: bold; background-color: #f1f5f9; font-size: 13px; }
        .log-box { font-family: 'Courier New', Courier, monospace; font-size: 11px; text-align: left; line-height: 1.5; color: #1e293b; white-space: nowrap; direction: ltr; }
        .footer-note { text-align: center; font-size: 10px; color: #64748b; margin-top: 30px; }
      </style>
    </head>
    <body>
      <h2>${title}</h2>
      <h3>${currentStoreName} - ${t('zreport.date', 'تاريخ الإصدار:')} <span dir="ltr">${new Date().toLocaleDateString(i18n.language)}</span></h3>
    `;

    if (isSingle) {
      const s = salariesList[0];
      const gross = Number(s.total_hours || 0) * Number(s.hourly_rate || 0);
      
      let logsHtml = '';
      if (s.daily_logs && s.daily_logs.length > 0) {
        logsHtml = s.daily_logs.map(l => `<div style="border-bottom: 1px dashed #cbd5e1; padding: 3px 0;" dir="ltr"><span style="display:inline-block; width: 80px; font-weight:bold;">${l.date}</span> | <span style="display:inline-block; width: 60px; text-align:center;">${l.time_in || '--:--'}</span> &rarr; <span style="display:inline-block; width: 60px; text-align:center;">${l.time_out || '--:--'}</span></div>`).join('');
      } else {
        logsHtml = '<span style="color:#94a3b8;">--</span>';
      }

      html += `
        <table style="border: none; margin-bottom: 15px;">
          <tr>
            <td style="border: none; text-align: ${alignStart}; font-size: 15px;"><b>${t('hr.table.nameWithRole', 'الموظف:')}</b> <span style="color: #2563eb;">${s.employee_name || s.name || '---'}</span></td>
            <td style="border: none; text-align: ${alignEnd};" dir="ltr"><b>${t('payroll.period', 'الفترة:')}</b> ${s.start_date} / ${s.end_date}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>${t('payroll.totalHours', 'إجمالي الساعات')}</th>
            <th>${t('payroll.hourlyRate', 'سعر الساعة')}</th>
            <th>${t('payroll.grossSalary', 'الراتب الإجمالي')}</th>
            <th>${t('payroll.deductions', 'الخصومات / السلف')}</th>
            <th>${t('payroll.netSalary', 'الصافي للدفع')}</th>
          </tr>
          <tr>
            <td><b>${Number(s.total_hours).toFixed(2)}</b></td>
            <td dir="ltr">${Number(s.hourly_rate).toFixed(2)} ${curr}</td>
            <td dir="ltr">${gross.toFixed(2)} ${curr}</td>
            <td dir="ltr" style="color: #ef4444; font-weight: bold;">- ${Number(s.total_advances).toFixed(2)} ${curr}</td>
            <td dir="ltr" class="net-salary" style="font-size: 15px;">${Number(s.net_salary).toFixed(2)} ${curr}</td>
          </tr>
        </table>

        <div style="margin-top: 15px; font-weight: bold; font-size: 12px;">${t('hr.attendanceLog', 'تفاصيل الحضور والانصراف اليومي (دخول - خروج):')}</div>
        <div style="border: 1px solid #94a3b8; padding: 10px; margin-top: 5px; background-color: #f8fafc; font-family: monospace;">
          ${logsHtml}
        </div>

        <table style="border: none; margin-top: 50px;">
          <tr>
            <td style="border: none; border-top: 2px solid #000; width: 40%; font-weight: bold;">${t('zreport.manager_sig', 'توقيع الإدارة / الختم')}</td>
            <td style="border: none; width: 20%;"></td>
            <td style="border: none; border-top: 2px solid #000; width: 40%; font-weight: bold;">${t('payroll.accountantSig', 'توقيع المستلم')}</td>
          </tr>
        </table>
      `;
    } 
    else {
      html += `
        <table>
          <thead>
            <tr>
              <th style="width: 15%;">${t('hr.table.nameWithRole', 'الموظف')}</th>
              <th style="width: 12%;">${t('payroll.period', 'الفترة')}</th>
              <th style="width: 8%;">${t('payroll.totalHours', 'الساعات')}</th>
              <th style="width: 10%;">${t('payroll.grossSalary', 'الإجمالي')}</th>
              <th style="width: 10%;">${t('payroll.deductions', 'الخصومات')}</th>
              <th style="width: 12%;">${t('payroll.netSalary', 'الصافي')}</th>
              <th style="width: 33%; text-align: left;">${t('hr.attendanceLog', "Today's Attendance Log")}</th> 
            </tr>
          </thead>
          <tbody>
      `;
      
      salariesList.forEach((s) => {
        const gross = Number(s.total_hours || 0) * Number(s.hourly_rate || 0);
        
        let logsText = '';
        if (s.daily_logs && s.daily_logs.length > 0) {
          logsText = s.daily_logs.map(l => {
              const timeIn = l.time_in ? l.time_in.padEnd(8, '&nbsp;') : '--:--&nbsp;&nbsp;&nbsp;';
              const timeOut = l.time_out ? l.time_out.padEnd(8, '&nbsp;') : '--:--&nbsp;&nbsp;&nbsp;';
              return `<div dir="ltr" style="margin-bottom:2px;">[<b>${l.date}</b>]&nbsp;${timeIn}&rarr;&nbsp;${timeOut}</div>`;
          }).join('');
        } else {
          logsText = `<div dir="ltr" style="color: #94a3b8; text-align: center;">--</div>`;
        }

        html += `
          <tr>
            <td style="text-align: ${alignStart}; font-weight: bold; font-size: 12px;">${s.employee_name || s.name || '---'}</td>
            <td dir="ltr" style="font-size: 10px;">${s.start_date}<br/>to<br/>${s.end_date}</td>
            <td style="font-weight: bold;">${Number(s.total_hours).toFixed(2)}</td>
            <td dir="ltr">${gross.toFixed(2)} ${curr}</td>
            <td dir="ltr" style="color: #ef4444; font-weight: bold;">- ${Number(s.total_advances).toFixed(2)} ${curr}</td>
            <td dir="ltr" class="net-salary" style="font-size: 12px;">${Number(s.net_salary).toFixed(2)} ${curr}</td>
            <td style="padding: 4px;">
              <div class="log-box">
                ${logsText}
              </div>
            </td>
          </tr>
        `;
      });

      html += `
          </tbody>
        </table>
        
        <table style="border: none; margin-top: 40px;" width="100%">
          <tr>
            <td style="border: none; text-align: ${alignStart}; font-weight: bold; font-size: 13px;">
              ${t('zreport.manager_sig', 'توقيع الإدارة / الختم')}: ..............................................
            </td>
            <td style="border: none; text-align: ${alignEnd}; font-weight: bold; font-size: 13px;">
              ${totalEmployeesText}: ${salariesList.length}
            </td>
          </tr>
        </table>
      `;
    }

    html += `<div class="footer-note">POWERED BY GHERBI.AI</div></body></html>`;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const prefix = isSingle 
      ? (isRTL ? 'كشف_راتب' : 'Payslip') 
      : (isRTL ? 'سجل_الرواتب_المفصل' : 'Detailed_Payroll_Report');
      
    link.download = `${prefix}_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('success', t('common.success', 'تم استخراج التقرير بنجاح!'));
  };

  const handleExportSingleToWord = () => {
    if (!payrollResult) return;
    const employeeData = employees.find(e => e.id === Number(selectedEmployee));
    const singleData = [{
       employee_name: employeeData?.name || '',
       start_date: startDate,
       end_date: endDate,
       total_hours: payrollResult.totalHours,
       hourly_rate: hourlyRate,
       total_advances: payrollResult.totalAdvances,
       gross_salary: payrollResult.grossSalary,
       net_salary: payrollResult.netSalary,
       daily_logs: payrollResult.dailyLogs || [] 
    }];
    exportSalariesToWord(singleData, true);
  };

  const formatMoney = (val) => Number(val || 0).toLocaleString(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatHours = (val) => Number(val || 0).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex flex-col gap-6 text-start relative">
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2"><Banknote className="text-emerald-500" />{t('payroll.title', 'رواتب العمال')}</h1>
          <p className="text-sm text-slate-500">{t('payroll.subtitle', 'إدارة وحساب الرواتب والخصومات')}</p>
        </div>
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1 overflow-x-auto">
        <button onClick={() => setActiveTab('calculator')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'calculator' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><Calculator size={18} /> {t('payroll.tabs.calculator', 'حاسبة الراتب')}</button>
        <button onClick={() => setActiveTab('advances')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'advances' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><MinusCircle size={18} /> {t('payroll.tabs.advances', 'سجل السلفيات')}</button>
        <button onClick={() => setActiveTab('salaries')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'salaries' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><FileText size={18} /> {t('payroll.tabs.salaries', 'أرشيف الرواتب')}</button>
      </div>

      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-fit">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">{t('payroll.tabs.calculator', 'حاسبة الراتب')}</h3>
            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.selectEmployee', 'اختر الموظف')}</label>
                <select required value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500">
                  <option value="" disabled>-- {t('common.search', 'بحث...')} --</option>
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('agenda.modal.dateLabel', 'التاريخ')} (من)</label>
                  <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('agenda.modal.dateLabel', 'التاريخ')} (إلى)</label>
                  <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.hourlyRate', 'سعر الساعة')} ({t('currency', 'د.ج')})</label>
                <input type="number" required min="1" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="e.g. 150" className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 transition-colors flex items-center justify-center gap-2">
                <Calculator size={18}/> {t('payroll.calcSalary', 'حساب الراتب')}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            {!payrollResult ? (
              <div className="h-full bg-slate-900/50 border border-slate-800 border-dashed rounded-xl flex flex-col items-center justify-center text-slate-500 p-12 min-h-[400px]">
                <Calculator size={64} className="mb-4 opacity-20" />
                <p>{t('payroll.emptyStateDesc', 'أدخل بيانات الموظف واضغط على "حساب الراتب" لظهور النتيجة')}</p>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
                <div className="bg-slate-800 p-6 flex justify-between items-center border-b border-slate-700">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{employees.find(e => e.id === Number(selectedEmployee))?.name}</h2>
                    <p className="text-slate-400 text-sm mt-1">{t('payroll.period', 'الفترة')} <bdi dir="ltr">{startDate}</bdi> - <bdi dir="ltr">{endDate}</bdi></p>
                  </div>
                  <button onClick={handleExportSingleToWord} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2" title={t('payroll.exportWord', 'استخراج Word')}>
                    <Download size={18} /> {t('payroll.exportWord', 'استخراج Word')}
                  </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col items-center text-center">
                    <Clock className="text-blue-400 mb-3" size={28} />
                    <p className="text-slate-400 text-sm mb-1">{t('payroll.totalHours', 'إجمالي الساعات')}</p>
                    <p className="text-3xl font-bold text-white"><bdi>{formatHours(payrollResult.totalHours)}</bdi></p>
                  </div>
                  <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col items-center text-center">
                    <Banknote className="text-emerald-400 mb-3" size={28} />
                    <p className="text-slate-400 text-sm mb-1">{t('payroll.grossSalary', 'الراتب الإجمالي')}</p>
                    <p className="text-3xl font-bold text-emerald-400"><bdi>{formatMoney(payrollResult.grossSalary)}</bdi> <span className="text-sm">{t('currency', 'د.ج')}</span></p>
                  </div>
                  <div className="bg-red-950/30 rounded-xl p-5 border border-red-900/50 flex flex-col items-center text-center">
                    <MinusCircle className="text-red-400 mb-3" size={28} />
                    <p className="text-red-400/80 text-sm mb-1">{t('payroll.deductions', 'الخصومات / السلف')}</p>
                    <p className="text-3xl font-bold text-red-400"><bdi dir="ltr">-{formatMoney(payrollResult.totalAdvances)}</bdi> <span className="text-sm">{t('currency', 'د.ج')}</span></p>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 mb-1">{t('payroll.netSalary', 'الصافي للدفع')}</p>
                    <p className={`text-4xl font-black ${payrollResult.netSalary >= 0 ? 'text-white' : 'text-red-500'}`}><bdi>{formatMoney(payrollResult.netSalary)}</bdi> <span className="text-xl text-slate-500">{t('currency', 'د.ج')}</span></p>
                  </div>
                  <button onClick={handlePaySalaryClick} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-lg">
                    <CheckCircle size={20} /> {t('payroll.payAndSave', 'دفع الراتب وحفظ')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'advances' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2"><MinusCircle size={18} className="text-red-400" /> {t('payroll.tabs.advances', 'سجل السلفيات')}</h3>
            <button onClick={() => { setEditingAdvance(null); setIsAdvanceModalOpen(true); }} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
              <Plus size={18} /><span>{t('payroll.addAdvance', 'إضافة سلفة')}</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse" dir={i18n.dir()}>
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.date', 'التاريخ')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.nameWithRole', 'الموظف')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.amount', 'المبلغ')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.fundSource', 'المصدر (الصندوق)')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.status', 'الحالة')}</th>
                  {isSuperAdmin && <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions', 'الإجراءات')}</th>}
                </tr>
              </thead>
              <tbody>
                {advances.map(adv => (
                  <tr key={adv.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap"><bdi dir="ltr">{adv.date}</bdi></td>
                    <td className="px-6 py-4 font-medium text-white">{adv.employee_name} <span className="block text-xs text-slate-500 mt-1">{adv.note}</span></td>
                    <td className="px-6 py-4 font-bold text-red-400"><bdi>{formatMoney(adv.amount)}</bdi> {t('currency', 'د.ج')}</td>
                    <td className="px-6 py-4 text-center"><span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700">{adv.caisse_source === 'admin' ? t('payroll.caisseAdmin', 'المدير') : adv.caisse_source}</span></td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${adv.status === 'pending' ? 'bg-amber-950 text-amber-400 border-amber-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                        {adv.status === 'pending' ? t('payroll.statusPending', 'غير مسددة') : t('payroll.statusPaid', 'تم الخصم')}
                      </span>
                    </td>
                    {isSuperAdmin && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => openEditAdvanceModal(adv)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors"><Edit size={18} /></button>
                          <button onClick={() => setAdvanceToDelete(adv.id)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {advances.length === 0 && <tr><td colSpan={isSuperAdmin ? "6" : "5"} className="px-6 py-12 text-center text-slate-500">{t('common.noResults', 'لا توجد نتائج')}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'salaries' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2"><FileText size={18} className="text-blue-400" /> {t('payroll.tabs.salaries', 'أرشيف الرواتب')}</h3>
            
            <button onClick={() => exportSalariesToWord(salaries)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Download size={18} /> {t('payroll.exportReportWord', 'استخراج سجل الرواتب (Word)')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse" dir={i18n.dir()}>
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.nameWithRole', 'الموظف')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.period', 'الفترة')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.totalHours', 'الساعات')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.grossSalary', 'الإجمالي')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.deductions', 'الخصومات')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.netSalary', 'الصافي')}</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((s, idx) => {
                  const gross = Number(s.total_hours || 0) * Number(s.hourly_rate || 0);
                  
                  return (
                    <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 text-start">
                        <span className="font-medium text-white">{s.employee_name}</span>
                        <div className="text-xs text-slate-500 mt-1">{t('payroll.date', 'التاريخ')}: <bdi dir="ltr">{s.payment_date}</bdi></div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 text-start">
                        <bdi dir="ltr">{s.start_date}</bdi><br/><bdi dir="ltr">{s.end_date}</bdi>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-blue-400"><bdi>{formatHours(s.total_hours)}</bdi></td>
                      <td className="px-6 py-4 text-center font-medium text-slate-300"><bdi>{formatMoney(gross)}</bdi></td>
                      <td className="px-6 py-4 text-center font-bold text-red-400"><bdi dir="ltr">-{formatMoney(s.total_advances)}</bdi></td>
                      <td className="px-6 py-4 text-start font-bold">
                        <span className={s.net_salary >= 0 ? 'text-emerald-400' : 'text-red-400'}><bdi>{formatMoney(s.net_salary)}</bdi> {t('currency', 'د.ج')}</span>
                      </td>
                    </tr>
                  )
                })}
                {salaries.length === 0 && <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-500">{t('common.noResults', 'لا توجد نتائج')}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal إضافة/تعديل سلفة */}
      <Modal isOpen={isAdvanceModalOpen} onClose={() => { setIsAdvanceModalOpen(false); setEditingAdvance(null); }} title={editingAdvance ? t('payroll.editAdvance', 'تعديل السلفة') : t('payroll.newAdvance', 'تسجيل سلفة موظف')}>
        <form onSubmit={handleSaveAdvance} className="space-y-4 text-start" dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.selectEmployee', 'اختر الموظف')}</label>
            <select required disabled={!!editingAdvance} value={advanceData.employeeId} onChange={e => setAdvanceData({...advanceData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500">
              <option value="" disabled>-- {t('common.search', 'بحث...')} --</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.amount', 'المبلغ')} ({t('currency', 'د.ج')})</label>
            <input type="number" required min="1" value={advanceData.amount} onChange={e => setAdvanceData({...advanceData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.fundSource', 'مصدر الأموال')}</label>
            <select required value={advanceData.caisseSource} onChange={e => setAdvanceData({...advanceData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500">
              <option value="" disabled>-- {t('expenses.allCaisses', 'اختر الصندوق')} --</option>
              <option value="admin">{t('payroll.caisseAdmin', 'صندوق المدير (الرئيسي)')}</option>
              {employees.filter(e => e.role === 'cashier').map(emp => <option key={emp.id} value={emp.name}>{t('payroll.caisseCashier', {name: emp.name, defaultValue: `صندوق الكاشير: ${emp.name}`})}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.date', 'التاريخ')}</label>
              <input type="date" required value={advanceData.date} onChange={e => setAdvanceData({...advanceData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.note', 'ملاحظة')} ({t('common.optional', 'اختياري')})</label>
              <input type="text" value={advanceData.note} onChange={e => setAdvanceData({...advanceData, note: e.target.value})} placeholder={t('payroll.advanceNotePlaceholder', 'سبب السلفة...')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setIsAdvanceModalOpen(false); setEditingAdvance(null); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel', 'إلغاء')}</button>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{t('payroll.saveAdvance', 'حفظ السلفة')}</button>
          </div>
        </form>
      </Modal>

      <ConfirmAlert 
        isOpen={!!confirmModalData}
        onClose={() => setConfirmModalData(null)}
        onConfirm={executePayment}
        title={t('payroll.confirmPayTitle', 'تأكيد دفع الراتب')}
        message={confirmModalData?.type === 'rollover' ? t('payroll.confirmPayMessage', 'الراتب الصافي بالسالب. سيتم ترحيل الديون المتبقية كسلفة جديدة للشهر القادم. هل تود الاستمرار؟') : t('payroll.confirmPayStandard', 'سيتم صرف مبلغ {{amount}} من الصندوق. هل تود تأكيد الدفع؟', { amount: payrollResult?.netSalary })}
        confirmText={t('payroll.confirmPayBtn', 'نعم، تأكيد الدفع')}
      />

      <ConfirmAlert 
        isOpen={!!advanceToDelete}
        onClose={() => setAdvanceToDelete(null)}
        onConfirm={executeDeleteAdvance}
        title={t('payroll.cancelAdvanceTitle', 'إلغاء السلفة')}
        message={t('payroll.cancelAdvanceMessage', 'هل أنت متأكد من إلغاء وحذف هذه السلفة؟ سيتم إرجاع المبلغ للصندوق الذي خُصمت منه.')}
        confirmText={t('payroll.cancelAdvanceBtn', 'نعم، حذف السلفة')}
        confirmColor="bg-red-600 hover:bg-red-700 text-white"
      />

    </div>
  );
}
```

---

## `frontend\src\components\pages\PdfImporter.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud, CheckCircle2, AlertCircle, Save, Database, Map, FileText, DollarSign, Send, Truck } from 'lucide-react';

export default function PdfImporter() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [items, setItems] = useState([]);
  
  // 🌟 استبدال shelves بـ activeShelves لجلب رفوف المخطط النشط
  const [activeShelves, setActiveShelves] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // 🌟 حالات (States) خاصة بنظام الموردين والفاتورة
  const [invoiceMeta, setInvoiceMeta] = useState(null); 
  const [suppliers, setSuppliers] = useState([]); // قائمة الموردين من قاعدة البيانات
  const [selectedSupplier, setSelectedSupplier] = useState(''); // المورد الذي اختاره المستخدم
  const [isInvoiceSaved, setIsInvoiceSaved] = useState(false); // حالة حفظ الفاتورة

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 🌟 1. جلب المخطط ثلاثي الأبعاد "المعتمد/الأساسي" فقط
        if (window.api && window.api.getStoreLayouts) {
          const res = await window.api.getStoreLayouts();
          if (res.success && res.data.length > 0) {
            // البحث عن المخطط المعتمد
            const activeLayout = res.data.find(layout => layout.is_active === 1);
            
            if (activeLayout && activeLayout.items_json) {
              const allMapItems = JSON.parse(activeLayout.items_json);
              
              // تصفية العناصر: نحتاج فقط الأدوات التي تخزن السلع (نستبعد الجدران ونقاط البيع)
              const storageItems = allMapItems.filter(
                item => item.type !== 'wall' && item.type !== 'cashier'
              );
              
              setActiveShelves(storageItems);
            }
          }
        }

        // جلب الموردين من قاعدة البيانات
        if (window.api && window.api.getSuppliersList) {
          const res = await window.api.getSuppliersList();
          if (res.success) {
            setSuppliers(res.data);
          }
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  // 🌟 2. الخوارزمية الذكية: التوجيه التلقائي للرف حسب التصنيفات
  const autoSuggestShelf = (itemName) => {
    if (!itemName || activeShelves.length === 0) return '';
    
    const lowerItemName = itemName.toLowerCase();

    for (const shelf of activeShelves) {
      if (shelf.categories && shelf.categories.length > 0) {
        for (const category of shelf.categories) {
          if (lowerItemName.includes(category.toLowerCase()) || category.toLowerCase().includes(lowerItemName)) {
            return shelf.id; // إرجاع معرّف الرف عند إيجاد تطابق
          }
        }
      }
    }
    return ''; 
  };

  const handleImportPDF = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.parsePdfInvoice) {
        const res = await window.api.parsePdfInvoice();
        if (res.success && res.data) {
          
          // 🌟 تطبيق التوقع الذكي للرف أثناء تجهيز البيانات
          const processedItems = res.data.map(item => ({
            ...item,
            isSaved: false,
            selectedShelf: autoSuggestShelf(item.cleanName || item.dirtyName) 
          }));
          
          setItems(processedItems);
          
          // تخزين بيانات الفاتورة (المورد والمبلغ) إن وجدت
          if (res.meta) {
            setInvoiceMeta(res.meta);
            setIsInvoiceSaved(false); 
            setSelectedSupplier('');
          }
          
          showToast('success', t('pdfImporter.messages.extractSuccess', { count: processedItems.length }));
        } else if (!res.canceled) {
          showToast('error', t('pdfImporter.messages.extractError'));
        }
      }
    } catch (error) {
      showToast('error', t('pdfImporter.messages.systemError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSaveItem = async (index) => {
    const item = items[index];
    if (!item.selectedShelf) {
      showToast('warning', t('pdfImporter.messages.shelfWarning'));
      return;
    }

    try {
      if (window.api && window.api.processPdfInventory) {
        const res = await window.api.processPdfInventory({
          shelfId: item.selectedShelf,
          barcode: item.barcode,
          cleanName: item.cleanName,
          dirtyName: item.dirtyName,
          quantity: item.quantity
        });

        if (res.success) {
          handleItemChange(index, 'isSaved', true);
          showToast('success', t('pdfImporter.messages.saveSuccess', { name: item.cleanName }));
        } else {
          showToast('error', res.error || t('pdfImporter.messages.saveError'));
        }
      }
    } catch (error) {
      showToast('error', t('pdfImporter.messages.systemError'));
    }
  };

  // دالة ترحيل الفاتورة إلى قسم الديون والموردين
  const handleSaveInvoiceMeta = async () => {
    if (!selectedSupplier) {
      showToast('warning', t('pdfImporter.messages.supplierWarning', 'الرجاء ربط الفاتورة بمورد من النظام أولاً.'));
      return;
    }
    
    try {
      if (window.api && window.api.saveInvoiceDebt) {
        const res = await window.api.saveInvoiceDebt({
          supplierId: selectedSupplier,
          pdfSupplierName: invoiceMeta.supplierName,
          totalAmount: invoiceMeta.totalAmount,
          date: new Date().toISOString()
        });

        if (res.success) {
          setIsInvoiceSaved(true);
          showToast('success', t('pdfImporter.messages.invoiceSaved', 'تم ترحيل الفاتورة بنجاح وإضافتها لحساب المورد!'));
        } else {
          showToast('error', res.error || t('pdfImporter.messages.invoiceError', 'حدث خطأ أثناء ترحيل الفاتورة.'));
        }
      } else {
         showToast('warning', 'ميزة ترحيل الفواتير غير مفعلة بعد في الباك-إند (main.js).');
      }
    } catch (error) {
      showToast('error', t('pdfImporter.messages.systemError', 'خطأ في النظام أثناء حفظ الفاتورة.'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative" dir={i18n.dir()}>
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Database className="text-blue-500" /> {t('pdfImporter.title')}
          </h1>
          <p className="text-sm text-slate-500 mt-2">{t('pdfImporter.subtitle')}</p>
        </div>
        <button 
          onClick={handleImportPDF} 
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          {isLoading ? <span className="animate-spin text-xl">↻</span> : <UploadCloud size={20} />}
          <span>{t('pdfImporter.btnUpload')}</span>
        </button>
      </div>

      {invoiceMeta && items.length > 0 && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-6 shadow-2xl flex flex-col xl:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex flex-wrap items-center gap-8 z-10 w-full xl:w-auto">
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-3 rounded-xl"><Truck className="text-blue-400" size={24} /></div>
              <div>
                <p className="text-xs text-slate-400">{t('pdfImporter.invoiceSupplier')}</p>
                <p className="font-bold text-white text-lg">{invoiceMeta.supplierName || t('common.notAvailable', 'غير متوفر')}</p>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-700 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-3 rounded-xl"><DollarSign className="text-emerald-400" size={24} /></div>
              <div>
                <p className="text-xs text-slate-400">{t('pdfImporter.invoiceTotal')}</p>
                <p className="font-black text-emerald-400 text-xl" dir="ltr">
                  {invoiceMeta.totalAmount ? invoiceMeta.totalAmount.toLocaleString('fr-DZ') : '0.00'} DA
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto z-10">
            <select 
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              disabled={isInvoiceSaved}
              className="w-full sm:w-64 bg-slate-950 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="" disabled>{t('pdfImporter.selectSupplier')}</option>
              {suppliers.map(sup => (
                <option key={sup.id} value={sup.id}>{sup.name}</option>
              ))}
            {suppliers.length === 0 && <option value="" disabled>{t('pdfImporter.noSuppliers', 'لا يوجد موردين مسجلين في النظام!')}</option>}
            </select>

            <button 
              onClick={handleSaveInvoiceMeta}
              disabled={isInvoiceSaved || !selectedSupplier}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                isInvoiceSaved 
                  ? 'bg-emerald-950/50 text-emerald-500 border border-emerald-900/50 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20'
              }`}
            >
              {isInvoiceSaved ? (
                <><CheckCircle2 size={20} /> {t('pdfImporter.saveSuccess')}</>
              ) : (
                <><Send size={20} /> {t('pdfImporter.addDebtBtn')}  </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center gap-2">
          <Map className="text-slate-400" size={20} />
          <h3 className="font-bold text-white">{t('pdfImporter.tableTitle')}</h3>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-700 text-slate-400 text-sm">
                <th className="pb-3 text-start px-2">{t('pdfImporter.cols.ref')}</th>
                <th className="pb-3 text-start px-2">{t('pdfImporter.cols.dirtyName')}</th>
                <th className="pb-3 text-center px-2">{t('pdfImporter.cols.qty')}</th>
                <th className="pb-3 text-start px-2">{t('pdfImporter.cols.cleanName')}</th>
                <th className="pb-3 text-start px-2">{t('pdfImporter.cols.shelf')}</th>
                <th className="pb-3 text-center px-2">{t('pdfImporter.cols.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-slate-500 border-b border-slate-800/50">
                    <div className="flex flex-col items-center gap-3">
                      <UploadCloud size={48} className="text-slate-700" />
                      <p>{t('pdfImporter.emptyState')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index} className={`border-b border-slate-800/50 transition-colors ${item.isSaved ? 'bg-emerald-950/10' : 'hover:bg-slate-800/30'}`}>
                    
                    <td className="py-4 px-2 font-mono text-slate-400 text-sm" dir="ltr">{item.barcode}</td>
                    <td className="py-4 px-2 text-red-300 text-sm font-medium">{item.dirtyName}</td>
                    <td className="py-4 px-2 font-black text-white text-center" dir="ltr">+{item.quantity}</td>

                    <td className="py-4 px-2 relative">
                      {item.isKnown && (
                        <span className="absolute -top-1 right-2 text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700">
                          {t('pdfImporter.autoRecognized')}
                        </span>
                      )}
                      <input 
                        type="text" 
                        value={item.cleanName} 
                        onChange={(e) => handleItemChange(index, 'cleanName', e.target.value)}
                        disabled={item.isSaved}
                        className={`w-full bg-slate-950 border ${item.isKnown ? 'border-emerald-700/50' : 'border-slate-700'} rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 mt-1`} 
                      />
                    </td>
                    
                    {/* 🌟 3. تحديث القائمة المنسدلة لتعرض بيانات المخطط الأساسي */}
                    <td className="py-4 px-2">
                      <select 
                        value={item.selectedShelf || ''} 
                        onChange={(e) => handleItemChange(index, 'selectedShelf', e.target.value)}
                        disabled={item.isSaved}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                      >
                        <option value="" disabled>{t('pdfImporter.selectShelf')}</option>
                        {activeShelves.map(shelf => (
                          <option key={shelf.id} value={shelf.id}>
                            {shelf.name} {shelf.capacity ? `(${t('pdfImporter.capacity', 'السعة')}: ${shelf.capacity})` : ''}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-2 text-center">
                      {item.isSaved ? (
                        <span className="flex items-center justify-center gap-1 text-emerald-400 font-bold bg-emerald-950/50 px-3 py-2 rounded-lg">
                          <CheckCircle2 size={18} /> {t('pdfImporter.saved')}
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleSaveItem(index)}
                          className="bg-slate-800 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full shadow-md"
                        >
                          <Save size={18} /> {t('pdfImporter.saveBtn')}
                        </button>
                      )}
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
}
```

---

## `frontend\src\components\pages\PrintPreview.jsx`

```javascript
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Printer, ArrowLeft, ArrowRight, AlertCircle, Download } from 'lucide-react';
import html2canvas from 'html2canvas'; 
import { jsPDF } from 'jspdf';

export default function PrintPreview() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isRTL = i18n.dir() === 'rtl';
  
  const getStoreName = () => {
    const keys = ['storeName', 'store_name', 'shopName', 'shop_name'];
    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value) return value;
    }
    return 'GHERBI.AI';
  };
  const currentStoreName = getStoreName();

  const { data, type, supplierName } = useMemo(() => {
    const state = location.state || {};
    const extractedData = state.data || state.item || state.receipt || state.payment || state;
    
    if (!extractedData || Object.keys(extractedData).length === 0 || extractedData.amount === undefined) {
      return { data: null, type: 'receipt', supplierName: 'غير محدد' };
    }

    const resolvedType = state.type || (extractedData.amount < 0 ? 'payment' : 'receipt');
    const resolvedSupplier = state.supplierName || extractedData.supplier_name || extractedData.name || 'غير محدد';
    
    return { data: extractedData, type: resolvedType, supplierName: resolvedSupplier };
  }, [location.state]);

  if (!data) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-300 gap-4" dir={isRTL ? "rtl" : "ltr"}>
        <AlertCircle size={48} className="text-red-500" />
        <h2 className="text-2xl font-bold text-white">{t('common.error', i18n.language === 'ar' ? 'حدث خطأ غير متوقع.' : i18n.language === 'fr' ? 'Erreur inattendue.' : 'Unexpected error.')}</h2>
        <button onClick={() => navigate(-1)} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors">
          {t('common.back', i18n.language === 'ar' ? 'رجوع' : i18n.language === 'fr' ? 'Retour' : 'Back')}
        </button>
      </div>
    );
  }

  const isPayment = type === 'payment';
  
  // ------------------------------------------------------------------
  // دالة الطباعة المباشرة
  // ------------------------------------------------------------------
  const handlePrint = () => {
    const printElement = document.getElementById('printable-receipt');
    if (!printElement) return;

    let iframe = document.getElementById('silent-print-iframe');
    if (iframe) document.body.removeChild(iframe);

    iframe = document.createElement('iframe');
    iframe.id = 'silent-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="${i18n.language}" dir="${isRTL ? 'rtl' : 'ltr'}">
      <head>
        <title>Print Receipt</title>
        <style>
          @page { margin: 0; }
          html, body { 
            margin: 0; 
            padding: 0;
            width: 72mm; 
            background: #fff; 
            color: #000; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          }
          .print-wrapper {
            width: 100%;
            padding: 2mm 5mm; 
            box-sizing: border-box;
          }
          #printable-receipt { 
            width: 100% !important; 
            min-width: 0 !important;
            max-width: 100% !important;
            margin: 0 !important; 
            padding: 0 !important;
            box-shadow: none !important;
          }
          /* 🔴 إجبار كل شيء على الظهور بالأسود الداكن أثناء الطباعة */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          ${printElement.outerHTML}
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
    }, 500);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-receipt');
    if (!element) return;

    try {
      element.classList.remove('shadow-2xl');
      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      element.classList.add('shadow-2xl');

      const pdfWidth = 80;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${isPayment ? 'Payment' : 'Receipt'}_${supplierName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-start font-sans" dir={isRTL ? "rtl" : "ltr"}>
      
      <div className="w-full max-w-[80mm] flex justify-between items-center mb-6 no-print gap-2">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-3 rounded-lg border border-slate-800 font-bold whitespace-nowrap">
          {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />} 
          {t('common.cancel', i18n.language === 'ar' ? 'إلغاء' : i18n.language === 'fr' ? 'Annuler' : 'Cancel')}
        </button>
      </div>

      <div 
         id="printable-receipt" 
         className="receipt-ticket-forced bg-white text-black shadow-2xl p-4 rounded-md mb-6 flex flex-col justify-between" 
         dir={isRTL ? "rtl" : "ltr"} 
         style={{ width: '80mm', minHeight: '105mm', margin: '0 auto' }}
      >
        <div>
          <div style={{ textAlign: 'center', marginBottom: '12px', borderBottom: '2px dashed #000', paddingBottom: '12px' }}>
            <div style={{ fontSize: '20px', fontWeight: '900', marginBottom: '6px', color: '#000000' }}>
              {currentStoreName}
            </div>
            {/* 🔴 التعديل الأول هنا: استبدال الخلفية السوداء بإطار أسود ليطبع بقوة */}
            <div style={{ 
              display: 'inline-block', 
              backgroundColor: '#ffffff', 
              color: '#000000', 
              border: '2px solid #000000',
              padding: '4px 12px', 
              borderRadius: '6px', 
              fontSize: '14px', 
              fontWeight: '900' 
            }}>
              {isPayment
                ? t('receipt.payment_title', i18n.language === 'ar' ? 'إضافة تسديد (دفع)' : i18n.language === 'fr' ? 'Reçu de Paiement' : 'Payment Receipt')
                : t('receipt.receipt_title', i18n.language === 'ar' ? 'إضافة فاتورة (سلعة)' : i18n.language === 'fr' ? 'Facture (Entrée)' : 'Invoice Receipt')}
            </div>
          </div>
          
          <div style={{ marginTop: '15px', fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #000', padding: '6px 0' }}>
               <span>{t('receipt.date', i18n.language === 'ar' ? 'التاريخ:' : i18n.language === 'fr' ? 'Date:' : 'Date:')}</span>
               <span dir="ltr">{data.date || new Date().toISOString().split('T')[0].replace(/-/g, '/')}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #000', padding: '6px 0' }}>
               <span>{t('receipt.supplier', i18n.language === 'ar' ? 'المورد:' : i18n.language === 'fr' ? 'Fournisseur:' : 'Supplier:')}</span>
               <span>{supplierName}</span>
             </div>

             {data.caisse_source && (
               <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #000', padding: '6px 0' }}>
                 <span>{t('payroll.fundSource', i18n.language === 'ar' ? 'الصندوق:' : i18n.language === 'fr' ? 'Caisse:' : 'Fund Source:')}</span>
                 <span>{data.caisse_source === 'admin' ? t('common.superAdmin', i18n.language === 'ar' ? 'المدير العام' : i18n.language === 'fr' ? 'Admin' : 'Admin') : data.caisse_source}</span>
               </div>
             )}

             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', borderTop: '2px solid #000', padding: '10px 4px', marginTop: '15px', fontSize: '18px', backgroundColor: '#ffffff', borderRadius: '4px' }}>
               <span>{t('receipt.amount', i18n.language === 'ar' ? 'المبلغ:' : i18n.language === 'fr' ? 'Montant:' : 'Amount:')}</span>
               <span dir="ltr" style={{ fontWeight: '900' }}>{Math.abs(Number(data.amount)).toLocaleString()} {t('currency', 'DA')}</span>
             </div>

             {data.note && (
               <div style={{ marginTop: '15px', padding: '8px', backgroundColor: '#ffffff', borderRadius: '4px', border: '2px dashed #000' }}>
                 <div style={{ fontSize: '12px', color: '#000000', marginBottom: '4px' }}>{t('receipt.note', i18n.language === 'ar' ? 'ملاحظة:' : i18n.language === 'fr' ? 'Note:' : 'Note:')}</div>
                 <div style={{ fontSize: '13px' }}>{data.note}</div>
               </div>
             )}
          </div>
        </div>

        <div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#000000' }}>
            <div style={{ textAlign: 'center', width: '45%', borderTop: '1px dashed #000', paddingTop: '5px' }}>
              {t('receipt.signature', i18n.language === 'ar' ? 'توقيع المستلم' : i18n.language === 'fr' ? 'Signature' : 'Signature')}
            </div>
            <div style={{ textAlign: 'center', width: '45%', borderTop: '1px dashed #000', paddingTop: '5px' }}>
              {t('receipt.stamp', i18n.language === 'ar' ? 'ختم المحل' : i18n.language === 'fr' ? 'Cachet' : 'Stamp')}
            </div>
          </div>

          <div className="footer-area" style={{ marginTop: '25px', paddingTop: '15px', fontSize: '11px', textAlign: 'center', borderTop: '2px dashed #000', color: '#000000' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{t('receipt.footer', i18n.language === 'ar' ? 'شكراً لتعاملكم معنا' : i18n.language === 'fr' ? 'Merci pour votre confiance' : 'Thank you for your business')}</div>
            {/* 🔴 التعديل الثاني هنا: إجبار الخط على أن يكون أسود غامقاً جداً ليطبع بقوة */}
            <div style={{ fontSize: '11px', color: '#000000', fontWeight: '900', letterSpacing: '1px' }}>POWERED BY GHERBI.AI</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-[80mm] mt-4 no-print">
         <button onClick={handlePrint} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
           <Printer size={18} /> {t('common.print', i18n.language === 'ar' ? 'طباعة' : i18n.language === 'fr' ? 'Imprimer' : 'Print')}
         </button>

         <button onClick={handleDownloadPDF} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
           <Download size={18} /> {t('hr.badge.downloadPDF', i18n.language === 'ar' ? 'تحميل PDF' : i18n.language === 'fr' ? 'Télécharger PDF' : 'Download PDF')}
         </button>
      </div>

    </div>
  );
}
```

---

## `frontend\src\components\pages\StoreMap.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react'; 
import { 
  LayoutGrid, Snowflake, Monitor, PackageOpen, 
  RotateCw, Trash2, Save, XCircle, AlertCircle, CheckCircle2, 
  MousePointerSquareDashed, Grid3X3, Loader2,
  Settings2, Box, Tags, Plus, X, FolderKanban, CheckCircle, Map as MapIcon,
  AlignLeft, Type, Edit, PackagePlus
} from 'lucide-react';
import Modal from '../ui/Modal'; 

export default function StoreMap() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [layouts, setLayouts] = useState([]);
  const [activeLayoutId, setActiveLayoutId] = useState(null);

  const [gridSize, setGridSize] = useState({ rows: 10, cols: 14 });
  const [placedItems, setPlacedItems] = useState([]);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [shelfInventory, setShelfInventory] = useState([]);
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);

  const [customCategory, setCustomCategory] = useState('');
  const [customCategoryDesc, setCustomCategoryDesc] = useState('');

  const [manualProductName, setManualProductName] = useState('');
  const [manualProductQty, setManualProductQty] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductQty, setEditProductQty] = useState('');

  // 🌟 جلب التصنيفات الكبرى ومحتوياتها من ملفات الترجمة بشكل ديناميكي
  const hypermarketCategories = [
    { group: t('storeMap.catGroups.grocery'), items: t('storeMap.catItems.grocery', { returnObjects: true }) || [] },
    { group: t('storeMap.catGroups.dairy'), items: t('storeMap.catItems.dairy', { returnObjects: true }) || [] },
    { group: t('storeMap.catGroups.drinks'), items: t('storeMap.catItems.drinks', { returnObjects: true }) || [] },
    { group: t('storeMap.catGroups.cleaning'), items: t('storeMap.catItems.cleaning', { returnObjects: true }) || [] },
    { group: t('storeMap.catGroups.personalCare'), items: t('storeMap.catItems.personalCare', { returnObjects: true }) || [] },
    { group: t('storeMap.catGroups.snacks'), items: t('storeMap.catItems.snacks', { returnObjects: true }) || [] },
    { group: t('storeMap.catGroups.pets'), items: t('storeMap.catItems.pets', { returnObjects: true }) || [] }
  ];

  const [customTools, setCustomTools] = useState(() => {
    const saved = localStorage.getItem('pos_custom_tools');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAddToolModalOpen, setIsAddToolModalOpen] = useState(false);
  const [newTool, setNewTool] = useState({ name: '', icon: 'ShoppingBasket', color: 'bg-purple-500' });

  const suggestedIcons = ['ShoppingBasket', 'Apple', 'Shirt', 'Coffee', 'Tag', 'Gift', 'Armchair', 'Scissors', 'PenTool', 'Speaker', 'Flame'];
  const suggestedColors = ['bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-teal-500'];

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const baseTools = [
    { type: 'shelf', icon: LayoutGrid, label: t('storeMap.tools.shelf'), color: 'bg-blue-600' },
    { type: 'fridge', icon: Snowflake, label: t('storeMap.tools.fridge'), color: 'bg-cyan-500' },
    { type: 'freezer', icon: PackageOpen, label: t('storeMap.tools.freezer'), color: 'bg-indigo-500' },
    { type: 'cashier', icon: Monitor, label: t('storeMap.tools.cashier'), color: 'bg-emerald-600' },
    { type: 'wall', icon: Grid3X3, label: t('storeMap.tools.wall'), color: 'bg-slate-700' }
  ];

  const allTools = [...baseTools, ...customTools.map(ct => ({ type: ct.type, icon: Icons[ct.icon] || Icons.Box, label: ct.name, color: ct.color, isCustom: true }))];

  const loadLayouts = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getStoreLayouts) {
        const res = await window.api.getStoreLayouts();
        if (res.success) {
          setLayouts(res.data);
          if (res.data.length > 0) switchTab(res.data.find(l => l.is_active === 1) || res.data[0]);
          else handleCreateNewLayout();
        }
      }
    } catch (error) { console.error("Error loading layouts:", error); }
    setIsLoading(false);
  };

  useEffect(() => { loadLayouts(); }, []);

  const switchTab = (layoutObj) => {
    setActiveLayoutId(layoutObj.id);
    setGridSize({ rows: layoutObj.grid_rows || 10, cols: layoutObj.grid_cols || 14 });
    try { setPlacedItems(layoutObj.items_json ? JSON.parse(layoutObj.items_json) : []); } catch (e) { setPlacedItems([]); }
    setSelectedItem(null);
  };

  const handleCreateNewLayout = () => {
    const newId = `temp_${Date.now()}`;
    const newLayout = { id: newId, name: t('storeMap.newLayout', { count: layouts.length + 1 }), is_active: 0, grid_rows: 10, grid_cols: 14, items_json: "[]" };
    setLayouts([...layouts, newLayout]);
    switchTab(newLayout);
  };

  const handleSaveMap = async () => {
    try {
      const layoutToSave = layouts.find(l => l.id === activeLayoutId);
      if(!layoutToSave) return;
      const payload = { id: String(activeLayoutId).startsWith('temp_') ? null : activeLayoutId, name: layoutToSave.name, gridRows: gridSize.rows, gridCols: gridSize.cols, items: placedItems };
      if (window.api && window.api.saveStoreLayout) {
        const res = await window.api.saveStoreLayout(payload);
        if (res.success) { showToast('success', t('storeMap.saveSuccess')); loadLayouts(); }
      }
    } catch (error) { showToast('error', t('common.error')); }
  };

  const handleActivateLayout = async () => {
    if (String(activeLayoutId).startsWith('temp_')) { showToast('warning', t('storeMap.saveBeforeActivate')); return; }
    try {
      if (window.api && window.api.activateStoreLayout) {
        const res = await window.api.activateStoreLayout(activeLayoutId);
        if (res.success) { showToast('success', t('storeMap.activateSuccess')); loadLayouts(); }
      }
    } catch (error) { console.error(error); }
  };

  const handleDeleteLayout = async (e, id) => {
    e.stopPropagation(); 
    if(!window.confirm(t('storeMap.confirmDeleteLayout'))) return;
    try {
      if (window.api && window.api.deleteStoreLayout) {
        if (!String(id).startsWith('temp_')) await window.api.deleteStoreLayout(id);
        showToast('success', t('common.deleteSuccess')); loadLayouts();
      }
    } catch (error) { console.error(error); }
  };

  const updateLayoutName = (newName) => setLayouts(layouts.map(l => l.id === activeLayoutId ? { ...l, name: newName } : l));

  const handleDragStartTool = (e, toolType) => e.dataTransfer.setData('toolType', toolType);
  const handleDragStartPlacedItem = (e, itemId) => e.dataTransfer.setData('sourceItemId', itemId);
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    const toolType = e.dataTransfer.getData('toolType');
    const sourceItemId = e.dataTransfer.getData('sourceItemId');
    const isOccupied = placedItems.find(item => item.row === row && item.col === col);

    if (sourceItemId) {
      if (isOccupied && isOccupied.id !== sourceItemId) { showToast('warning', t('storeMap.occupiedError')); return; }
      setPlacedItems(prev => prev.map(item => item.id === sourceItemId ? { ...item, row, col } : item));
      setSelectedItem(placedItems.find(item => item.id === sourceItemId)); return;
    }

    if (!toolType) return;
    if (isOccupied) { setSelectedItem(isOccupied); return; }

    const toolObj = allTools.find(t => t.type === toolType);
    const newItem = { id: Date.now().toString(), type: toolType, row, col, rotation: 0, name: `${toolObj?.label || 'Tool'} ${placedItems.length + 1}`, capacity: toolType === 'wall' ? 0 : 100, categories: [] };
    setPlacedItems([...placedItems, newItem]); setSelectedItem(newItem);
  };

  const handleRotate = () => {
    if (!selectedItem) return;
    setPlacedItems(placedItems.map(item => item.id === selectedItem.id ? { ...item, rotation: (item.rotation + 90) % 360 } : item));
    setSelectedItem({ ...selectedItem, rotation: (selectedItem.rotation + 90) % 360 });
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    setPlacedItems(placedItems.filter(item => item.id !== selectedItem.id)); setSelectedItem(null);
  };

  const handleClearAll = () => { if(window.confirm(t('storeMap.confirmClear'))) { setPlacedItems([]); setSelectedItem(null); } };

  const handleAddCategory = () => {
    const catName = customCategory.trim();
    if (!catName || !selectedItem) return;
    let currentCats = selectedItem.categories || [];
    currentCats = currentCats.map(c => typeof c === 'string' ? { name: c, desc: '' } : c);
    if (currentCats.some(c => c.name === catName)) { showToast('warning', t('storeMap.catExists')); return; }
    const updated = [...currentCats, { name: catName, desc: customCategoryDesc.trim() }];
    setPlacedItems(prev => prev.map(item => item.id === selectedItem.id ? { ...item, categories: updated } : item));
    setSelectedItem({ ...selectedItem, categories: updated });
    setCustomCategory(''); setCustomCategoryDesc('');
    showToast('success', t('storeMap.catLabels.addSuccess'));
  };

  const removeCategory = (catNameToRemove) => {
    let currentCats = selectedItem.categories || [];
    currentCats = currentCats.map(c => typeof c === 'string' ? { name: c, desc: '' } : c);
    const updated = currentCats.filter(c => c.name !== catNameToRemove);
    setPlacedItems(prev => prev.map(item => item.id === selectedItem.id ? { ...item, categories: updated } : item));
    setSelectedItem({ ...selectedItem, categories: updated });
  };

  const handleSelectPredefined = (e) => {
    if (e.target.value) setCustomCategory(e.target.value);
  };

  const fetchInventory = async (shelfId) => {
    setIsLoadingInventory(true);
    try {
      if (window.api && window.api.getShelfProducts) {
        const res = await window.api.getShelfProducts(shelfId);
        if (res.success) setShelfInventory(res.data);
      }
    } catch (error) { console.error("Error fetching shelf contents", error); } 
    finally { setIsLoadingInventory(false); }
  };

  useEffect(() => {
    if (selectedItem && selectedItem.id) fetchInventory(selectedItem.id);
  }, [selectedItem]);

  const handleAddManualProduct = async () => {
    if (!manualProductName.trim() || !manualProductQty) return;
    try {
      const fakeBarcode = `MAN_ID_${Date.now()}`;
      if (window.api && window.api.processPdfInventory) {
        const res = await window.api.processPdfInventory({
          shelfId: selectedItem.id, barcode: fakeBarcode, cleanName: manualProductName.trim(), dirtyName: manualProductName.trim(), quantity: Number(manualProductQty)
        });
        if (res.success) {
          showToast('success', t('storeMap.manualAdd.success'));
          setManualProductName(''); setManualProductQty('');
          fetchInventory(selectedItem.id);
        }
      }
    } catch (error) { console.error(error); }
  };

  const handleDeleteProduct = async (productId) => {
    if(!window.confirm(t('storeMap.confirmDeleteProduct', 'Are you sure you want to delete this product?'))) return;
    try {
      if (window.api && window.api.deleteShelfProduct) {
        await window.api.deleteShelfProduct(productId);
        showToast('success', t('common.deleteSuccess'));
        fetchInventory(selectedItem.id);
      } 
    } catch (e) { console.error(e); }
  };

  const startEditingProduct = (product) => {
    setEditingProductId(product.id);
    setEditProductName(product.clean_name);
    setEditProductQty(product.quantity);
  };

  const handleSaveEditProduct = async () => {
    try {
      if (window.api && window.api.updateShelfProduct) {
        await window.api.updateShelfProduct(editingProductId, editProductName, Number(editProductQty));
        setEditingProductId(null);
        showToast('success', t('common.saveSuccess'));
        fetchInventory(selectedItem.id);
      }
    } catch(e) { console.error(e); }
  };

  const handleCreateCustomTool = () => {
    if (!newTool.name.trim()) { showToast('warning', t('storeMap.toolNameRequired')); return; }
    const newToolObj = { type: `custom_${Date.now()}`, name: newTool.name, icon: newTool.icon, color: newTool.color };
    const updatedCustomTools = [...customTools, newToolObj];
    setCustomTools(updatedCustomTools); localStorage.setItem('pos_custom_tools', JSON.stringify(updatedCustomTools));
    setIsAddToolModalOpen(false); setNewTool({ name: '', icon: 'ShoppingBasket', color: 'bg-purple-500' });
  };

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-blue-500"><Loader2 className="animate-spin" size={48} /></div>;

  const currentLayoutObj = layouts.find(l => l.id === activeLayoutId);
  const safeSelectedCategories = (selectedItem?.categories || []).map(c => typeof c === 'string' ? { name: c, desc: '' } : c);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-300 p-6 font-sans text-start relative" dir={i18n.dir()}>
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-end gap-1 mb-6 border-b border-slate-800 overflow-x-auto no-scrollbar pb-px">
        {layouts.map(layout => (
          <div 
            key={layout.id} onClick={() => switchTab(layout)}
            className={`flex items-center gap-3 px-4 py-3 min-w-[180px] max-w-[250px] rounded-t-xl cursor-pointer border-t border-x transition-all group select-none ${activeLayoutId === layout.id ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-950 border-transparent text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'}`}
          >
            {layout.is_active === 1 ? <CheckCircle size={16} className="text-emerald-500 shrink-0"/> : <FolderKanban size={16} className="shrink-0"/>}
            <span className="truncate font-medium flex-1">{layout.name}</span>
            <button onClick={(e) => handleDeleteLayout(e, layout.id)} className={`p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-red-400 ${activeLayoutId === layout.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}><X size={14} /></button>
          </div>
        ))}
        <button onClick={handleCreateNewLayout} className="px-4 py-3 rounded-t-xl hover:bg-slate-900 text-slate-400 hover:text-blue-400 transition-colors flex items-center justify-center"><Plus size={18} /></button>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
           <input type="text" value={currentLayoutObj?.name || ''} onChange={(e) => updateLayoutName(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-xl font-bold text-white focus:border-blue-500 focus:outline-none w-full md:w-64" placeholder={t('storeMap.layoutNamePlaceholder')} />
           {currentLayoutObj?.is_active === 1 && (
             <span className="bg-emerald-900/30 text-emerald-400 border border-emerald-800 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1">
               <CheckCircle2 size={14}/> {t('storeMap.activeLayoutBadge')}
             </span>
           )}
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {currentLayoutObj?.is_active !== 1 && (
             <button onClick={handleActivateLayout} className="justify-center bg-slate-800 hover:bg-emerald-900/50 text-slate-300 hover:text-emerald-400 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-slate-700 hover:border-emerald-900/50">
               <CheckCircle size={18} /> <span className="hidden sm:inline">{t('storeMap.setAsActive')}</span>
             </button>
          )}
          <button onClick={handleClearAll} className="justify-center bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-slate-700 hover:border-red-900/50">
            <XCircle size={18} /> <span className="hidden sm:inline">{t('storeMap.clearBtn')}</span>
          </button>
          <button onClick={handleSaveMap} className="justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20">
            <Save size={18} /> {t('common.save')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Toolbox */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <MousePointerSquareDashed size={18} className="text-blue-400"/> {t('storeMap.toolbox')}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {allTools.map(tool => (
                <div key={tool.type} draggable onDragStart={(e) => handleDragStartTool(e, tool.type)} className="bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition-all group relative">
                  {tool.isCustom && (
                    <button onClick={() => { const updated = customTools.filter(t => t.type !== tool.type); setCustomTools(updated); localStorage.setItem('pos_custom_tools', JSON.stringify(updated)); }} className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all"><X size={14} /></button>
                  )}
                  <div className={`p-2 rounded-md text-white shadow-inner transition-transform group-hover:scale-110 ${tool.color}`}><tool.icon size={24} /></div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 text-center">{tool.label}</span>
                </div>
              ))}
              <button onClick={() => setIsAddToolModalOpen(true)} className="bg-slate-950 border border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-900/20 rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all group">
                <div className="p-2 rounded-md text-slate-500 group-hover:text-blue-400 transition-transform group-hover:scale-110"><Plus size={24} /></div>
                <span className="text-xs font-medium text-slate-500 group-hover:text-blue-400 text-center">{t('storeMap.addCustomTool')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Canvas */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 shadow-2xl flex flex-col items-center justify-center overflow-x-auto" onClick={() => setSelectedItem(null)}>
          <div className="w-full aspect-[14/10] min-w-[600px] bg-slate-950 border-2 border-slate-800 rounded-lg p-1"
               style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`, gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`, gap: '2px' }}>
            {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, index) => {
              const r = Math.floor(index / gridSize.cols);
              const c = index % gridSize.cols;
              const item = placedItems.find(i => i.row === r && i.col === c);
              const isSelected = selectedItem && selectedItem.id === item?.id;
              const toolInfo = item ? allTools.find(t => t.type === item.type) : null;

              return (
                <div 
                  key={`${r}-${c}`} draggable={!!item}
                  onDragStart={(e) => { if(item) { e.stopPropagation(); handleDragStartPlacedItem(e, item.id); } }}
                  onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, r, c)}
                  onClick={(e) => { e.stopPropagation(); if(item) setSelectedItem(item); }}
                  className={`w-full h-full rounded-sm flex items-center justify-center transition-all relative ${item ? 'cursor-grab active:cursor-grabbing shadow-md z-10' : 'border border-dashed border-slate-800/60 hover:bg-slate-800/50'} ${isSelected ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-950 scale-110 z-20' : ''} ${item ? toolInfo?.color : ''}`}
                >
                  {item && toolInfo && <div className="text-white drop-shadow-md transition-transform duration-300" style={{ transform: `rotate(${item.rotation}deg)` }}><toolInfo.icon size={18} /></div>}
                  {item && item.categories?.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full border border-slate-950">{item.categories.length}</span>}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center bg-slate-800/50 px-4 py-1 rounded-full">{t('storeMap.canvasHint')}</p>
        </div>

        {/* 3. Properties */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl min-h-[300px]">
            {selectedItem ? (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-3">{t('storeMap.properties')}</h3>
                <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className={`p-2 rounded-md text-white ${allTools.find(t => t.type === selectedItem.type)?.color}`}>
                    {React.createElement(allTools.find(t => t.type === selectedItem.type).icon, { size: 20 })}
                  </div>
                  <div><p className="text-xs text-slate-500">{t('storeMap.propType')}</p><p className="font-bold text-white">{allTools.find(t => t.type === selectedItem.type)?.label}</p></div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.propName')}</label>
                  <input type="text" value={selectedItem.name} onChange={(e) => { const updated = placedItems.map(item => item.id === selectedItem.id ? { ...item, name: e.target.value } : item); setPlacedItems(updated); setSelectedItem({ ...selectedItem, name: e.target.value }); }} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>

                {selectedItem.type !== 'wall' && (
                  <>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.propCapacity')}</label>
                    <input type="number" value={selectedItem.capacity} onChange={(e) => { const updated = placedItems.map(item => item.id === selectedItem.id ? { ...item, capacity: Number(e.target.value) } : item); setPlacedItems(updated); setSelectedItem({ ...selectedItem, capacity: Number(e.target.value) }); }} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                  </div>
                  <button onClick={() => setIsInventoryOpen(true)} className="w-full bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-900/50 hover:border-emerald-500 py-3 rounded-lg font-bold transition-all flex justify-center items-center gap-2"><Box size={18} /> {t('storeMap.manageInventoryBtn')}</button>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <button onClick={handleRotate} className="bg-slate-800 hover:bg-blue-900/40 text-slate-300 hover:text-blue-400 border border-slate-700 rounded-lg py-2 flex flex-col items-center justify-center gap-1 transition-colors"><RotateCw size={18} /> <span className="text-[10px]">{t('storeMap.rotateBtn')}</span></button>
                  <button onClick={handleDelete} className="bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-400 border border-slate-700 rounded-lg py-2 flex flex-col items-center justify-center gap-1 transition-colors"><Trash2 size={18} /> <span className="text-[10px]">{t('common.delete')}</span></button>
                </div>
              </div>
            ) : (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2"><Settings2 size={18} className="text-amber-400"/> {t('storeMap.gridSettings')}</h3>
                <div><label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.gridCols')}</label><input type="number" min="5" max="30" value={gridSize.cols} onChange={(e) => setGridSize({...gridSize, cols: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" /></div>
                <div><label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.gridRows')}</label><input type="number" min="5" max="30" value={gridSize.rows} onChange={(e) => setGridSize({...gridSize, rows: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" /></div>
                <p className="text-xs text-slate-500 text-center mt-4 border-t border-slate-800 pt-4">{t('storeMap.emptyProps')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==========================================
          النافذة المنبثقة لإدارة الرفو والمخزون 
         ========================================== */}
      <Modal isOpen={isInventoryOpen} onClose={() => { setIsInventoryOpen(false); setEditingProductId(null); }} title={`${t('storeMap.inventoryModalTitle')} ${selectedItem?.name}`}>
        <div className="space-y-6 text-start p-2" dir={isRTL ? "rtl" : "ltr"}>
          
          {/* الأقسام المربوطة */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[120px]">
            <h4 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2"><Tags size={16}/> {t('storeMap.linkedCategories')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {safeSelectedCategories.length > 0 ? (
                safeSelectedCategories.map((cat, index) => (
                  <div key={index} className="bg-blue-900/20 border border-blue-900/50 p-3 rounded-lg flex justify-between items-start group shadow-sm transition-colors hover:border-blue-700">
                    <div className="flex-1 pr-2">
                      <h5 className="text-blue-400 font-bold text-sm mb-1">{cat.name}</h5>
                      {cat.desc && <p className="text-slate-400 text-xs leading-relaxed">{cat.desc}</p>}
                    </div>
                    <button onClick={() => removeCategory(cat.name)} className="text-slate-500 hover:text-red-400 hover:bg-slate-900 p-1.5 rounded-md transition-colors"><Trash2 size={14} /></button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600 w-full col-span-2 text-center py-4">{t('storeMap.emptyInventory')}</p>
              )}
            </div>
          </div>

          {/* إضافة أقسام جديدة */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Plus size={18} className="text-emerald-400" /> {t('storeMap.catLabels.addNewCategoryTitle')}
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.catLabels.selectCategory')}</label>
                <select onChange={handleSelectPredefined} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-medium">
                  <option value="">{t('common.selectOption')}</option>
                  {hypermarketCategories.map((group, gIndex) => (
                    <optgroup key={gIndex} label={group.group} className="bg-slate-900 text-blue-400 font-bold">
                      {Array.isArray(group.items) && group.items.map((item, iIndex) => <option key={iIndex} value={item} className="text-white bg-slate-950 font-normal">{item}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-1"><Type size={14}/> {t('storeMap.catLabels.catName')}</label>
                  <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 font-bold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-1"><AlignLeft size={14}/> {t('storeMap.catLabels.catDesc')}</label>
                  <textarea value={customCategoryDesc} onChange={(e) => setCustomCategoryDesc(e.target.value)} rows="2" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm" placeholder={t('storeMap.catLabels.catDescPlaceholder')} />
                </div>
                <button onClick={handleAddCategory} disabled={!customCategory.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-bold transition-colors shadow-lg flex items-center justify-center gap-2 mt-2">
                  <Plus size={18} /> {t('storeMap.catLabels.addCategoryBtn')}
                </button>
              </div>
            </div>
          </div>

          {/* 🌟 قسم الإضافة اليدوية للسلع */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <PackagePlus size={18} className="text-amber-400" /> {t('storeMap.manualAdd.title')}
            </h4>
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                 <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.manualAdd.productName')}</label>
                 <input type="text" value={manualProductName} onChange={e=>setManualProductName(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder={t('storeMap.manualAdd.productNamePlaceholder')} />
              </div>
              <div className="w-full sm:w-24">
                 <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.manualAdd.quantity')}</label>
                 <input type="number" min="1" value={manualProductQty} onChange={e=>setManualProductQty(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white text-center focus:outline-none focus:border-blue-500" placeholder="0" dir="ltr" />
              </div>
              <button onClick={handleAddManualProduct} disabled={!manualProductName.trim() || !manualProductQty} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold h-[42px] flex items-center justify-center gap-2 shadow-lg">
                 <Plus size={18}/> {t('storeMap.manualAdd.addBtn')}
              </button>
            </div>
          </div>

          {/* 🌟 جدول السلع المخزنة */}
          <div className="mt-6 border-t border-slate-700 pt-6">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {t('storeMap.modal.storedProducts')}
            </h4>
            
            <div className="bg-slate-950 rounded-lg border border-slate-800 max-h-60 overflow-y-auto">
              {isLoadingInventory ? (
                <p className="text-slate-500 text-center py-6 text-sm">{t('storeMap.modal.loadingProducts')}</p>
              ) : shelfInventory.length === 0 ? (
                <p className="text-slate-500 text-center py-6 text-sm">{t('storeMap.modal.noProducts')}</p>
              ) : (
                <table className="w-full text-sm text-start">
                  <thead className="bg-slate-900 text-slate-400 sticky top-0 z-10">
                    <tr>
                      <th className="py-2.5 px-4 text-start">{t('storeMap.modal.productName')}</th>
                      <th className="py-2.5 px-4 text-center">{t('storeMap.modal.quantity')}</th>
                      <th className="py-2.5 px-4 text-center">{t('storeMap.modal.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shelfInventory.map((product) => {
                      const isEditing = editingProductId === product.id;
                      return (
                        <tr key={product.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-4">
                            {isEditing ? (
                              <input type="text" value={editProductName} onChange={e=>setEditProductName(e.target.value)} className="bg-slate-900 border border-slate-700 text-white px-3 py-1.5 rounded-lg w-full focus:outline-none focus:border-blue-500" />
                            ) : (
                              <span className="text-white font-medium">{product.clean_name}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center" dir="ltr">
                            {isEditing ? (
                              <input type="number" value={editProductQty} onChange={e=>setEditProductQty(e.target.value)} className="bg-slate-900 border border-slate-700 text-white px-2 py-1.5 rounded-lg w-20 text-center focus:outline-none focus:border-blue-500" />
                            ) : (
                              <span className="font-bold text-emerald-400">+{product.quantity}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-3">
                              {isEditing ? (
                                <>
                                  <button onClick={handleSaveEditProduct} className="text-emerald-400 hover:text-emerald-300 transition-colors" title={t('storeMap.modal.save')}><CheckCircle2 size={18}/></button>
                                  <button onClick={()=>setEditingProductId(null)} className="text-slate-400 hover:text-slate-300 transition-colors" title={t('storeMap.modal.cancel')}><X size={18}/></button>
                                </>
                              ) : (
                                <>
                                  <button onClick={()=>startEditingProduct(product)} className="text-blue-400 hover:text-blue-300 transition-colors" title={t('storeMap.modal.edit')}><Edit size={18}/></button>
                                  <button onClick={()=>handleDeleteProduct(product.id)} className="text-red-400 hover:text-red-300 transition-colors" title={t('storeMap.modal.delete')}><Trash2 size={18}/></button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </Modal>

      {/* نافذة إضافة أداة مخصصة */}
      <Modal isOpen={isAddToolModalOpen} onClose={() => setIsAddToolModalOpen(false)} title={t('storeMap.customToolModalTitle')}>
        <div className="space-y-6 text-start p-2" dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.toolNameLabel')}</label>
            <input type="text" value={newTool.name} onChange={(e) => setNewTool({...newTool, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" placeholder={t('storeMap.toolNamePlaceholder')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.chooseIcon')}</label>
            <div className="flex flex-wrap gap-3">
              {suggestedIcons.map(iconName => {
                const IconComp = Icons[iconName] || Icons.Box;
                return (
                  <button key={iconName} onClick={() => setNewTool({...newTool, icon: iconName})} className={`p-3 rounded-lg border transition-all flex items-center justify-center ${newTool.icon === iconName ? 'bg-slate-800 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                    <IconComp size={24} />
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.chooseColor')}</label>
            <div className="flex flex-wrap gap-3">
              {suggestedColors.map(colorClass => (
                <button key={colorClass} onClick={() => setNewTool({...newTool, color: colorClass})} className={`w-10 h-10 rounded-full transition-all ${colorClass} ${newTool.color === colorClass ? 'ring-4 ring-offset-2 ring-offset-slate-900 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`} />
              ))}
            </div>
          </div>
          <button onClick={handleCreateCustomTool} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-all flex justify-center items-center gap-2">
            <Plus size={18} /> {t('storeMap.confirmTool')}
          </button>
        </div>
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
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useSupplierStore from '../../store/supplierStore';
import useEmployeeStore from '../../store/employeeStore'; 
import ConfirmAlert from '../ui/ConfirmAlert'; 
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

  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => { fetchSuppliers(); fetchEmployees(); }, []);

  // 🔴 هذه الدالة هي التي ترسل البيانات إلى صفحة PrintPreview التي أصلحناها في الجزء الأول
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
      showToast('error', t('suppliers.messages.saveError')); 
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
      showToast('error', errorMessage); 
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
        showToast('error', t('common.error')); 
      }
    } catch (error) { console.error(error); }
    setTransactionToDelete(null);
  };

  const handleImportExcel = async () => {
    try {
      if (window.api && window.api.importSuppliersExcel) {
        const res = await window.api.importSuppliersExcel();
        if (res && res.success) {
          showToast('success', t('suppliers.actions.importSuccess', { count: res.count })); 
          fetchSuppliers(); 
        } else if (res && !res.canceled) {
          showToast('error', t('suppliers.actions.importError') + " \n" + res.error); 
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
          <button onClick={() => fetchSupplierDetails(row.original.id)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('suppliers.actions.view', i18n.language === 'ar' ? 'عرض التفاصيل' : i18n.language === 'fr' ? 'Voir' : 'View')}>
            <Eye size={18} />
          </button>
          <button onClick={() => openEditSupplierModal(row.original)} className="p-2 text-emerald-400 hover:bg-emerald-900/50 rounded-lg transition-colors" title={t('suppliers.actions.edit', i18n.language === 'ar' ? 'تعديل' : i18n.language === 'fr' ? 'Modifier' : 'Edit')}>
            <Edit size={18} />
          </button>
          <button onClick={() => confirmDeleteSupplier(row.original.id)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors" title={t('suppliers.actions.delete', i18n.language === 'ar' ? 'حذف' : i18n.language === 'fr' ? 'Supprimer' : 'Delete')}>
            <Trash2 size={18} />
          </button>
        </div>
      ) 
    }, 
  ], [t, fetchSupplierDetails, i18n.language]);

  const table = useReactTable({ data: suppliers, columns, state: { globalFilter }, onGlobalFilterChange: setGlobalFilter, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel() });
  
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
          {/* قسم الفواتير (الديون) */}
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
                      {/* 🔴 هنا زر فتح الطباعة / عرض الوصل */}
                      <button onClick={() => handlePreview('receipt', r)} className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors border border-slate-800" title={t('common.viewDocument', i18n.language === 'ar' ? 'عرض / طباعة الوصل' : i18n.language === 'fr' ? 'Imprimer le reçu' : 'Print Receipt')}><Eye size={18} /></button>
                      <button onClick={() => openEditTransactionModal('receipt', r)} className="p-2 text-blue-400 hover:bg-slate-800 hover:text-blue-300 rounded-lg transition-colors border border-slate-800" title={t('common.edit', i18n.language === 'ar' ? 'تعديل' : i18n.language === 'fr' ? 'Modifier' : 'Edit')}><Edit size={18} /></button>
                      <button onClick={() => handleDeleteTransactionClick('receipt', r.id)} className="p-2 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors border border-slate-800" title={t('common.delete', i18n.language === 'ar' ? 'حذف' : i18n.language === 'fr' ? 'Supprimer' : 'Delete')}><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* قسم الدفعات (التسديدات) */}
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
                      {/* 🔴 هنا زر فتح الطباعة / عرض الوصل */}
                      <button onClick={() => handlePreview('payment', p)} className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors border border-slate-800" title={t('common.viewDocument', i18n.language === 'ar' ? 'عرض / طباعة الوصل' : i18n.language === 'fr' ? 'Imprimer le reçu' : 'Print Receipt')}><Eye size={18} /></button>
                      <button onClick={() => openEditTransactionModal('payment', p)} className="p-2 text-blue-400 hover:bg-slate-800 hover:text-blue-300 rounded-lg transition-colors border border-slate-800" title={t('common.edit', i18n.language === 'ar' ? 'تعديل' : i18n.language === 'fr' ? 'Modifier' : 'Edit')}><Edit size={18} /></button>
                      <button onClick={() => handleDeleteTransactionClick('payment', p.id)} className="p-2 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors border border-slate-800" title={t('common.delete', i18n.language === 'ar' ? 'حذف' : i18n.language === 'fr' ? 'Supprimer' : 'Delete')}><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <Modal isOpen={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} title={transactionType === 'receipt' ? t('suppliers.details.addReceipt') : t('suppliers.details.addPayment')}>
          <form className="space-y-4" onSubmit={handleSaveTransaction} dir={isRTL ? "rtl" : "ltr"}>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('suppliers.details.amount')} ({t('currency')})</label>
              <input type="number" min="0" required value={transactionData.amount} onChange={(e) => setTransactionData({...transactionData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.dateLabel')}</label>
              <input type="date" required value={transactionData.date} onChange={(e) => setTransactionData({...transactionData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            </div>
            
            {transactionType === 'payment' && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.caisseSourceLabel')}</label>
                <select required value={transactionData.caisseSource} onChange={(e) => setTransactionData({...transactionData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start">
                  <option value="" disabled>-- {t('payroll.selectCaisse')} --</option>
                  <option value="admin">{t('expenses.adminCaisse')}</option>
                  {employees.filter(emp => emp.role === 'cashier' || emp.role === 'scale').map(emp => (
                    <option key={emp.id} value={emp.name}>{t('expenses.cashierCaisse', { name: emp.name, defaultValue: `صندوق الكاشير: ${emp.name}` })}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('payroll.note')} ({t('common.optional')})</label>
              <input type="text" value={transactionData.note} onChange={(e) => setTransactionData({...transactionData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setIsTransactionModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel')}</button>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{editingTransactionId ? t('common.saveChanges') : t('common.confirm')}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title={t('suppliers.details.schedulePayment')}>
          <form className="space-y-4 text-start" onSubmit={async (e) => {
            e.preventDefault();
            try {
              if (window.api && window.api.addAgendaTask) {
                await window.api.addAgendaTask({ title: t('suppliers.details.schedulePayment') + ` - ${currentSupplier.name}`, type: 'payment', date: scheduleData.date, time: scheduleData.time, amount: Number(scheduleData.amount) });
                setIsScheduleModalOpen(false);
                showToast('success', t('common.success'));
              }
            } catch (err) { console.error(err); showToast('error', t('common.error')); }
          }}>
            <div><label className="block text-sm text-slate-400 mb-1 text-start">{t('suppliers.details.amount')}</label><input type="number" required value={scheduleData.amount} onChange={(e) => setScheduleData({...scheduleData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-start" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm text-slate-400 mb-1 text-start">{t('expenses.dateLabel')}</label><input type="date" required value={scheduleData.date} onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-start" /></div>
              <div><label className="block text-sm text-slate-400 mb-1 text-start">{t('agenda.modal.timeLabel')}</label><input type="time" required value={scheduleData.time} onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-start" /></div>
            </div>
            <div className="pt-4 flex justify-end gap-3"><button type="button" onClick={() => setIsScheduleModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">{t('common.cancel')}</button><button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">{t('common.confirm')}</button></div>
          </form>
        </Modal>

        <ConfirmAlert isOpen={!!transactionToDelete} onClose={() => setTransactionToDelete(null)} onConfirm={executeDeleteTransaction} title={t('suppliers.actions.delete')} message={t('expenses.deleteConfirm')} confirmText={t('suppliers.actions.confirmDeleteBtn')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative">
      {renderToast()}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('suppliers.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('suppliers.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={handleImportExcel} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition-colors">
              <Upload size={18} /><span>Excel</span>
           </button>
           <button onClick={() => { setEditingSupplier(null); setFormData({ name: '', phone: '', initialDebt: 0 }); setIsAddModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
             <Plus size={18} /><span>{t('suppliers.addSupplier')}</span>
           </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 flex items-center bg-slate-950/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={globalFilter ?? ''} onChange={e => setGlobalFilter(e.target.value)} placeholder={t('suppliers.searchPlaceholder')} className="w-full bg-slate-950 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner text-start" dir={isRTL ? "rtl" : "ltr"} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-slate-800 bg-slate-950/80">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4 text-sm font-medium text-slate-400 whitespace-nowrap text-start">
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
          <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-3">
             <Search size={32} className="opacity-20" />
             <p>{t('common.noResults')}</p>
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => { setIsAddModalOpen(false); setEditingSupplier(null); }} title={editingSupplier ? t('suppliers.actions.edit') : t('suppliers.addSupplier')}>
        <form className="space-y-4" onSubmit={handleSaveSupplier} dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">*{t('suppliers.table.name')}</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('suppliers.table.phone')} ({t('common.optional')})</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('suppliers.table.totalDebt')} ({t('currency')}) - {t('common.optional')}</label>
            <input type="number" min="0" value={formData.initialDebt} onChange={(e) => setFormData({...formData, initialDebt: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            <p className="text-xs text-slate-500 mt-1 text-start">الرصيد الافتتاحي (ديون سابقة إن وجدت)</p>
          </div>
          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setIsAddModalOpen(false); setEditingSupplier(null); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{editingSupplier ? t('common.saveChanges') : t('suppliers.addSupplier')}</button>
          </div>
        </form>
      </Modal>

      <ConfirmAlert isOpen={!!supplierToDelete} onClose={() => setSupplierToDelete(null)} onConfirm={executeDeleteSupplier} title={t('suppliers.actions.delete')} message={t('suppliers.messages.deleteProtected')} confirmText={t('suppliers.actions.confirmDeleteBtn')} />
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
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const PrintablePayrollReport = forwardRef(({ data, dateRange }, ref) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // قراءة اسم المحل (نفس المصدر المستخدم في بقية المستندات المطبوعة)
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString(i18n.language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatHours = (hours) => Number(hours || 0).toFixed(2);

  if (!data) return null;

  // 🔴 استخراج البيانات بذكاء (سواء جاءت كمصفوفة مباشرة، أو مغلفة داخل object)
  let recordsArray = [];
  if (Array.isArray(data)) {
    recordsArray = data;
  } else if (data && Array.isArray(data.data)) {
    recordsArray = data.data; // عندما نضغط زر "طباعة التقرير" الشامل
  } else if (data && Array.isArray(data.salaries)) {
    recordsArray = data.salaries;
  } else if (data) {
    recordsArray = [data]; // في حال طباعة موظف واحد
  }

  if (recordsArray.length === 0) return null;

  return (
    <div ref={ref} className="printable-area print-a4 bg-white text-black p-8 font-sans w-full max-w-[210mm] mx-auto text-start" dir={isRTL ? "rtl" : "ltr"}>
      
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">{t('payroll.reportTitle', 'تقرير الرواتب الشامل وحركة الحضور')}</h2>
        <div className="flex justify-between text-sm font-bold text-gray-600 mt-4 px-4">
          <span>{currentStoreName}</span>
          <span>{t('zreport.date', 'تاريخ الإصدار:')} <bdi dir="ltr">{new Date().toLocaleDateString(i18n.language)}</bdi></span>
        </div>
      </div>

      <div className="space-y-8">
        {recordsArray.map((record, index) => {
          // 🔴 توحيد أسماء المتغيرات لحل مشكلة الـ 0.00
          const empName = record.employee_name || record.name || record.employeeName || '---';
          const tHours = Number(record.total_hours || record.hours || 0);
          const hRate = Number(record.hourly_rate || record.rate || 0);
          const tAdvances = Number(record.total_advances || record.deductions || 0);
          
          // 🔴 حساب الراتب الإجمالي برمجياً لأن قاعدة البيانات لا تخزنه (ساعات * سعر الساعة)
          const gSalary = Number(record.gross_salary || record.grossSalary || (tHours * hRate));
          const nSalary = Number(record.net_salary || record.netSalary || 0);
          
          const sDate = record.start_date || dateRange?.start || record.period?.split(' - ')[0] || '';
          const eDate = record.end_date || dateRange?.end || record.period?.split(' - ')[1] || '';

          return (
            <div key={index} className="border-2 border-gray-800 rounded-lg overflow-hidden break-inside-avoid">
              
              <div className="bg-gray-100 p-3 border-b-2 border-gray-800 flex justify-between items-center">
                <h3 className="font-bold text-lg flex gap-2">
                  <span>{t('hr.table.nameWithRole', 'الموظف:')}</span> <span className="text-blue-700">{empName}</span>
                </h3>
                <div className="text-sm font-bold text-gray-700 flex gap-2">
                  {t('payroll.period', 'الفترة:')} <bdi dir="ltr">{sDate}</bdi> <span>{t('common.to', 'إلى')}</span> <bdi dir="ltr">{eDate}</bdi>
                </div>
              </div>

              <div className="grid grid-cols-4 divide-x divide-gray-300 rtl:divide-x-reverse text-center bg-white border-b-2 border-gray-800">
                <div className="p-3">
                  <p className="text-xs text-gray-500 font-bold mb-1">{t('payroll.totalHours', 'إجمالي الساعات')}</p>
                  <p className="font-bold text-lg"><bdi>{formatHours(tHours)}</bdi></p>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 font-bold mb-1">{t('payroll.hourlyRate', 'سعر الساعة')}</p>
                  <p className="font-bold text-lg"><bdi>{formatMoney(hRate)}</bdi> <span className="text-xs">{t('currency')}</span></p>
                </div>
                <div className="p-3 bg-red-50">
                  <p className="text-xs text-red-700 font-bold mb-1">{t('payroll.deductions', 'الخصومات / السلف')}</p>
                  <p className="font-bold text-lg text-red-600"><bdi dir="ltr">- {formatMoney(tAdvances)}</bdi> <span className="text-xs">{t('currency')}</span></p>
                </div>
                <div className="p-3 bg-blue-50">
                  <p className="text-xs text-blue-700 font-bold mb-1">{t('payroll.grossSalary', 'الراتب الإجمالي')}</p>
                  <p className="font-bold text-lg text-blue-700"><bdi>{formatMoney(gSalary)}</bdi> <span className="text-xs">{t('currency')}</span></p>
                </div>
              </div>

              <div className="bg-black text-white p-3 flex justify-between items-center text-lg">
                <span className="font-bold">{t('payroll.netSalary', 'الصافي للدفع:')}</span>
                <span className="font-black text-2xl tracking-wider"><bdi>{formatMoney(nSalary)}</bdi> <span className="text-sm text-gray-300">{t('currency')}</span></span>
              </div>

              {record.daily_logs && record.daily_logs.length > 0 && (
                <div className="p-4 bg-gray-50 text-sm">
                  <p className="font-bold text-gray-600 mb-2 border-b border-gray-300 pb-1">{t('hr.attendanceLog', 'تفاصيل الحضور والانصراف اليومي')}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    {record.daily_logs.map((log, i) => (
                      <div key={i} className="flex justify-between border-b border-gray-200 py-1 border-dashed">
                         <span className="font-medium"><bdi dir="ltr">{log.date}</bdi></span>
                         <span className="font-mono"><bdi dir="ltr">{log.time_in || '--:--'} <span className="text-gray-400">→</span> {log.time_out || '--:--'}</bdi></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 pt-8 border-t-2 border-black flex justify-between break-inside-avoid">
        <div className="text-center w-48">
          <p className="border-b border-black pb-1 mb-2 font-bold">{t('zreport.manager_sig', 'توقيع الإدارة / الختم')}</p>
        </div>
        <div className="text-center w-48">
          <p className="border-b border-black pb-1 mb-2 font-bold">{t('payroll.accountantSig', 'توقيع المستلم')}</p>
        </div>
      </div>

      <div className="text-center text-xs font-bold text-gray-400 font-mono mt-12 break-inside-avoid">
        {t('eod.receipt_footer', 'مزود النظام')}
        <br />POWERED BY GHERBI.AI
      </div>
    </div>
  );
});

export default PrintablePayrollReport;
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
  
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';
  
  if (!data) return null;

  const { type, item, supplierName } = data;
  const isReceipt = type === 'receipt';

  return (
    <div className="w-full bg-white text-black font-sans print:p-0" dir={i18n.dir()}>
      <div className="receipt-ticket-forced mx-auto shadow-2xl">
        
        <div className="header-title">GHERBI.AI</div>
        <div className="header-subtitle">CODE &bull; MULTIMEDIA &bull; ALGO &bull; AI</div>
        <div className="header-title" style={{ marginTop: '1mm' }}><bdi>{currentStoreName}</bdi></div>
        
        <div className="badge-action">
          {isReceipt ? 'إضافة فاتورة (سلعة)' : 'إضافة تسديد (دفع)'}
        </div>
        
        <div className="receipt-divider"></div>

        <div className="flex flex-col w-full my-2">
          <div className="info-row">
            <span className="label-field">{t('print.date', 'التاريخ:')}</span>
            <span className="value-field" dir="ltr">{item.date}</span>
          </div>
          <div className="info-row">
            <span className="label-field">{t('suppliers.modal.nameLabel', 'المورد:')}</span>
            <span className="value-field">{supplierName}</span>
          </div>
          {!isReceipt && item.caisse_source && (
            <div className="info-row">
              <span className="label-field">{t('payroll.caisse', 'الصندوق:')}</span>
              <span className="value-field">{item.caisse_source}</span>
            </div>
          )}
        </div>

        <div className="amount-box">
          <span className="box-title">{t('print.amount', 'المبلغ:')}</span>
          <span className="box-value" dir="ltr">
            <bdi>{item.amount.toLocaleString()} {t('currency', 'د.ج')}</bdi>
          </span>
        </div>

        {item.note && (
          <div className="note-box">
            <span className="note-title">{t('print.description', 'ملاحظة:')}</span>
            <span>{item.note}</span>
          </div>
        )}

        <div className="signatures-area">
          <span>{t('print.managerSignature', 'توقيع المستلم')}</span>
          <span>{t('receipt.stamp', 'ختم المحل')}</span>
        </div>

        <div className="receipt-divider"></div>

        <div className="footer-area">
          <div className="dev-brand">DEV: GHERBI.AI</div>
          <div style={{ marginTop: '0.5mm' }}>{t('print.thankYou', 'شكراً لتعاملكم معنا')}</div>
        </div>

      </div>
    </div>
  );
}
```

---

## `frontend\src\components\ui\SystemClock.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SystemClock() {
  const { i18n } = useTranslation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // تحديث الساعة كل ثانية
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="fixed bottom-4 left-6 bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-lg flex items-center gap-4 text-slate-300 z-[9999]" 
      dir={i18n.dir()}
    >
      <div className="flex items-center gap-2">
         <Calendar size={18} className="text-blue-400" />
         <span className="text-sm font-medium">
           {time.toLocaleDateString(i18n.language, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
         </span>
      </div>
      <div className="w-px h-6 bg-slate-700"></div>
      <div className="flex items-center gap-2" dir="ltr">
         <Clock size={18} className="text-emerald-400" />
         <span className="text-sm font-bold tracking-widest">
           {time.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
         </span>
      </div>
    </div>
  );
}
```

---

## `frontend\src\locales\ar\translation.json`

```json
{
  "currency": "د.ج",
  "common": {
    "search": "بحث...",
    "superAdmin": "المدير العام",
    "systemOwner": "صاحب النظام",
    "success": "تمت العملية بنجاح!",
    "error": "حدث خطأ غير متوقع.",
    "networkError": "خطأ في الاتصال بالشبكة.",
    "serverOnlyFeature": "هذه الميزة تعمل فقط على السيرفر الرئيسي.",
    "close": "إغلاق",
    "cancel": "إلغاء",
    "confirm": "تأكيد",
    "refresh": "تحديث",
    "from": "من",
    "to": "إلى",
    "loading": "جاري التحميل...",
    "noResults": "لا توجد نتائج مطابقة.",
    "all": "الكل",
    "save": "حفظ",
    "delete": "حذف",
    "deleteSuccess": "تم الحذف بنجاح",
    "selectOption": "-- اضغط للاختيار --",
    "optional": "اختياري",
    "saveChanges": "حفظ التغييرات"
  },
  "sidebar": {
    "dashboard": "لوحة القيادة",
    "suppliers": "الموردين والديون",
    "hr": "الموارد البشرية",
    "expenses": "المصاريف والسلف",
    "payroll": "الرواتب",
    "agenda": "الأجندة والمهام",
    "auditLogs": "سجل النشاطات",
    "end_of_day": "الصندوق / إغلاق الوردية",
    "settings": "الإعدادات",
    "storeMap": "مخطط المحل ثلاثي الأبعاد",
    "pdfImporter": "استيراد الفواتير (PDF)"
  },
"storeMap": {
    "title": "مخطط المحل التفاعلي",
    "subtitle": "اسحب الأدوات، صمم الأروقة، وجهز الرفوف لاستقبال سلع الفواتير آلياً",
    "toolbox": "صندوق الأدوات",
    "dragHint": "اسحبني إلى الخريطة",
    "canvasHint": "الواجهة الأمامية للمحل (المدخل)",
    "properties": "خصائص العنصر",
    "propType": "النوع",
    "propName": "تسمية الرف (للربط آلياً)",
    "propCapacity": "السعة القصوى (للتنبيه عند الامتلاء)",
    "emptyProps": "انقر على أي أداة في الخريطة لتعديل خصائصها وربطها.",
    "gridSettings": "إعدادات مساحة المحل",
    "gridRows": "العمق (الصفوف)",
    "gridCols": "العرض (الأعمدة)",
    "manageInventoryBtn": "إدارة السلع والأقسام",
    "inventoryModalTitle": "محتويات العنصر:",
    "categorySelect": "اختر من التصنيفات الجاهزة",
    "addCategoryBtn": "إضافة",
    "customCategoryPlaceholder": "أو اكتب صنفاً جديداً (مثال: طعام قطط)...",
    "emptyInventory": "هذا الرف فارغ حالياً.",
    "occupiedError": "المكان مشغول بعنصر آخر!",
    "capacityError": "الكمية تتجاوز السعة القصوى للرف!",
    "tools": {
      "shelf": "رف جندول",
      "fridge": "ثلاجة ألبان",
      "freezer": "مُجمّد لحوم",
      "cashier": "نقطة بيع",
      "wall": "فاصل / جدار"
    },
    "clearBtn": "مسح الكل",
    "saveBtn": "حفظ واعتماد المخطط",
    "rotateBtn": "تدوير",
    "confirmClear": "هل أنت متأكد من مسح المخطط بالكامل؟",
    "saveSuccess": "تم حفظ المخطط بنجاح! الرفوف جاهزة الآن لاستقبال السلع من الفواتير (PDF).",
    "newLayout": "مخطط جديد {{count}}",
    "saveBeforeActivate": "يرجى حفظ المخطط أولاً قبل تفعيله كخريطة أساسية!",
    "activateSuccess": "تم تعيين هذا المخطط ليكون هو الأساسي لاستقبال الفواتير.",
    "confirmDeleteLayout": "هل أنت متأكد من حذف هذا المخطط نهائياً؟",
    "layoutNamePlaceholder": "اسم المخطط...",
    "activeLayoutBadge": "المخطط الأساسي المعتمد",
    "setAsActive": "تعيين كأساسي",
    "linkedCategories": "الأقسام المربوطة بهذا الرف:",
    "customCategoryExample": "مثال: طعام قطط مستورد...",
    "predefinedCategories": [
      "عجائن (معكرونة)", "زيوت نباتية", "سكر ودقيق", "قهوة وشاي", "توابل وبهارات",
      "معلبات", "مشروبات وعصائر", "بسكويت وحلويات", "ألبان وأجبان", "لحوم مجمدة",
      "عناية شخصية", "مواد تنظيف"
    ],
    "addCustomTool": "أداة جديدة",
    "customToolModalTitle": "إنشاء أداة مخصصة جديدة",
    "toolNameLabel": "اسم الأداة (مثال: منصة عروض، سلة خضار)",
    "toolNamePlaceholder": "اكتب اسم الأداة هنا...",
    "chooseIcon": "اختر الأيقونة",
    "chooseColor": "اختر اللون",
    "confirmTool": "اعتماد الأداة",
    "toolNameRequired": "يرجى كتابة اسم الأداة",

  "catGroups": {
      "grocery": "المواد الغذائية (البقالة الجافة)",
      "dairy": "الألبان والأجبان (ثلاجات)",
      "drinks": "المشروبات والعصائر",
      "cleaning": "مواد التنظيف (المنظفات)",
      "personalCare": "العناية الشخصية ومستحضرات التجميل",
      "snacks": "الحلويات والبسكويت (Snacks)",
      "pets": "أغذية ومستلزمات الحيوانات"
    },
    "catItems": {
      "grocery": ["معلبات (تونة، طماطم)", "عجائن ومعكرونة", "بقوليات (عدس، حمص)", "سكر وملح", "دقيق وسميد", "زيوت وسمن", "توابل وبهارات"],
      "dairy": ["حليب", "أجبان بمختلف أنواعها", "زبادي (ياغورت)", "زبدة ومارغرين", "كريمات الطبخ"],
      "drinks": ["مياه معدنية", "عصائر طبيعية", "مشروبات غازية", "مشروبات طاقة", "قهوة وشاي", "مشروبات ساخنة سريعة التحضير"],
      "cleaning": ["مساحيق غسيل الملابس", "سائل الأواني", "معطرات جو", "منظفات أرضيات وزجاج", "مبيدات حشرات"],
      "personalCare": ["شامبو وبلسم", "صابون وجل استحمام", "معجون وفرش أسنان", "كريمات وعناية بالبشرة", "حفاضات ومناديل ورقية"],
      "snacks": ["بسكويت وكيك", "شوكولاتة", "شيبس ومقرمشات", "علكة وحلوى مضغ"],
      "pets": ["طعام قطط", "طعام كلاب", "رمل قطط ومستلزمات النظافة"]
    },
    "catLabels": {
      "selectCategory": "-- اختر تصنيفاً من القائمة الكبرى --",
      "catName": "اسم التصنيف",
      "catDesc": "وصف الرف (اختياري)",
      "catDescPlaceholder": "مثال: تونة، طماطم، فطر...",
      "addSuccess": "تمت إضافة التصنيف للرف بنجاح!",
      "addNewCategoryTitle": "إضافة تصنيفات جديدة للرف",
      "addCategoryBtn": "إضافة هذا التصنيف للرف"
    },
    "manualAdd": {
      "title": "إضافة سلعة يدوياً للرف",
      "productName": "اسم السلعة",
      "productNamePlaceholder": "مثال: تونة جولد...",
      "quantity": "الكمية",
      "addBtn": "إضافة",
      "success": "تمت إضافة السلعة للرف يدوياً بنجاح!"
    },
    "modal": {
      "storedProducts": "السلع المخزنة في هذا الرف (المخزون):",
      "loadingProducts": "جاري جلب السلع...",
      "noProducts": "لا توجد سلع مخزنة في هذا الرف حالياً.",
      "productName": "السلعة",
      "quantity": "الكمية",
      "actions": "الإجراءات",
      "edit": "تعديل",
      "delete": "حذف",
      "save": "حفظ",
      "cancel": "إلغاء"

    }
  }
  ,
  "pdfImporter": {
    "title": "المستورد الذكي (PDF)",
    "subtitle": "قم برفع وصولات الاستلام لاستخراج السلع وربطها بمخطط المحل.",
    "btnUpload": "رفع وتحليل",
    "invoiceSupplier": "المورد في الفاتورة (PDF)",
    "invoiceTotal": "إجمالي الفاتورة",
    "selectSupplier": "-- اختر المورد لربط الحساب --",
    "addDebtBtn": "إضافة كدين للمورد",
    "mappingTable": "جدول المطابقة والتوجيه",
    "tableTitle": "جدول المطابقة وتوجيه السلع للرفوف",
    "cols": {
      "ref": "الباركود (من PDF)",
      "dirtyName": "الاسم الفوضوي",
      "qty": "الكمية",
      "cleanName": "الاسم المنظم (للخريطة)",
      "shelf": "توجيه إلى الرف",
      "autoRecognized": "متعرف عليه آلياً",
      "extractSuccessWithKnown": "تم استخراج {{count}} منتج بنجاح! (تم التعرف آلياً على {{knownCount}} منتج)",
      "extractSuccessWithUnknown": "تم استخراج {{count}} منتج بنجاح! (لم يتم التعرف آلياً على {{unknownCount}} منتج)",
      "actions": "الإجراء"
    },
    "emptyState": "لم يتم رفع أي ملف PDF بعد. اضغط على الزر بالأعلى للبدء.",
    "selectShelf": "-- اختر رف الوجهة --",
    "capacity": "السعة",
    "saved": "تم الربط",
    "saveBtn": "حفظ وربط",
    "messages": {
      "extractSuccess": "تم استخراج {{count}} منتج بنجاح!",
      "extractError": "فشل في قراءة ملف الـ PDF أو أن تنسيقه غير مدعوم.",
      "systemError": "حدث خطأ أثناء الاتصال بالنظام.",
      "shelfWarning": "يرجى اختيار الرف أولاً.",
      "saveSuccess": "تم ربط وتخزين [{{name}}] بنجاح!",
      "saveError": "حدث خطأ أثناء الحفظ."
    }
  },
  "dashboard": {
    "title": "لوحة القيادة",
    "subtitle": "نظرة عامة على النظام والمؤشرات المالية",
    "quickAction": "إجراء سريع",
    "quickActionExpense": "إضافة مصروف",
    "kpi": {
      "totalDebts": "إجمالي ديون الموردين",
      "dueThisWeek": "مستحقات هذا الأسبوع",
      "activeEmployees": "العمال الحاضرين",
      "expenses": "إجمالي المصاريف"
    },
    "charts": {
      "topCreditors": "أكبر 5 دائنين",
      "expensesDist": "توزيع المصاريف"
    },
    "lists": {
      "urgentAlerts": "تنبيهات الأجندة العاجلة",
      "recentAudit": "سجل النشاطات الحديثة",
      "noAuditLogs": "لا يوجد نشاط مسجل حديثاً."
    },
    "alerts": {
      "systemTitle": "تنبيهات النظام",
      "urgentBody": "لديك {{count}} مهام مستحقة تحتاج إلى مراجعة.",
      "noTasks": "لا توجد مهام عاجلة."
    },
    "actions": {
      "payNow": "دفع الآن"
    }
  },
  "suppliers": {
    "title": "الموردين والديون",
    "subtitle": "إدارة حسابات الموردين والفواتير غير المدفوعة",
    "addSupplier": "مورد جديد",
    "searchPlaceholder": "ابحث بالاسم أو رقم الهاتف...",
    "table": {
      "name": "اسم المورد",
      "phone": "رقم الهاتف",
      "totalDebt": "إجمالي الدين",
      "status": "الحالة",
      "actions": "الإجراءات"
    },
    "status": {
      "clear": "خالص (بدون ديون)",
      "indebted": "مدين"
    },
    "actions": {
      "view": "عرض التفاصيل",
      "edit": "تعديل",
      "pay": "تسديد دفعة",
      "delete": "حذف",
      "confirmDeleteBtn": "تأكيد الحذف",
      "importSuccess": "تم استيراد {{count}} مورد بنجاح",
      "importError": "حدث خطأ أثناء استيراد الملف"
    },
    "messages": {
      "saveError": "حدث خطأ أثناء محاولة الحفظ",
      "deleteError": "حدث خطأ أثناء الحذف",
      "deleteProtected": "لا يمكن حذف هذا المورد لوجود فواتير أو دفعات مسجلة باسمه. يجب حذف حركاته المالية أولاً."
    },
    "modal": {
      "nameLabel": "اسم المورد",
      "selectSupplier": "-- اختر مورداً --"
    },
    "details": {
      "schedulePayment": "جدولة دفعة",
      "addPayment": "إضافة تسديد (دفع)",
      "addReceipt": "إضافة فاتورة (سلعة)",
      "payments": "سجل الدفعات المستحقة",
      "receipts": "سجل الفواتير المستلمة",
      "amount": "المبلغ",
      "date": "التاريخ",
      "note": "البيان / ملاحظة",
      "printReceipt": "طباعة الوصل",
      "print": "طباعة"
    }
  
  },
  "receipt": {
    "title": "وصل استلام / دفع",
    "storeName": "GHERBI.AI",
    "date": "التاريخ:",
    "time": "الوقت:",
    "cashier": "الكاشير:",
    "supplier": "المورد:",
    "amount": "المبلغ:",
    "note": "البيان:",
    "signature": "توقيع المستلم",
    "stamp": "ختم المحل",
    "footer": "شكراً لتعاملكم معنا"
  },
  "hr": {
    "title": "الموارد البشرية",
    "subtitle": "إدارة الحضور، الانصراف وسجلات العمال",
    "tabs": {
      "attendance": "تسجيل الدخول",
      "employees": "قائمة العمال"
    },
    "scanner": {
      "title": "تسجيل الدخول / الخروج",
      "placeholder": "قم بمسح الباركود أو أدخل الرمز...",
      "submit": "تسجيل"
    },
    "scannerHint": "القارئ يعمل كلوحة مفاتيح. ضع المؤشر في الحقل وقم بالمسح.",
    "attendanceLog": "سجل حركة الموظفين لليوم",
    "kpi": {
      "present": "حاضر اليوم",
      "absent": "غائب",
      "late": "متأخر"
    },
    "table": {
      "name": "اسم الموظف",
      "nameWithRole": "الموظف",
      "timeIn": "وقت الدخول",
      "timeOut": "وقت الخروج",
      "status": "الحالة",
      "loading": "جاري التحميل...",
      "emptyRecord": "لا توجد حركات تسجيل اليوم."
    },
    "status": {
      "present": "متواجد حالياً",
      "absent": "غائب",
      "late": "متأخر",
      "departed": "أنهى الدوام",
      "active": "نشط",
      "inactive": "معطل"
    },
    "roles": {
      "cashier": "بائع (كاشير)",
      "scale": "عامل ميزان",
      "stock": "ترتيبات (مخزن)",
      "admin": "مدير عام"
    },
    "messages": {
      "checkIn": "تم تسجيل الدخول",
      "checkOut": "تم تسجيل الخروج",
      "error": "حدث خطأ أثناء المعالجة."
    },
    "employees": {
      "addBtn": "إضافة موظف",
      "search": "بحث عن موظف...",
      "empty": "لا يوجد موظفين مسجلين.",
      "softDeleted": "تم تعطيل الحساب لحماية سجلاته المالية.",
      "deleteConfirmMsg": "هل أنت متأكد من حذف الحساب الإداري للمستخدم: {{name}}؟",
      "table": {
        "name": "الاسم الكامل",
        "role": "المنصب",
        "status": "الحالة",
        "actions": "الإجراءات"
      },
      "actions": {
        "edit": "تعديل",
        "delete": "حذف"
      }
    },
    "dialog": {
      "title": "إضافة موظف جديد",
      "editTitle": "تعديل بيانات الموظف",
      "desc": "أدخل تفاصيل الموظف ورمز PIN السري.",
      "name": "الاسم الكامل",
      "namePlaceholder": "محمد أمين...",
      "role": "المنصب",
      "rolePlaceholder": "اختر منصباً",
      "pin": "رمز PIN",
      "cancel": "إلغاء",
      "save": "حفظ بيانات الموظف",
      "saveChanges": "حفظ التعديلات"
    }
  },
  "expenses": {
    "title": "المصاريف والسلف",
    "subtitle": "تتبع كل الحركات المالية الخارجة من الصناديق",
    "allCaisses": "كل الصناديق",
    "adminCaisse": "صندوق المدير (الرئيسي)",
    "cashierCaisse": "صندوق الكاشير: {{name}}",
    "addExpense": "إضافة مصروف",
    "editExpense": "تعديل المصروف",
    "saveChanges": "حفظ التعديلات",
    "cashierNotice": "أنت تشاهد فقط المصاريف والمدفوعات التي تمت من صندوقك ({{name}}).",
    "kpi": {
      "today": "مصاريف اليوم",
      "month": "مصاريف الشهر"
    },
    "table": {
      "date": "التاريخ",
      "description": "البيان / الوصف",
      "category": "التصنيف",
      "amount": "المبلغ",
      "locked": "مقفل"
    },
    "caisseSourceLabel": "مصدر الأموال",
    "dateLabel": "التاريخ",
    "deleteConfirm": "هل أنت متأكد من حذف هذا المصروف؟",
    "myAdvance": "سلفتي الشخصية",
    "categories": {
      "utilities": "فواتير وخدمات",
      "maintenance": "صيانة وإصلاح",
      "supplies": "مستلزمات المتجر",
      "advance": "سلفة عامل",
      "supplier_payment": "تسديد مورد",
      "salaries": "رواتب العمال",
      "رواتب": "رواتب العمال"
    }
  },
  "payroll": {
    "title": "رواتب العمال",
    "subtitle": "إدارة وحساب الرواتب والخصومات",
    "tabs": {
      "calculator": "حاسبة الراتب",
      "advances": "سجل السلفيات",
      "salaries": "أرشيف الرواتب"
    },
    "exportReportWord": "استخراج الراتب الكلي",
    "selectEmployee": "اختر الموظف",
    "hourlyRate": "سعر الساعة",
    "period": "الفترة",
    "overlap": "لا يمكن الحساب! لقد تم دفع راتب لهذا الموظف في فترة متداخلة (من {{start}} إلى {{end}}).",
    "totalHours": "إجمالي الساعات",
    "grossSalary": "الراتب الإجمالي",
    "deductions": "الخصومات (سلف)",
    "netSalary": "الصافي للدفع",
    "payslip": "كشف راتب موظف",
    "comprehensiveReport": "سجل الرواتب والحضور المفصل",
    "totalEmployees": "إجمالي الموظفين",
    "rolloverNote": "ترحيل ديون سلفيات ({{start}} إلى {{end}})",
    "expenseNote": "راتب: {{name}} ({{start}} إلى {{end}})",
    "accountantSig": "توقيع المستلم",
    "calculateBtn": "حساب الراتب",
    "from": "من",
    "to": "إلى",
    "emptyState": "أدخل بيانات الموظف واضغط على 'حساب الراتب' لظهور النتيجة",
    "payAndSave": "دفع الراتب وحفظ",
    "addAdvance": "إضافة سلفة",
    "exportWord": "استخراج سجل الرواتب (Word)",
    "exportPayslipWord": "استخراج كملف Word",
    "advanceStatus": {
      "pending": "غير مسددة",
      "paid": "تم الخصم"
    },
    "modal": {
      "addAdvance": "تسجيل سلفة موظف",
      "editAdvance": "تعديل السلفة",
      "amount": "المبلغ",
      "fundSource": "مصدر الأموال",
      "note": "ملاحظة",
      "notePlaceholder": "سبب السلفة...",
      "saveAdvance": "حفظ السلفة"
    },
    "confirmPay": {
      "title": "تأكيد دفع الراتب",
      "rollover": "الراتب الصافي بالسالب. سيتم ترحيل الديون المتبقية كسلفة جديدة للشهر القادم. هل تود الاستمرار؟",
      "standard": "سيتم صرف مبلغ {{amount}} من صندوق الإدارة. هل تود تأكيد الدفع؟",
      "confirmBtn": "نعم، تأكيد الدفع"
    },
    "deleteAdvance": {
      "title": "إلغاء السلفة",
      "message": "هل أنت متأكد من إلغاء وحذف هذه السلفة؟ سيتم إرجاع المبلغ للصندوق الذي خُصمت منه.",
      "confirmBtn": "نعم، حذف السلفة"
    },
    "table": {
      "date": "التاريخ",
      "employee": "الموظف",
      "amount": "المبلغ",
      "source": "المصدر (الصندوق)",
      "status": "الحالة",
      "actions": "الإجراءات"
    },
    "errors": {
      "advanceNotFound": "سجل السلفة غير موجود."
    }
  },
  "agenda": {
    "title": "الأجندة والمهام",
    "subtitle": "إدارة المواعيد، التوريدات، والمدفوعات المجدولة",
    "addTask": "إضافة مهمة",
    "allDay": "طوال اليوم",
    "rescheduleTask": "تأجيل المهمة",
    "deleteConfirm": "هل أنت متأكد من حذف هذه المهمة من الأجندة؟",
    "sections": {
      "overdue": "مهام متأخرة",
      "today": "مهام اليوم",
      "upcoming": "مهام قادمة"
    },
    "filters": {
      "all": "الكل",
      "pending": "قيد الانتظار",
      "completed": "مكتملة"
    },
    "types": {
      "delivery": "استلام سلعة",
      "payment": "تسديد دفعة",
      "maintenance": "صيانة دورية"
    },
    "modal": {
      "taskTitleLabel": "عنوان المهمة",
      "taskTypeLabel": "نوع المهمة",
      "dateLabel": "التاريخ",
      "timeLabel": "الوقت",
      "cancelBtn": "إلغاء",
      "saveBtn": "حفظ المهمة"
    }
  },
  "eod": {
    "title": "صندوق الكاشير",
    "store_name": "متجري (MY STORE)",
    "active_shift": "الوردية المفتوحة حالياً",
    "open_shift_title": "فتح الصندوق (بداية الوردية)",
    "open_shift_desc": "أنت على وشك بدء وردية عمل باسم:",
    "opening_balance": "رصيد بداية اليوم (فوندوكاس)",
    "open_shift_btn": "فتح الوردية",
    "total_deducted": "المسحوبات",
    "advances": "سلفيات",
    "supplier_payments": "مدفوعات",
    "actual_cash": "المبلغ الفعلي في الدرج",
    "notes": "ملاحظات الإغلاق",
    "notesPlaceholder": "سجل أي فوارق مالية أو ملاحظات هنا...",
    "today_sales": "المبيعات الصافية",
    "save_btn": "حفظ وإغلاق الدرج",
    "confirmClose": "هل أنت متأكد من حفظ الإغلاق؟ لا يمكن التراجع.",
    "close_day_btn": "ترحيل اليومية (Z-Report)",
    "close_day_confirm": "سيتم إغلاق يوم العمل بالكامل وأرشفة الورديات. هل تود الاستمرار؟",
    "grandTotalOpening": "إجمالي الفوندوكاس",
    "grandTotalActual": "إجمالي النقد الفعلي",
    "grandTotalSales": "إجمالي المبيعات",
    "allShifts": "ورديات اليوم",
    "cashierName": "الكاشير",
    "statusOpen": "مفتوحة",
    "statusClosed": "مغلقة",
    "timing": "التوقيت",
    "masterDashboardTitle": "لوحة المراقبة الشاملة",
    "masterDashboardDesc": "مراقبة وإغلاق الورديات اليومية",
    "print_receipt": "طباعة الوصل",
    "x_report": "تقرير الوردية (X-REPORT)",
    "time_out": "وقت الخروج",
    "receipt_footer": "احتفظ بهذا الوصل للمراجعة الإدارية."
  },
  "zreport": {
    "title": "التقرير الختامي لليوم (Z-REPORT)",
    "archive_title": "أرشيف اليوميات",
    "archive_desc": "سجل الأيام المغلقة والترحيلات المالية السابقة",
    "date": "تاريخ التقرير:",
    "closed_by": "تم الإغلاق بواسطة:",
    "summary": "الملخص المالي لليوم",
    "opening": "إجمالي الافتتاح",
    "net_sales": "صافي المبيعات",
    "actual_cash": "إجمالي الصندوق الفعلي",
    "shifts_details": "تفاصيل الورديات (الكاشيرات)",
    "cashier": "الكاشير",
    "time_in": "الدخول",
    "time_out": "الخروج",
    "deductions": "مسحوبات",
    "sales": "المبيعات",
    "actual_drawer": "الدرج الفعلي",
    "not_closed": "لم تغلق",
    "manager_sig": "توقيع الإدارة / الختم",
    "company_seal": "ختم المحل"
  },
  "pos": {
    "title": "نقطة البيع",
    "scanPlaceholder": "مرر الباركود هنا...",
    "cart": "سلة المشتريات",
    "emptyCart": "السلة فارغة",
    "perUnit": "للوحدة",
    "total": "الإجمالي",
    "pay": "دفع وتأكيد"
  },
  "settings": {
    "title": "إعدادات النظام",
    "subtitle": "إدارة المستخدمين وقاعدة البيانات",
    "newUser": "إنشاء حساب مستخدم",
    "username": "اسم المستخدم",
    "password": "كلمة المرور",
    "role": "الصلاحية",
    "addAccountBtn": "إنشاء الحساب",
    "loading": "جاري تحميل المستخدمين...",
    "table": {
      "username": "المستخدم",
      "role": "الصلاحية",
      "actions": "الإجراءات"
    },
    "noUsers": "لا يوجد مستخدمين.",
    "deleteTooltip": "حذف المستخدم",
    "deleteConfirm": "هل أنت متأكد من حذف حساب المستخدم: {{name}}؟",
    "deleteAlert": "لا يمكنك حذف هذا الحساب (حساب رئيسي أو حسابك الحالي).",
    "deleteError": "فشل في حذف المستخدم.",
    "addError": "خطأ في إنشاء الحساب، قد يكون الاسم موجوداً.",
    "errorFillFields": "يرجى ملء جميع الحقول.",
    "accessDenied": "عذراً، صلاحيات وصول مرفوضة.",
    "modal": {
      "title": "إعدادات المتجر",
      "storeNameLabel": "اسم المتجر",
      "storeNamePlaceholder": "أدخل اسم المتجر...",
      "saveBtn": "حفظ الإعدادات",
      "saveSuccess": "تم حفظ التغييرات بنجاح!"
    }
  },
  "database": {
    "title": "إدارة قاعدة البيانات",
    "backup": "حفظ نسخة احتياطية",
    "backupDesc": "قم بتأمين بياناتك باستخراج نسخة احتياطية كاملة.",
    "restore": "استرجاع البيانات",
    "restoreDesc": "استعادة النظام من نسخة احتياطية سابقة.",
    "messages": {
      "backupSuccess": "تم أخذ النسخة الاحتياطية بنجاح.",
      "restoreSuccess": "تم استعادة البيانات بنجاح! سيتم إعادة تشغيل التطبيق.",
      "restoreConfirm": "هل أنت متأكد؟ استرجاع البيانات سيمسح البيانات الحالية بالكامل.",
      "invalidFile": "الملف المختار غير صالح! يرجى اختيار ملف قاعدة بيانات صحيح (.db أو .sqlite).",
      "error": "حدث خطأ أثناء العملية."
    }
  },
  "audit": {
    "subtitle": "مراقبة وتتبع جميع حركات النظام والمستخدمين",
    "actions": {
      "all": "كل العمليات",
      "DELETE_EXPENSE": "حذف مصروف"
    },
    "details": {
      "DELETE_EXPENSE": "قام بحذف مصروف: {{desc}} بقيمة ({{amount}})"
    }
  },
  "login": {
    "title": "تسجيل الدخول",
    "subtitle": "الرجاء إدخال بيانات حسابك",
    "username": "اسم المستخدم",
    "password": "كلمة المرور",
    "loading": "جاري التحقق...",
    "submit": "دخول",
    "error": "اسم المستخدم أو كلمة المرور غير صحيحة.",
    "serverError": "فشل الاتصال بقاعدة البيانات."
  },
  "backendErrors": {
    "shiftAlreadyOpen": "لديك وردية مفتوحة بالفعل، يرجى إغلاقها أولاً.",
    "invalidCredentials": "اسم المستخدم أو كلمة المرور خاطئة.",
    "invalidPinOrInactive": "الرمز غير صحيح أو الحساب معطل.",
    "alreadyCompletedShift": "لقد قمت بتسجيل الدخول والخروج مسبقاً لهذا اليوم.",
    "has_open_shifts": "لا يمكن الترحيل: توجد ورديات كاشير لم تُغلق بعد.",
    "no_shifts_to_close": "لا توجد أي ورديات مفتوحة أو مغلقة لترحيلها."
  },
  "activation": {
  "title": "تفعيل النظام",
  "subtitle": "هذه النسخة غير مفعلة. يرجى إرسال رقم الجهاز للمطور للحصول على مفتاح التفعيل.",
  "machineId": "رقم الجهاز (Machine ID)",
  "licenseKey": "مفتاح التفعيل (License Key)",
  "btn": "تفعيل البرنامج",
  "emptyKey": "الرجاء إدخال مفتاح التفعيل!",
  "invalidKey": "مفتاح التفعيل غير صحيح، تأكد من نسخه بشكل كامل.",
  "error": "حدث خطأ أثناء الاتصال بالنظام."
},
"badge": {
      "printBtn": "بطاقة موظف",
      "modalTitle": "إصدار بطاقة الدخول (Barcode)",
      "modalDesc": "أدخل الرمز السري للموظف لتحويله إلى باركود قابل للطباعة والمسح الضوئي.",
      "searchPlaceholder": "أدخل رمز PIN...",
      "notFound": "لم يتم العثور على موظف بهذا الرمز!",
      "printExecute": "طباعة",
      "downloadPDF": "استخراج PDF",
      "idCard": "بطاقة تعريف الموظف",
      "scanInstruction": "يرجى مسح هذا الباركود عند الدخول والخروج."
    }
}
```

---

## `frontend\src\locales\en\translation.json`

```json
{
  "currency": "DA",
  "common": {
    "search": "Search...",
    "superAdmin": "Manager",
    "systemOwner": "System Owner",
    "success": "Operation completed successfully!",
    "error": "An unexpected error occurred.",
    "networkError": "Network connection error.",
    "serverOnlyFeature": "This feature is only available on the main server.",
    "close": "Close",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "refresh": "Refresh",
    "loading": "Loading...",
    "noResults": "No records found.",
    "all": "All",
    "from": "From",
    "to": "To",
    "save": "Save",
    "delete": "Delete",
    "deleteSuccess": "Deleted successfully",
    "selectOption": "-- Select an option --",
    "optional": "Optional",
    "saveChanges": "Save Changes"
  },
  "sidebar": {
    "dashboard": "Dashboard",
    "suppliers": "Suppliers & Debts",
    "hr": "HR & Staff",
    "expenses": "Expenses",
    "payroll": "Payroll",
    "agenda": "Agenda",
    "auditLogs": "Audit Logs",
    "end_of_day": "Cash Register",
    "settings": "Settings",
    "storeMap": "3D Store Map",
    "pdfImporter": "Import Invoices (PDF)"
  },
"storeMap": {
    "title": "Interactive Store Map",
    "subtitle": "Drag tools, design aisles, and set up shelves to auto-receive PDF items",
    "toolbox": "Toolbox",
    "dragHint": "Drag me to the map",
    "canvasHint": "Store Front (Entrance)",
    "properties": "Item Properties",
    "propType": "Type",
    "propName": "Shelf Name (For auto-linking)",
    "propCapacity": "Max Capacity (For full alerts)",
    "emptyProps": "Click any tool on the map to edit its properties.",
    "gridSettings": "Store Area Settings",
    "gridRows": "Depth (Rows)",
    "gridCols": "Width (Columns)",
    "manageInventoryBtn": "Manage Products & Categories",
    "inventoryModalTitle": "Item Contents:",
    "categorySelect": "Select Predefined Category",
    "addCategoryBtn": "Add",
    "customCategoryPlaceholder": "Or type a custom category...",
    "emptyInventory": "This shelf is currently empty.",
    "occupiedError": "Space is already occupied!",
    "capacityError": "Shelf capacity exceeded!",
    "tools": {
      "shelf": "Gondola Shelf",
      "fridge": "Dairy Fridge",
      "freezer": "Meat Freezer",
      "cashier": "POS Cashier",
      "wall": "Wall / Divider"
    },
    "clearBtn": "Clear All",
    "saveBtn": "Save & Apply Map",
    "rotateBtn": "Rotate",
    "confirmClear": "Are you sure you want to clear the entire map?",
    "saveSuccess": "Map saved successfully! Shelves are ready for PDF imports.",
    "newLayout": "New Layout {{count}}",
    "saveBeforeActivate": "Please save the layout first before setting it as active!",
    "activateSuccess": "This layout is now set as the main map for receiving invoices.",
    "confirmDeleteLayout": "Are you sure you want to permanently delete this layout?",
    "layoutNamePlaceholder": "Layout Name...",
    "activeLayoutBadge": "Active Main Layout",
    "setAsActive": "Set as Active",
    "linkedCategories": "Categories linked to this shelf:",
    "customCategoryExample": "e.g., Imported Cat Food...",
    "predefinedCategories": [
      "Pasta & Noodles", "Vegetable Oils", "Sugar & Flour", "Coffee & Tea", "Spices",
      "Canned Goods", "Beverages & Juices", "Biscuits & Sweets", "Dairy & Cheese", "Frozen Meats",
      "Personal Care", "Cleaning Supplies"
    ],
    "addCustomTool": "New Tool",
    "customToolModalTitle": "Create Custom Tool",
    "toolNameLabel": "Tool Name (e.g., Promo Stand, Veggie Basket)",
    "toolNamePlaceholder": "Type tool name here...",
    "chooseIcon": "Select Icon",
    "chooseColor": "Select Color",
    "confirmTool": "Save Tool",
    "toolNameRequired": "Please enter a tool name",
    "modal": {
      "storedProducts": "Products stored in this shelf (Inventory):",
      "loadingProducts": "Loading products...",
      "noProducts": "No products are currently stored in this shelf.",
      "productName": "Product",
      "quantity": "Quantity",
      "actions": "Actions",
      "edit": "Edit",
      "delete": "Delete",
      "save": "Save",
      "cancel": "Cancel"
    },
"catGroups": {
      "grocery": "Groceries (Dry Foods)",
      "dairy": "Dairy & Cheese (Fridges)",
      "drinks": "Beverages & Juices",
      "cleaning": "Cleaning Supplies",
      "personalCare": "Personal Care & Cosmetics",
      "snacks": "Sweets & Snacks",
      "pets": "Pet Supplies & Food"
    },
    "catItems": {
      "grocery": ["Canned Goods (Tuna, Tomatoes)", "Pasta & Noodles", "Legumes (Lentils, Beans)", "Sugar & Salt", "Flour & Semolina", "Oils & Ghee", "Spices & Herbs"],
      "dairy": ["Milk", "Various Cheeses", "Yogurt", "Butter & Margarine", "Cooking Creams"],
      "drinks": ["Mineral Water", "Natural Juices", "Sodas", "Energy Drinks", "Coffee & Tea", "Instant Hot Drinks"],
      "cleaning": ["Laundry Detergents", "Dishwashing Liquids", "Air Fresheners", "Floor & Glass Cleaners", "Insecticides"],
      "personalCare": ["Shampoo & Conditioner", "Soap & Shower Gel", "Toothpaste & Brushes", "Skin Care & Creams", "Diapers & Tissues"],
      "snacks": ["Biscuits & Cakes", "Chocolate", "Chips & Crackers", "Gum & Chewy Candies"],
      "pets": ["Cat Food", "Dog Food", "Cat Litter & Accessories"]
    },
    "catLabels": {
      "selectCategory": "-- Select a main category --",
      "catName": "Category Name",
      "catDesc": "Shelf Description (optional)",
      "catDescPlaceholder": "e.g., Tuna, Tomatoes, Mushrooms...",
      "addSuccess": "Category added to shelf successfully!",
      "addNewCategoryTitle": "Add New Categories to Shelf",
      "addCategoryBtn": "Add this category to shelf"
    },
    "manualAdd": {
      "title": "Manually Add Product to Shelf",
      "productName": "Product Name",
      "productNamePlaceholder": "e.g., Gold Tuna...",
      "quantity": "Quantity",
      "addBtn": "Add",
      "success": "Product added manually successfully!"
    }
  }
  ,
  "pdfImporter": {
    "title": "Smart Importer (PDF)",
    "subtitle": "Upload delivery notes to extract items and link them to the store map.",
    "btnUpload": "Upload & Analyze",
    "invoiceSupplier": "Supplier on Invoice (PDF)",
    "invoiceTotal": "Total Invoice",
    "selectSupplier": "-- Select supplier to link account --",
    "addDebtBtn": "Add as debt to supplier",
    "mappingTable": "Mapping and Allocation Table",
    "tableTitle": "Matching Table and Product Routing",
    "cols": {
      "ref": "Barcode (from PDF)",
      "dirtyName": "Dirty Name",
      "qty": "Quantity",
      "cleanName": "Clean Name (for Map)",
      "shelf": "Route to Shelf",
      "autoRecognized": "Automatically Recognized",
      "extractSuccessWithKnown": "Successfully extracted {{count}} products! ({{knownCount}} recognized automatically)",
      "extractSuccessWithUnknown": "Successfully extracted {{count}} products! ({{unknownCount}} not recognized automatically)",
      "actions": "Action",
      "pdfImporter": "PDF Importer"
    },
    "emptyState": "No PDF files uploaded yet. Click the button above to get started.",
    "selectShelf": "-- Select Destination Shelf --",
    "capacity": "Capacity",
    "saved": "Linked",
    "saveBtn": "Save and Link",
    "messages": {
      "extractSuccess": "{{count}} products extracted successfully!",
      "extractError": "Failed to read the PDF file or its format is not supported.",
      "systemError": "An error occurred while connecting to the system.",
      "shelfWarning": "Please select a shelf first.",
      "saveSuccess": "[{{name}}] linked and stored successfully!",
      "saveError": "An error occurred while saving."
    }
  },
  "dashboard": {
    "title": "Dashboard",
    "subtitle": "System overview & financial metrics",
    "quickAction": "Quick Action",
    "quickActionExpense": "Add Expense",
    "kpi": {
      "totalDebts": "Total Supplier Debts",
      "dueThisWeek": "Due This Week",
      "activeEmployees": "Active Staff",
      "expenses": "Total Expenses"
    },
    "charts": {
      "topCreditors": "Top Creditors",
      "expensesDist": "Expenses Distribution"
    },
    "lists": {
      "urgentAlerts": "Urgent Tasks",
      "recentAudit": "Recent Activities",
      "noAuditLogs": "No recent activities recorded."
    },
    "alerts": {
      "systemTitle": "System Alerts",
      "urgentBody": "You have {{count}} urgent pending tasks.",
      "noTasks": "No urgent tasks."
    },
    "actions": {
      "payNow": "Pay Now"
    }
  },
"suppliers": {
    "title": "Suppliers",
    "subtitle": "Manage supplier accounts and invoices",
    "addSupplier": "New Supplier",
    "searchPlaceholder": "Search by name or phone...",
    "table": {
      "name": "Supplier Name",
      "phone": "Phone",
      "totalDebt": "Total Debt",
      "status": "Status",
      "actions": "Actions"
    },
    "status": {
      "clear": "Cleared",
      "indebted": "In Debt"
    },
    "actions": {
      "view": "View",
      "edit": "Edit",
      "pay": "Pay",
      "delete": "Delete",
      "confirmDeleteBtn": "Confirm Delete",
      "importSuccess": "Successfully imported {{count}} suppliers",
      "importError": "Error importing from Excel"
    },
    "messages": {
      "saveError": "Error saving supplier",
      "deleteError": "Error deleting supplier",
      "deleteProtected": "Cannot delete this supplier because there are linked receipts or payments. Please delete them first."
    },
    "modal": {
      "nameLabel": "Supplier Name",
      "selectSupplier": "-- Select a supplier --"
    },
    "details": {
      "schedulePayment": "Schedule Payment",
      "addPayment": "Add Payment",
      "addReceipt": "Add Receipt (Items)",
      "payments": "Payments History",
      "receipts": "Receipts History",
      "amount": "Amount",
      "date": "Date",
      "note": "Statement / Note",
      "printReceipt": "Print Receipt",
      "print": "Print"
    }
  
  },
"receipt": {
    "title": "Receipt",
    "storeName": "GHERBI.AI",
    "date": "Date:",
    "time": "Time:",
    "cashier": "Cashier:",
    "supplier": "Supplier:",
    "amount": "Amount:",
    "note": "Note:",
    "signature": "Manager Signature",
    "stamp": "Store Stamp",
    "footer": "Thank you for your visit"
  },
  "hr": {
    "title": "Human Resources",
    "subtitle": "Manage staff attendance and shifts",
    "tabs": {
      "attendance": "Terminal",
      "employees": "Employees"
    },
    "scanner": {
      "title": "Check In / Out",
      "placeholder": "Scan Barcode or Enter PIN...",
      "submit": "Submit"
    },
    "scannerHint": "Scanner acts as a keyboard. Focus field and scan.",
    "attendanceLog": "Today's Attendance Log",
    "kpi": {
      "present": "Present",
      "absent": "Absent",
      "late": "Late"
    },
    "table": {
      "name": "Employee",
      "nameWithRole": "Employee / Role",
      "timeIn": "Time In",
      "timeOut": "Time Out",
      "status": "Status",
      "loading": "Loading data...",
      "emptyRecord": "No attendance records for today."
    },
    "status": {
      "present": "Present",
      "absent": "Absent",
      "late": "Late",
      "departed": "Departed",
      "active": "Active",
      "inactive": "Inactive"
    },
    "roles": {
      "cashier": "Cashier",
      "scale": "Scale Worker",
      "stock": "Stock Worker",
      "admin": "Manager"
    },
    "messages": {
      "checkIn": "Checked IN",
      "checkOut": "Checked OUT",
      "error": "Error processing request."
    },
    "employees": {
      "addBtn": "Add Employee",
      "search": "Search employees...",
      "empty": "No employees found.",
      "softDeleted": "Account disabled to preserve financial records.",
      "deleteConfirmMsg": "Are you sure you want to delete the account for: {{name}}?",
      "table": {
        "name": "Full Name",
        "role": "Role",
        "status": "Status",
        "actions": "Actions"
      },
      "actions": {
        "edit": "Edit",
        "delete": "Delete"
      }
    },
    "dialog": {
      "title": "New Employee",
      "editTitle": "Edit Employee",
      "desc": "Enter employee details and secret PIN.",
      "name": "Full Name",
      "namePlaceholder": "John Doe...",
      "role": "Role",
      "rolePlaceholder": "Select a role",
      "pin": "PIN Code",
      "cancel": "Cancel",
      "save": "Save Employee",
      "saveChanges": "Save Changes"
    }
  },
  "expenses": {
    "title": "Expenses",
    "subtitle": "Track all store outflows and advances",
    "allCaisses": "All Registers",
    "adminCaisse": "Main Register (Admin)",
    "cashierCaisse": "Register: {{name}}",
    "addExpense": "Add Expense",
    "editExpense": "Edit Expense",
    "saveChanges": "Save Changes",
    "cashierNotice": "Viewing records for your register ({{name}}) only.",
    "kpi": {
      "today": "Today's Outflows",
      "month": "Monthly Outflows"
    },
    "table": {
      "date": "Date",
      "description": "Description",
      "category": "Category",
      "amount": "Amount",
      "locked": "Locked"
    },
    "caisseSourceLabel": "Fund Source",
    "dateLabel": "Date",
    "deleteConfirm": "Are you sure you want to delete this expense record?",
    "myAdvance": "My Personal Advance",
    "categories": {
      "utilities": "Bills & Utilities",
      "maintenance": "Maintenance",
      "supplies": "Store Supplies",
      "advance": "Staff Advance",
      "supplier_payment": "Supplier Payment",
      "salaries": "Payroll",
      "رواتب": "Payroll"
    }
  },
  "payroll": {
    "title": "Payroll",
    "subtitle": "Manage staff salaries and advances",
    "tabs": {
      "calculator": "Calculator",
      "advances": "Advances",
      "salaries": "Salaries History"
    },
    "exportReportWord": "Export Report (Word)",
    "selectEmployee": "Select Employee",
    "overlap": "Cannot calculate! A salary was already paid for this employee in an overlapping period (from {{start}} to {{end}}).",
    "hourlyRate": "Hourly Rate",
    "period": "Period",
    "totalHours": "Total Hours",
    "grossSalary": "Gross Salary",
    "deductions": "Advances / Deductions",
    "netSalary": "Net Salary",
    "payslip": "Payslip",
    "comprehensiveReport": "Comprehensive Payroll Report",
    "totalEmployees": "Total Employees",
    "rolloverNote": "Debt rollover from {{start}} to {{end}}",
    "expenseNote": "Salary: {{name}} ({{start}} to {{end}})",
    "accountantSig": "Employee Signature",
    "calculateBtn": "Calculate Salary",
    "from": "From",
    "to": "To",
    "emptyState": "Enter employee details and click 'Calculate Salary' to see results",
    "payAndSave": "Pay & Save",
    "addAdvance": "Add Advance",
    "exportWord": "Export Payroll (Word)",
    "exportPayslipWord": "Export Word",
    "advanceStatus": {
      "pending": "Unpaid",
      "paid": "Deducted"
    },
    "modal": {
      "addAdvance": "Record Advance",
      "editAdvance": "Edit Advance",
      "amount": "Amount",
      "fundSource": "Fund Source",
      "note": "Note",
      "notePlaceholder": "Reason for advance...",
      "saveAdvance": "Save Advance"
    },
    "confirmPay": {
      "title": "Confirm Salary Payment",
      "rollover": "The net salary is negative. The remaining debt will be rolled over as a new advance for next month. Do you want to proceed?",
      "standard": "An amount of {{amount}} will be paid from the administration fund. Confirm payment?",
      "confirmBtn": "Yes, Confirm Payment"
    },
    "deleteAdvance": {
      "title": "Cancel Advance",
      "message": "Are you sure you want to cancel and delete this advance? The amount will be returned to the fund it was deducted from.",
      "confirmBtn": "Yes, Delete Advance"
    },
    "table": {
      "date": "Date",
      "employee": "Employee",
      "amount": "Amount",
      "source": "Source (Register)",
      "status": "Status",
      "actions": "Actions"
    },
    "errors": {
      "advanceNotFound": "Advance record not found."
    }
  },
  "agenda": {
    "title": "Agenda & Tasks",
    "subtitle": "Manage schedule and due payments",
    "addTask": "New Task",
    "allDay": "All Day",
    "rescheduleTask": "Reschedule",
    "deleteConfirm": "Are you sure you want to delete this task?",
    "sections": {
      "overdue": "Overdue",
      "today": "Today",
      "upcoming": "Upcoming"
    },
    "filters": {
      "all": "All",
      "pending": "Pending",
      "completed": "Completed"
    },
    "types": {
      "delivery": "Delivery",
      "payment": "Payment",
      "maintenance": "Maintenance"
    },
    "modal": {
      "taskTitleLabel": "Task Title",
      "taskTypeLabel": "Type",
      "dateLabel": "Date",
      "timeLabel": "Time",
      "cancelBtn": "Cancel",
      "saveBtn": "Save Task"
    }
  },
  "eod": {
    "title": "Register / POS",
    "store_name": "MY STORE",
    "active_shift": "Active Shift",
    "open_shift_title": "Open Register",
    "open_shift_desc": "Start new shift as:",
    "opening_balance": "Opening Balance",
    "open_shift_btn": "Open Shift",
    "total_deducted": "Total Deductions",
    "advances": "Advances",
    "supplier_payments": "Payments",
    "actual_cash": "Actual Cash in Drawer",
    "notes": "Notes",
    "notesPlaceholder": "Any discrepancies or notes...",
    "today_sales": "Shift Net Sales",
    "save_btn": "Close Shift",
    "confirmClose": "Are you sure you want to close this shift?",
    "close_day_btn": "Close Business Day (Z-Report)",
    "close_day_confirm": "This will close the business day and archive all shifts. Proceed?",
    "grandTotalOpening": "Total Opening",
    "grandTotalActual": "Total Cash",
    "grandTotalSales": "Total Net Sales",
    "allShifts": "Today's Shifts",
    "cashierName": "Cashier",
    "statusOpen": "Open",
    "statusClosed": "Closed",
    "timing": "Timing",
    "masterDashboardTitle": "End of Day (EOD)",
    "masterDashboardDesc": "Monitor and close daily shifts",
    "print_receipt": "Print Receipt",
    "x_report": "X-REPORT (Shift)",
    "time_out": "Time Out",
    "receipt_footer": "Keep this receipt for your records."
  },
  "zreport": {
    "title": "Z-REPORT (End of Day)",
    "archive_title": "Z-Reports Archive",
    "archive_desc": "History of closed days and financial transfers",
    "date": "Report Date:",
    "closed_by": "Closed By:",
    "summary": "Financial Summary",
    "opening": "Opening Cash",
    "net_sales": "Net Sales",
    "actual_cash": "Actual Drawer Cash",
    "shifts_details": "Shifts Details",
    "cashier": "Cashier",
    "time_in": "In",
    "time_out": "Out",
    "deductions": "Deductions",
    "sales": "Sales",
    "actual_drawer": "Actual Cash",
    "not_closed": "Not Closed",
    "manager_sig": "Manager Signature",
    "company_seal": "Company Seal"
  },
  "pos": {
    "title": "Point of Sale",
    "scanPlaceholder": "Scan barcode...",
    "cart": "Shopping Cart",
    "emptyCart": "Cart is empty",
    "perUnit": "per unit",
    "total": "Total",
    "pay": "Pay"
  },
  "settings": {
    "title": "System Settings",
    "subtitle": "Manage users and database",
    "newUser": "Create New User",
    "username": "Username",
    "password": "Password",
    "role": "Role",
    "addAccountBtn": "Create Account",
    "loading": "Loading users...",
    "table": {
      "username": "Username",
      "role": "Role",
      "actions": "Actions"
    },
    "noUsers": "No users found.",
    "deleteTooltip": "Delete User",
    "deleteConfirm": "Are you sure you want to delete user: {{name}}?",
    "deleteAlert": "You cannot delete this user.",
    "deleteError": "Failed to delete user.",
    "addError": "Failed to add user.",
    "errorFillFields": "Please fill all fields.",
    "accessDenied": "Access Denied.",
    "modal": {
      "title": "Store Settings",
      "storeNameLabel": "Store Name",
      "storeNamePlaceholder": "Enter store name",
      "saveBtn": "Save",
      "saveSuccess": "Settings saved successfully."
    }
  },
  "database": {
    "title": "Database Management",
    "backup": "Backup Database",
    "backupDesc": "Create a secure backup file of all your data.",
    "restore": "Restore Database",
    "restoreDesc": "Restore data from a previous backup file.",
    "messages": {
      "backupSuccess": "Backup created successfully.",
      "restoreSuccess": "Database restored! App will restart.",
      "restoreConfirm": "Are you sure? Current data will be replaced.",
      "invalidFile": "The selected file is invalid! Please choose a valid database file (.db or .sqlite).",
      "error": "Database operation failed."
    }
  },
  "audit": {
    "subtitle": "Track all system activities",
    "actions": {
      "all": "All Actions",
      "DELETE_EXPENSE": "Expense Deleted"
    },
    "details": {
      "DELETE_EXPENSE": "Deleted expense: {{desc}} ({{amount}})"
    }
  },
  "login": {
    "title": "Welcome Back",
    "subtitle": "Please log in to your account",
    "username": "Username",
    "password": "Password",
    "loading": "Authenticating...",
    "submit": "Login",
    "error": "Invalid credentials.",
    "serverError": "Server connection failed."
  },
  "backendErrors": {
    "shiftAlreadyOpen": "You already have an open shift.",
    "invalidCredentials": "Wrong username or password.",
    "invalidPinOrInactive": "Invalid PIN or account disabled.",
    "alreadyCompletedShift": "Shift already completed for today.",
    "has_open_shifts": "Cannot close day: Active shifts exist.",
    "no_shifts_to_close": "No shifts available to close."
  },
  "activation": {
  "title": "System Activation",
  "subtitle": "This version is not activated. Please send the Machine ID to the developer to receive your license key.",
  "machineId": "Machine ID",
  "licenseKey": "License Key",
  "btn": "Activate System",
  "emptyKey": "Please enter the license key!",
  "invalidKey": "Invalid license key, please check your entry.",
  "error": "An error occurred while connecting to the system."
},
"badge": {
      "printBtn": "Employee Badge",
      "modalTitle": "Issue Access Badge (Barcode)",
      "modalDesc": "Enter the employee PIN to generate a printable barcode.",
      "searchPlaceholder": "Enter PIN code...",
      "notFound": "No employee found with this PIN!",
      "printExecute": "Print",
      "downloadPDF": "Download PDF",
      "idCard": "EMPLOYEE ID CARD",
      "scanInstruction": "Please scan this barcode upon entry and exit."
    }
  }

```

---

## `frontend\src\locales\fr\translation.json`

```json
{
  "currency": "DA",
  "common": {
    "search": "Rechercher...",
    "superAdmin": "Gérant",
    "systemOwner": "Propriétaire",
    "success": "Opération réussie !",
    "error": "Une erreur inattendue s'est produite.",
    "networkError": "Erreur de connexion réseau.",
    "serverOnlyFeature": "Cette fonctionnalité n'est disponible que sur le serveur principal.",
    "close": "Fermer",
    "cancel": "Annuler",
    "confirm": "Confirmer",
    "refresh": "Actualiser",
    "loading": "Chargement...",
    "noResults": "Aucun résultat trouvé.",
    "all": "Tous",
    "save": "Sauvegarder",
    "delete": "Supprimer",
    "deleteSuccess": "Supprimé avec succès",
    "selectOption": "-- Sélectionnez une option --",
    "optional": "Optionnel",
    "saveChanges": "Sauvegarder les modifications"
  },
  "sidebar": {
    "dashboard": "Tableau de bord",
    "suppliers": "Fournisseurs & Dettes",
    "hr": "Ressources Humaines",
    "expenses": "Dépenses",
    "payroll": "Paie",
    "agenda": "Agenda",
    "auditLogs": "Journal d'audit",
    "end_of_day": "Caisse",
    "settings": "Paramètres",
    "database": "Base de données",
    "storeMap": "3D Store Map",
    "pdfImporter": "Importateur PDF"
  },
"storeMap": {
    "title": "Plan Interactif du Magasin",
    "subtitle": "Glissez les outils, concevez les allées et configurez les étagères pour l'import PDF",
    "toolbox": "Boîte à Outils",
    "dragHint": "Glissez-moi vers le plan",
    "canvasHint": "Devanture du Magasin (Entrée)",
    "properties": "Propriétés de l'élément",
    "propType": "Type",
    "propName": "Nom de l'étagère (Liaison auto)",
    "propCapacity": "Capacité Max (Alertes)",
    "emptyProps": "Cliquez sur un outil sur le plan pour modifier ses propriétés.",
    "gridSettings": "Paramètres de l'espace",
    "gridRows": "Profondeur (Lignes)",
    "gridCols": "Largeur (Colonnes)",
    "manageInventoryBtn": "Gérer les Produits",
    "inventoryModalTitle": "Contenu de l'élément :",
    "categorySelect": "Sélectionnez une catégorie",
    "addCategoryBtn": "Ajouter",
    "customCategoryPlaceholder": "Ou tapez une nouvelle catégorie...",
    "emptyInventory": "Cette étagère est vide.",
    "occupiedError": "L'espace est déjà occupé !",
    "capacityWarning": "Attention : Capacité maximale atteinte !",
    "tools": {
      "shelf": "Étagère Gondole",
      "fridge": "Réfrigérateur (Laitier)",
      "freezer": "Congélateur (Viande)",
      "cashier": "Point de Vente (Caisse)",
      "wall": "Mur / Séparateur"
    },
    "clearBtn": "Tout Effacer",
    "saveBtn": "Sauvegarder le Plan",
    "rotateBtn": "Pivoter",
    "confirmClear": "Êtes-vous sûr de vouloir effacer tout le plan ?",
    "saveSuccess": "Plan sauvegardé avec succès ! Prêt à recevoir les articles des factures PDF.",
    "newLayout": "Nouveau Plan {{count}}",
    "saveBeforeActivate": "Veuillez d'abord sauvegarder le plan avant de le définir comme principal !",
    "activateSuccess": "Ce plan a été défini comme principal pour recevoir les factures.",
    "confirmDeleteLayout": "Êtes-vous sûr de vouloir supprimer définitivement ce plan ?",
    "layoutNamePlaceholder": "Nom du plan...",
    "activeLayoutBadge": "Plan Principal Actif",
    "setAsActive": "Définir comme Actif",
    "linkedCategories": "Catégories liées à cette étagère :",
    "customCategoryExample": "ex : Nourriture pour chats...",
    "predefinedCategories": [
      "Pâtes", "Huiles Végétales", "Sucre & Farine", "Café & Thé", "Épices",
      "Conserves", "Boissons & Jus", "Biscuits & Sucreries", "Produits Laitiers", "Viandes Surgelées",
      "Soins Personnels", "Produits d'Entretien"
    ],
    "addCustomTool": "Nouvel Outil",
    "customToolModalTitle": "Créer un outil personnalisé",
    "toolNameLabel": "Nom de l'outil (ex: Stand Promo, Panier de légumes)",
    "toolNamePlaceholder": "Tapez le nom de l'outil ici...",
    "chooseIcon": "Choisir l'icône",
    "chooseColor": "Choisir la couleur",
    "confirmTool": "Valider l'outil",
    "toolNameRequired": "Veuillez entrer le nom de l'outil",
    "modal": {
     "storedProducts": "Produits stockés dans ce rayon (Inventaire) :",
      "loadingProducts": "Chargement des produits...",
      "noProducts": "Aucun produit n'est actuellement stocké dans ce rayon.",
      "productName": "Produit",
      "quantity": "Quantité",
      "actions": "Actions",
      "edit": "Modifier",
      "delete": "Supprimer",
      "save": "Enregistrer",
      "cancel": "Annuler"
    },
"catGroups": {
      "grocery": "Épicerie (Produits Secs)",
      "dairy": "Produits Laitiers et Fromages",
      "drinks": "Boissons et Jus",
      "cleaning": "Produits d'Entretien",
      "personalCare": "Soins Personnels et Cosmétiques",
      "snacks": "Snacks et Biscuits",
      "pets": "Alimentation Animaux"
    },
    "catItems": {
      "grocery": ["Conserves (Thon, Tomates)", "Pâtes", "Légumineuses (Lentilles, Pois chiches)", "Sucre & Sel", "Farine & Semoule", "Huiles & Ghee", "Épices"],
      "dairy": ["Lait", "Fromages Divers", "Yaourt", "Beurre & Margarine", "Crèmes de cuisson"],
      "drinks": ["Eau Minérale", "Jus Naturels", "Sodas", "Boissons Énergisantes", "Café & Thé", "Boissons Chaudes Instantanées"],
      "cleaning": ["Lessives", "Liquides Vaisselle", "Désodorisants", "Nettoyants Sols & Vitres", "Insecticides"],
      "personalCare": ["Shampooing & Après-shampooing", "Savon & Gel Douche", "Dentifrice & Brosses", "Crèmes et Soins", "Couches & Mouchoirs"],
      "snacks": ["Biscuits & Gâteaux", "Chocolat", "Chips & Craquelins", "Gomme & Bonbons"],
      "pets": ["Nourriture Chats", "Nourriture Chiens", "Litière & Accessoires"]
    },
    "catLabels": {
      "selectCategory": "-- Sélectionnez une catégorie principale --",
      "catName": "Nom de la catégorie",
      "catDesc": "Description du rayon (optionnel)",
      "catDescPlaceholder": "ex: Thon, Tomates, Champignons...",
      "addSuccess": "Catégorie ajoutée au rayon avec succès !",
      "addNewCategoryTitle": "Ajouter de nouvelles catégories",
      "addCategoryBtn": "Ajouter cette catégorie"
    },
    "manualAdd": {
      "title": "Ajouter un produit manuellement",
      "productName": "Nom du produit",
      "productNamePlaceholder": "ex: Thon Gold...",
      "quantity": "Quantité",
      "addBtn": "Ajouter",
      "success": "Produit ajouté manuellement avec succès !"
    }
  },
"pdfImporter": {
   "title": "Importateur Intelligent (PDF)",
    "subtitle": "Téléchargez les bons de livraison pour extraire les articles et les lier au plan du magasin.",
    "btnUpload": "Uploader & Analyser",
    "invoiceSupplier": "Fournisseur sur Facture (PDF)",
    "invoiceTotal": "Total de la Facture",
    "selectSupplier": "-- Sélectionner le fournisseur pour lier le compte --",
    "addDebtBtn": "Ajouter comme dette au fournisseur",
    "mappingTable": "Tableau de Correspondance et Affectation",
    "tableTitle": "Tableau de Correspondance et Affectation",
    "cols": {
      "ref": "Code-barres (PDF)",
      "dirtyName": "Nom Brut",
      "qty": "Qté",
      "cleanName": "Nom Propre (Plan)",
      "shelf": "Affecter au Rayon",
      "autoRecognized": "Reconnu Automatiquement",
      "extractSuccessWithKnown": "Successfully extracted {{count}} products! ({{knownCount}} recognized automatically)",
      "extractSuccessWithUnknown": "Successfully extracted {{count}} products! ({{unknownCount}} not recognized automatically)",
      "actions": "Action",
      "pdfImporter": "Importateur de factures (PDF)"
    },
    "emptyState": "Aucun fichier PDF uploadé. Cliquez sur le bouton ci-dessus pour commencer.",
    "selectShelf": "-- Sélectionner le rayon --",
    "capacity": "Capacité",
    "saved": "Lié",
    "saveBtn": "Sauvegarder",
    "messages": {
      "extractSuccess": "{{count}} articles extraits avec succès !",
      "extractError": "Échec de lecture du PDF ou format non supporté.",
      "systemError": "Erreur de connexion au système.",
      "shelfWarning": "Veuillez d'abord sélectionner un rayon de destination.",
      "saveSuccess": "[{{name}}] lié et enregistré avec succès !",
      "saveError": "Une erreur s'est produite lors de la sauvegarde."
    }
  },
  "dashboard": {
    "title": "Tableau de bord",
    "subtitle": "Aperçu du système & mesures financières",
    "quickAction": "Action rapide",
    "quickActionExpense": "Ajouter Dépense",
    "kpi": {
      "totalDebts": "Dettes Fournisseurs",
      "dueThisWeek": "Dû cette semaine",
      "activeEmployees": "Employés Actifs",
      "expenses": "Total Dépenses"
    },
    "charts": {
      "topCreditors": "Top Créanciers",
      "expensesDist": "Répartition des Dépenses"
    },
    "lists": {
      "urgentAlerts": "Tâches Urgentes",
      "recentAudit": "Activités Récentes",
      "noAuditLogs": "Aucune activité récente enregistrée."
    },
    "alerts": {
      "systemTitle": "Alertes Système",
      "urgentBody": "Vous avez {{count}} tâches urgentes en attente.",
      "noTasks": "Aucune tâche urgente."
    },
    "actions": {
      "payNow": "Payer"
    }
  },
"suppliers": {
    "title": "Fournisseurs",
    "subtitle": "Gérer les comptes et factures",
    "addSupplier": "Nouveau Fournisseur",
    "searchPlaceholder": "Rechercher par nom ou téléphone...",
    "table": {
      "name": "Nom du fournisseur",
      "phone": "Téléphone",
      "totalDebt": "Dette Totale",
      "status": "Statut",
      "actions": "Actions"
    },
    "status": {
      "clear": "Réglé",
      "indebted": "Endetté"
    },
    "actions": {
      "view": "Détails",
      "edit": "Modifier",
      "pay": "Payer",
      "delete": "Supprimer",
      "confirmDeleteBtn": "Confirmer la suppression",
      "importSuccess": "{{count}} fournisseurs importés avec succès",
      "importError": "Erreur lors de l'importation"
    },
    "messages": {
      "saveError": "Erreur d'enregistrement",
      "deleteError": "Erreur de suppression",
      "deleteProtected": "Impossible de supprimer ce fournisseur car des factures ou des paiements y sont liés."
    },
    "modal": {
      "nameLabel": "Nom du fournisseur",
      "selectSupplier": "-- Sélectionner un fournisseur --"
    },
    "details": {
      "schedulePayment": "Planifier un paiement",
      "addPayment": "Ajouter un paiement",
      "addReceipt": "Ajouter une facture",
      "payments": "Historique des paiements dus",
      "receipts": "Historique des factures reçues",
      "amount": "Montant",
      "date": "Date",
      "note": "Libellé / Note",
      "printReceipt": "Imprimer le reçu",
      "print": "Imprimer"
    }
  
  },
  "receipt": {
    "title": "Reçu de réception / paiement",
    "storeName": "GHERBI.AI",
    "date": "Date :",
    "time": "Heure :",
    "cashier": "Caissier :",
    "supplier": "Fournisseur :",
    "amount": "Montant :",
    "note": "Libellé :",
    "signature": "Signature du destinataire",
    "stamp": "Cachet du magasin",
    "footer": "Merci de votre confiance"
  },
  "hr": {
    "title": "Ressources Humaines",
    "subtitle": "Gérer les présences et le personnel",
    "tabs": {
      "attendance": "Terminal",
      "employees": "Employés"
    },
    "scanner": {
      "title": "Pointage",
      "placeholder": "Scanner le code ou entrer le code PIN...",
      "submit": "Valider"
    },
    "scannerHint": "Le scanner agit comme un clavier. Pointez ici.",
    "attendanceLog": "Journal des présences d'aujourd'hui",
    "kpi": {
      "present": "Présent",
      "absent": "Absent",
      "late": "En retard"
    },
    "table": {
      "name": "Employé",
      "nameWithRole": "Employé / Rôle",
      "timeIn": "Heure d'arrivée",
      "timeOut": "Heure de départ",
      "status": "Statut",
      "loading": "Chargement des données...",
      "emptyRecord": "Aucun pointage aujourd'hui."
    },
    "status": {
      "present": "Présent",
      "absent": "Absent",
      "late": "En retard",
      "departed": "Parti",
      "active": "Actif",
      "inactive": "Inactif"
    },
    "roles": {
      "cashier": "Caissier",
      "scale": "Peseur",
      "stock": "Magasinier",
      "admin": "Gérant"
    },
    "messages": {
      "checkIn": "Entrée enregistrée",
      "checkOut": "Sortie enregistrée",
      "error": "Erreur de traitement."
    },
    "employees": {
      "addBtn": "Ajouter Employé",
      "search": "Rechercher...",
      "empty": "Aucun employé trouvé.",
      "softDeleted": "Compte désactivé pour préserver l'historique.",
      "deleteConfirmMsg": "Voulez-vous vraiment supprimer le compte de : {{name}} ?",
      "table": {
        "name": "Nom complet",
        "role": "Rôle",
        "status": "Statut",
        "actions": "Actions"
      },
      "actions": {
        "edit": "Modifier",
        "delete": "Supprimer"
      }
    },
    "dialog": {
      "title": "Nouvel Employé",
      "editTitle": "Modifier Employé",
      "desc": "Saisir les détails et le code PIN secret.",
      "name": "Nom complet",
      "namePlaceholder": "Jean Dupont...",
      "role": "Rôle",
      "rolePlaceholder": "Sélectionner un rôle",
      "pin": "Code PIN",
      "cancel": "Annuler",
      "save": "Enregistrer",
      "saveChanges": "Sauvegarder"
    }
  },
  "expenses": {
    "title": "Dépenses",
    "subtitle": "Suivi des sorties de caisse et avances",
    "allCaisses": "Toutes les caisses",
    "adminCaisse": "Caisse Principale",
    "cashierCaisse": "Caisse: {{name}}",
    "addExpense": "Ajouter Dépense",
    "editExpense": "Modifier Dépense",
    "saveChanges": "Sauvegarder",
    "cashierNotice": "Affichage des données de votre caisse ({{name}}) uniquement.",
    "kpi": {
      "today": "Sorties du jour",
      "month": "Sorties du mois"
    },
    "table": {
      "date": "Date",
      "description": "Description",
      "category": "Catégorie",
      "amount": "Montant",
      "locked": "Verrouillé"
    },
    "caisseSourceLabel": "Source",
    "dateLabel": "Date",
    "deleteConfirm": "Voulez-vous vraiment supprimer cette dépense ?",
    "myAdvance": "Mon Avance",
    "categories": {
      "utilities": "Factures & Services",
      "maintenance": "Maintenance",
      "supplies": "Fournitures",
      "advance": "Avance Employé",
      "supplier_payment": "Paiement Fournisseur",
      "salaries": "Salaires",
      "رواتب": "Salaires"
    }
  },
  "payroll": {
    "title": "Paie",
    "subtitle": "Gérer les salaires et avances",
    "tabs": {
      "calculator": "Calculatrice",
      "advances": "Avances",
      "salaries": "Historique"
    },
    "exportReportWord": "Exporter le rapport (Word)",
    "selectEmployee": "Sélectionner un employé",
    "hourlyRate": "Taux horaire",
    "overlap": "Calcul impossible ! Un salaire a déjà été payé pour cet employé sur une période superposée (du {{start}} au {{end}}).",
    "period": "Période",
    "totalHours": "Heures totales",
    "grossSalary": "Salaire Brut",
    "deductions": "Déductions / Avances",
    "netSalary": "Salaire Net",
    "payslip": "Fiche de paie",
    "comprehensiveReport": "Rapport détaillé de paie",
    "totalEmployees": "Total Employés",
    "rolloverNote": "Report de dette ({{start}} à {{end}})",
    "expenseNote": "Salaire: {{name}} ({{start}} - {{end}})",
    "accountantSig": "Signature de l'employé",
    "calculateBtn": "Calculer le salaire",
    "from": "De",
    "to": "À",
    "emptyState": "Saisissez les détails de l'employé et cliquez sur 'Calculer' pour voir les résultats",
    "payAndSave": "Payer & Sauvegarder",
    "addAdvance": "Ajouter une avance",
    "exportWord": "Exporter la paie (Word)",
    "exportPayslipWord": "Exporter Word",
    "advanceStatus": {
      "pending": "Non payé",
      "paid": "Déduit"
    },
    "modal": {
      "addAdvance": "Enregistrer une avance",
      "editAdvance": "Modifier l'avance",
      "amount": "Montant",
      "fundSource": "Source de fonds",
      "note": "Remarque",
      "notePlaceholder": "Raison de l'avance...",
      "saveAdvance": "Enregistrer l'avance"
    },
    "confirmPay": {
      "title": "Confirmer le paiement",
      "rollover": "Le salaire net est négatif. La dette restante sera reportée au mois prochain. Continuer ?",
      "standard": "Un montant de {{amount}} sera payé depuis la caisse principale. Confirmer le paiement ?",
      "confirmBtn": "Oui, Confirmer"
    },
    "deleteAdvance": {
      "title": "Annuler l'avance",
      "message": "Voulez-vous vraiment annuler et supprimer cette avance ? Le montant sera retourné à sa caisse d'origine.",
      "confirmBtn": "Oui, Supprimer l'avance"
    },
    "table": {
      "date": "Date",
      "employee": "Employé",
      "amount": "Montant",
      "source": "Source (Caisse)",
      "status": "Statut",
      "actions": "Actions"
    },
    "errors": {
      "advanceNotFound": "Avance introuvable."
    }
  },
  "agenda": {
    "title": "Agenda",
    "subtitle": "Gérer le calendrier et les paiements",
    "addTask": "Nouvelle Tâche",
    "allDay": "Toute la journée",
    "rescheduleTask": "Reporter",
    "deleteConfirm": "Voulez-vous vraiment supprimer cette tâche ?",
    "sections": {
      "overdue": "En retard",
      "today": "Aujourd'hui",
      "upcoming": "À venir"
    },
    "filters": {
      "all": "Tous",
      "pending": "En attente",
      "completed": "Terminé"
    },
    "types": {
      "delivery": "Livraison",
      "payment": "Paiement",
      "maintenance": "Maintenance"
    },
    "modal": {
      "taskTitleLabel": "Titre",
      "taskTypeLabel": "Type",
      "dateLabel": "Date",
      "timeLabel": "Heure",
      "cancelBtn": "Annuler",
      "saveBtn": "Enregistrer"
    }
  },
  "eod": {
    "title": "Caisse / POS",
    "store_name": "MON MAGASIN",
    "active_shift": "Session Active",
    "open_shift_title": "Ouvrir la caisse",
    "open_shift_desc": "Commencer une session en tant que:",
    "opening_balance": "Fonds de caisse",
    "open_shift_btn": "Ouvrir la session",
    "total_deducted": "Total Déductions",
    "advances": "Avances",
    "supplier_payments": "Paiements",
    "actual_cash": "Espèces en caisse",
    "notes": "Remarques",
    "notesPlaceholder": "Écarts ou remarques...",
    "today_sales": "Ventes Nettes",
    "save_btn": "Fermer la session",
    "confirmClose": "Voulez-vous vraiment fermer cette session ?",
    "close_day_btn": "Clôture Journalière (Z-Report)",
    "close_day_confirm": "Ceci archivera toutes les sessions. Continuer ?",
    "grandTotalOpening": "Fonds d'ouverture global",
    "grandTotalActual": "Espèces globales",
    "grandTotalSales": "Ventes nettes globales",
    "allShifts": "Sessions d'aujourd'hui",
    "cashierName": "Caissier",
    "statusOpen": "Ouverte",
    "statusClosed": "Fermée",
    "timing": "Horaires",
    "masterDashboardTitle": "Fin de journée (EOD)",
    "masterDashboardDesc": "Gérer la clôture des caisses",
    "print_receipt": "Imprimer le reçu",
    "x_report": "RAPPORT X",
    "time_out": "Départ",
    "receipt_footer": "Conservez ce reçu."
  },
  "zreport": {
    "title": "RAPPORT Z (Fin de journée)",
    "archive_title": "Archives des rapports",
    "archive_desc": "Historique des journées clôturées et transferts financiers",
    "date": "Date :",
    "closed_by": "Clôturé par :",
    "summary": "Résumé Financier",
    "opening": "Ouverture",
    "net_sales": "Ventes Nettes",
    "actual_cash": "Espèces en caisse",
    "shifts_details": "Détails des sessions",
    "cashier": "Caissier",
    "time_in": "Entrée",
    "time_out": "Sortie",
    "deductions": "Déductions",
    "sales": "Ventes",
    "actual_drawer": "Caisse Réelle",
    "not_closed": "Non Fermé",
    "manager_sig": "Signature Gérant",
    "company_seal": "Cachet"
  },
  "pos": {
    "title": "Point de Vente",
    "scanPlaceholder": "Scanner le code-barres...",
    "cart": "Panier",
    "emptyCart": "Le panier est vide",
    "perUnit": "l'unité",
    "total": "Total",
    "pay": "Encaisser"
  },
  "settings": {
    "title": "Paramètres",
    "subtitle": "Gérer les utilisateurs et la base de données",
    "newUser": "Nouvel Utilisateur",
    "username": "Nom d'utilisateur",
    "password": "Mot de passe",
    "role": "Rôle",
    "addAccountBtn": "Créer un compte",
    "loading": "Chargement...",
    "table": {
      "username": "Utilisateur",
      "role": "Rôle",
      "actions": "Actions"
    },
    "noUsers": "Aucun utilisateur trouvé.",
    "deleteTooltip": "Supprimer",
    "deleteConfirm": "Voulez-vous vraiment supprimer l'utilisateur : {{name}} ?",
    "deleteAlert": "Vous ne pouvez pas supprimer cet utilisateur.",
    "deleteError": "Échec de la suppression.",
    "addError": "Échec de l'ajout.",
    "errorFillFields": "Veuillez remplir tous les champs.",
    "accessDenied": "Accès Refusé.",
    "modal": {
      "title": "Paramètres du Magasin",
      "storeNameLabel": "Nom du Magasin",
      "storeNamePlaceholder": "Saisir le nom...",
      "saveBtn": "Sauvegarder",
      "saveSuccess": "Enregistré avec succès."
    }
  },
  "database": {
    "title": "Base de Données",
    "backup": "Sauvegarder",
    "backupDesc": "Créer une copie de sécurité des données.",
    "restore": "Restaurer",
    "restoreDesc": "Restaurer à partir d'une ancienne sauvegarde.",
    "messages": {
      "backupSuccess": "Sauvegarde réussie.",
      "restoreSuccess": "Restauration réussie ! L'application va redémarrer.",
      "restoreConfirm": "Êtes-vous sûr ? Les données actuelles seront remplacées.",
      "invalidFile": "Invalid file! Please select a valid database backup file (.db or .sqlite).",
      "error": "L'opération a échoué."
    }
  },
  "audit": {
    "subtitle": "Suivre toutes les activités du système",
    "actions": {
      "all": "Toutes les actions",
      "DELETE_EXPENSE": "Dépense Supprimée"
    },
    "details": {
      "DELETE_EXPENSE": "Dépense supprimée: {{desc}} ({{amount}})"
    }
  },
  "login": {
    "title": "Bienvenue",
    "subtitle": "Veuillez vous connecter",
    "username": "Nom d'utilisateur",
    "password": "Mot de passe",
    "loading": "Authentification...",
    "submit": "Se connecter",
    "error": "Identifiants invalides.",
    "serverError": "Erreur de connexion au serveur."
  },
  "backendErrors": {
    "shiftAlreadyOpen": "Vous avez déjà une session ouverte.",
    "invalidCredentials": "Nom d'utilisateur ou mot de passe incorrect.",
    "invalidPinOrInactive": "Code PIN invalide ou compte inactif.",
    "alreadyCompletedShift": "Pointage déjà terminé pour aujourd'hui.",
    "has_open_shifts": "Impossible de clôturer: Il reste des sessions ouvertes.",
    "no_shifts_to_close": "Aucune session à clôturer."
  },
  "activation": {
  "title": "Activation du système",
  "subtitle": "Cette version n'est pas activée. Veuillez envoyer l'identifiant de la machine au développeur pour obtenir votre clé.",
  "machineId": "ID Machine (Machine ID)",
  "licenseKey": "Clé d'activation (License Key)",
  "btn": "Activer l'application",
  "emptyKey": "Veuillez saisir la clé d'activation !",
  "invalidKey": "Clé d'activation invalide, veuillez vérifier votre saisie.",
  "error": "Une erreur est survenue lors de la connexion au système."
},
"badge": {
      "printBtn": "Badge Employé",
      "modalTitle": "Émettre un badge d'accès (Code-barres)",
      "modalDesc": "Entrez le code PIN de l'employé pour générer un code-barres imprimable.",
      "searchPlaceholder": "Entrez le code PIN...",
      "notFound": "Aucun employé trouvé avec ce code PIN !",
      "printExecute": "Imprimer",
      "downloadPDF": "Télécharger PDF",
      "idCard": "CARTE D'IDENTITÉ EMPLOYÉ",
      "scanInstruction": "Veuillez scanner ce code-barres à l'entrée et à la sortie."
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
      } else {
        set({ isLoading: false });
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

## `POS-Client\error.html`

```html
<!DOCTYPE html>
<html dir="ltr">
<body style="background: #0f172a; color: white; text-align: center; font-family: tahoma; padding-top: 20%;">
  <h2>Failed to connect to the main server!</h2>
  <p>Make sure the program is running on the admin's computer, and ensure the cable or Wi-Fi network is connected.</p>
</body>
</html>
```

---

## `POS-Client\index.html`

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>GHERBI.AI POS - اتصال الكاشير</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #020617; /* لون Slate-950 مطابق لتصميم النظام */
      color: #e2e8f0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      overflow: hidden;
    }
    .container {
      background: #0f172a; /* Slate-900 */
      padding: 40px;
      border-radius: 16px;
      border: 1px solid #1e293b; /* Slate-800 */
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
      text-align: center;
      width: 100%;
      max-width: 400px;
    }
    
    /* تنسيقات الهوية الجديدة */
    .logo {
      width: 90px;
      height: 90px;
      margin-bottom: 15px;
      animation: pulse 2s infinite;
    }
    .brand {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 2px;
      color: #ffffff;
      margin-bottom: 5px;
    }
    .subtitle {
      font-size: 12px;
      color: #94a3b8; /* Slate-400 */
      margin-bottom: 30px;
      letter-spacing: 1px;
    }

    .instruction {
      font-size: 14px;
      color: #cbd5e1; /* Slate-300 */
      margin-bottom: 15px;
    }

    input {
      padding: 15px;
      font-size: 18px;
      margin-bottom: 20px;
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      border-radius: 10px;
      border: 1px solid #334155;
      background: #020617;
      color: white;
      outline: none;
      transition: all 0.3s ease;
      letter-spacing: 2px;
    }
    input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
    input::placeholder {
      color: #475569;
      letter-spacing: normal;
    }

    button {
      padding: 14px 30px;
      font-size: 18px;
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      width: 100%;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
    }
    button:hover {
      background-color: #1d4ed8;
      transform: translateY(-1px);
      box-shadow: 0 6px 8px -1px rgba(37, 99, 235, 0.4);
    }
    button:active {
      transform: translateY(1px);
    }

    .footer {
      margin-top: 25px;
      font-size: 11px;
      color: #475569;
      font-weight: bold;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- صورة اللوجو الجديد الخاص بك -->
    <img src="./assets/icon.png" alt="GHERBI.AI Logo" class="logo" />
    
    <div class="brand">GHERBI.AI POS</div>
    <div class="subtitle">CODE • MULTIMEDIA • ALGO • AI</div>
    
    <p class="instruction">يرجى إدخال عنوان الـ IP الخاص بالحاسوب الرئيسي (السيرفر):</p>
    
    <input type="text" id="ipInput" placeholder="مثال: 192.168.1.5" autocomplete="off" spellcheck="false" />
    <button onclick="connectToServer()">اتصال بالنظام</button>

    <div class="footer">Powered by Mohamed Cherif Gherbi</div>
  </div>

  <script>
    // 1. استرجاع الـ IP إذا كان محفوظاً من قبل
    const savedIP = localStorage.getItem('serverIP');
    if (savedIP) {
      document.getElementById('ipInput').value = savedIP;
    }

    // إضافة ميزة الاتصال عند الضغط على زر Enter
    document.getElementById('ipInput').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        connectToServer();
      }
    });

    // 2. دالة الاتصال
    function connectToServer() {
      const ip = document.getElementById('ipInput').value.trim();
      if (ip) {
        // حفظ الـ IP للمرات القادمة
        localStorage.setItem('serverIP', ip);
        
        // التوجه فوراً إلى شاشة البرنامج الرئيسي عبر الشبكة (البورت 3000)
        window.location.href = `http://${ip}:3000`;
      } else {
        // تأثير اهتزاز بسيط إذا كان الحقل فارغاً
        const input = document.getElementById('ipInput');
        input.style.borderColor = '#ef4444';
        setTimeout(() => input.style.borderColor = '#334155', 1000);
      }
    }
  </script>
</body>
</html>
```

---

## `POS-Client\main.js`

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// 🚀 السر هنا: تعطيل تسريع الرسوميات ليستهلك رامات ومعالج أقل بكثير ويناسب الأجهزة القديمة
app.disableHardwareAcceleration();

function createWindow() {
  const win = new BrowserWindow({
    width: 1024, // مقاس الشاشات القديمة
    height: 768,
    autoHideMenuBar: true, // إخفاء الشريط العلوي لكي لا يبدو كمتصفح
    webPreferences: {
      nodeIntegration: false // لحماية البرنامج
    }
  });

  // مسار ملف الإعدادات الذي سيوضع بجانب البرنامج .exe
  const configPath = path.join(process.cwd(), 'config.json');
  
  // رقم الـ IP الافتراضي (يمكنك تغييره)
  let serverIP = '192.168.1.100'; 
  
  // قراءة رقم جهاز المدير من ملف صغير بجانب البرنامج
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.serverIP) {
        serverIP = config.serverIP;
      }
    } catch (err) {
      console.log('خطأ في قراءة ملف config.json');
    }
  }

  // 🔴 فتح البرنامج الرئيسي مباشرة عبر الشبكة المحلية (بدون إنترنت)
  win.loadURL(`http://${serverIP}:3000`);
  
  // إذا لم يتمكن من الاتصال (مثلاً السيرفر مغلق)، يظهر رسالة بدلاً من صفحة بيضاء
  win.webContents.on('did-fail-load', () => {
    win.loadFile('error.html');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

---

## `POS-Client\package.json`

```json
{
  "name": "pos-client",
  "productName": "GHERBI.AI POS Client",
  "version": "1.0.0",
  "main": "main.js",
  "build": {
    "appId": "com.gherbi.pos.client",
    "productName": "GHERBI.AI POS Client",
    "win": {
      "icon": "assets/icon.ico",
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64",
            "ia32"
          ]
        }
      ]
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "installerIcon": "assets/icon.ico",
      "uninstallerIcon": "assets/icon.ico"
    }
  },
  "devDependencies": {
    "electron": "^22.3.27"
  }
}

```

---

## `POS_Keygen\keygen.js`

```javascript
const crypto = require('crypto');
const readline = require('readline');

const SECRET_SALT = "GHERBI_POS_SECRET_KEY_2026"; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('أدخل رقم الجهاز (Machine ID): ', (hwid) => {
    // 🛡️ تنظيف الرقم من أي مسافات زائدة
    const cleanHwid = hwid.replace(/\s+/g, '').trim().toUpperCase();
    
    const hash = crypto.createHash('sha256').update(cleanHwid + SECRET_SALT).digest('hex');
    const rawKey = hash.substring(0, 20).toUpperCase();
    const finalKey = `${rawKey.substring(0,5)}-${rawKey.substring(5,10)}-${rawKey.substring(10,15)}-${rawKey.substring(15,20)}`;
    
    console.log('\n=========================================');
    console.log('✅ تم توليد مفتاح التفعيل بنجاح:');
    console.log(`🔑 ${finalKey}`);
    console.log('=========================================\n');
    
    rl.close();
});
```

---

## `release-builds\win-unpacked\vk_swiftshader_icd.json`

```json
{"file_format_version": "1.0.0", "ICD": {"library_path": ".\\vk_swiftshader.dll", "api_version": "1.0.5"}}
```

---

