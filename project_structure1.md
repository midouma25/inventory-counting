# هيكل المشروع (Project Tree)

```text
├── inventory-counting/
    ├── extract_code.py
    ├── project_structure.md
    ├── project_structure1.md
    ├── README.md
    ├── backend/
        ├── .gitignore
        ├── database.js
        ├── main.js
        ├── package-lock.json
        ├── package.json
        ├── preload.js
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
                    ├── Expenses.jsx
                    ├── HR.jsx
                    ├── Login.jsx
                    ├── Suppliers.jsx
                    ├── Employees/
                    ├── Suppliers/
                ├── ui/
                    ├── Modal.jsx
            ├── locales/
                ├── ar/
                    ├── translation.json
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

def generate_code_report(directory, output_filename="project_structure1.md"):
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

## الملف: `project_structure1.md`

```md

```

---

## الملف: `README.md`

```md
// تعذر قراءة الملف: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte
```

---

## الملف: `backend\.gitignore`

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

## الملف: `backend\database.js`

```javascript
const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

// إنشاء ملف قاعدة البيانات في مجلد بيانات التطبيق (لكي لا يُحذف عند التحديث)
const dbPath = path.join(app.getPath('userData'), 'inventory_system.db');
const db = new Database(dbPath, { verbose: console.log });

// تهيئة الجداول (تُنفذ مرة واحدة عند تشغيل التطبيق)
function initDB() {
  const createSuppliersTable = `
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      totalDebt REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.prepare(createSuppliersTable).run();
}

// دوال التعامل مع الموردين
function getSuppliers() {
  return db.prepare('SELECT * FROM suppliers ORDER BY id DESC').all();
}

function addSupplier(supplier) {
  const stmt = db.prepare('INSERT INTO suppliers (name, phone, totalDebt) VALUES (?, ?, ?)');
  const info = stmt.run(supplier.name, supplier.phone, supplier.totalDebt);
  return { id: info.lastInsertRowid, ...supplier };
}

module.exports = { initDB, getSuppliers, addSupplier };
```

---

## الملف: `backend\main.js`

```javascript
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database'); // استدعاء ملف قاعدة البيانات

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // هنا يتم تحديد مسار واجهة React (تأكد من تعديله حسب إعدادات Vite لديك)
  // افتراضياً Vite يعمل على المنفذ 5173 في وضع التطوير
  mainWindow.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  // إنشاء الجداول في قاعدة البيانات عند بدء التشغيل
  db.initDB(); 
  
  createWindow();
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // استقبال طلبات React وتنفيذها في SQLite
  ipcMain.handle('get-suppliers', () => {
    return db.getSuppliers();
  });

  ipcMain.handle('add-supplier', (event, data) => {
    return db.addSupplier(data);
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
```

---

## الملف: `backend\package-lock.json`

```json
{
  "name": "backend",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "dependencies": {
        "better-sqlite3": "^12.11.1"
      }
    },
    "node_modules/base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/better-sqlite3": {
      "version": "12.11.1",
      "resolved": "https://registry.npmjs.org/better-sqlite3/-/better-sqlite3-12.11.1.tgz",
      "integrity": "sha512-dq9AtApgg5PGFtBzPFSBl3HZQjHok5gaQCM6zh2Yk0aSmDCs1CbnVI8/HgASQkNKsWFpseIO9beg5xxpYhbIfA==",
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "bindings": "^1.5.0",
        "prebuild-install": "^7.1.1"
      },
      "engines": {
        "node": "20.x || 22.x || 23.x || 24.x || 25.x || 26.x"
      }
    },
    "node_modules/bindings": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz",
      "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
      "license": "MIT",
      "dependencies": {
        "file-uri-to-path": "1.0.0"
      }
    },
    "node_modules/bl": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/bl/-/bl-4.1.0.tgz",
      "integrity": "sha512-1W07cM9gS6DcLperZfFSj+bWLtaPGSOHWhPiGzXmvVJbRLdG82sH/Kn8EtW1VqWVA54AKf2h5k5BbnIbwF3h6w==",
      "license": "MIT",
      "dependencies": {
        "buffer": "^5.5.0",
        "inherits": "^2.0.4",
        "readable-stream": "^3.4.0"
      }
    },
    "node_modules/buffer": {
      "version": "5.7.1",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.7.1.tgz",
      "integrity": "sha512-EHcyIPBQ4BSGlvjB16k5KgAJ27CIsHY/2JBmCRReo48y9rQ3MaUzWX3KVlBa4U7MyX02HdVj0K7C3WaB3ju7FQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "base64-js": "^1.3.1",
        "ieee754": "^1.1.13"
      }
    },
    "node_modules/chownr": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.4.tgz",
      "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg==",
      "license": "ISC"
    },
    "node_modules/decompress-response": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/decompress-response/-/decompress-response-6.0.0.tgz",
      "integrity": "sha512-aW35yZM6Bb/4oJlZncMH2LCoZtJXTRxES17vE3hoRiowU2kWHaJKFkSBDnDR+cm9J+9QhXmREyIfv0pji9ejCQ==",
      "license": "MIT",
      "dependencies": {
        "mimic-response": "^3.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/deep-extend": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/deep-extend/-/deep-extend-0.6.0.tgz",
      "integrity": "sha512-LOHxIOaPYdHlJRtCQfDIVZtfw/ufM8+rVj649RIHzcm/vGwQRXFt6OPqIFWsm2XEMrNIEtWR64sY1LEKD2vAOA==",
      "license": "MIT",
      "engines": {
        "node": ">=4.0.0"
      }
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
    "node_modules/end-of-stream": {
      "version": "1.4.5",
      "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.5.tgz",
      "integrity": "sha512-ooEGc6HP26xXq/N+GCGOT0JKCLDGrq2bQUZrQ7gyrJiZANJ/8YDTxTpQBXGMn+WbIQXNVpyWymm7KYVICQnyOg==",
      "license": "MIT",
      "dependencies": {
        "once": "^1.4.0"
      }
    },
    "node_modules/expand-template": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/expand-template/-/expand-template-2.0.3.tgz",
      "integrity": "sha512-XYfuKMvj4O35f/pOXLObndIRvyQ+/+6AhODh+OKWj9S9498pHHn/IMszH+gt0fBCRWMNfk1ZSp5x3AifmnI2vg==",
      "license": "(MIT OR WTFPL)",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/file-uri-to-path": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
      "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw==",
      "license": "MIT"
    },
    "node_modules/fs-constants": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs-constants/-/fs-constants-1.0.0.tgz",
      "integrity": "sha512-y6OAwoSIf7FyjMIv94u+b5rdheZEjzR63GTyZJm5qh4Bi+2YgwLCcI/fPFZkL5PSixOt6ZNKm+w+Hfp/Bciwow==",
      "license": "MIT"
    },
    "node_modules/github-from-package": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/github-from-package/-/github-from-package-0.0.0.tgz",
      "integrity": "sha512-SyHy3T1v2NUXn29OsWdxmK6RwHD+vkj3v8en8AOBZ1wBQ/hCAQ5bAQTD02kW4W9tUp/3Qh6J8r9EvntiyCmOOw==",
      "license": "MIT"
    },
    "node_modules/ieee754": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
      "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ini": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/ini/-/ini-1.3.8.tgz",
      "integrity": "sha512-JV/yugV2uzW5iMRSiZAyDtQd+nxtUnjeLt0acNdw98kKLrvuRVyB80tsREOE7yvGVgalhZ6RNXCmEHkUKBKxew==",
      "license": "ISC"
    },
    "node_modules/mimic-response": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/mimic-response/-/mimic-response-3.1.0.tgz",
      "integrity": "sha512-z0yWI+4FDrrweS8Zmt4Ej5HdJmky15+L2e6Wgn3+iK5fWzb6T3fhNFq2+MeTRb064c6Wr4N/wv0DzQTjNzHNGQ==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/mkdirp-classic": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/mkdirp-classic/-/mkdirp-classic-0.5.3.tgz",
      "integrity": "sha512-gKLcREMhtuZRwRAfqP3RFW+TK4JqApVBtOIftVgjuABpAtpxhPGaDcfvbhNvD0B8iD1oUr/txX35NjcaY6Ns/A==",
      "license": "MIT"
    },
    "node_modules/napi-build-utils": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/napi-build-utils/-/napi-build-utils-2.0.0.tgz",
      "integrity": "sha512-GEbrYkbfF7MoNaoh2iGG84Mnf/WZfB0GdGEsM8wz7Expx/LlWf5U8t9nvJKXSp3qr5IsEbK04cBGhol/KwOsWA==",
      "license": "MIT"
    },
    "node_modules/node-abi": {
      "version": "3.94.0",
      "resolved": "https://registry.npmjs.org/node-abi/-/node-abi-3.94.0.tgz",
      "integrity": "sha512-W5ZNO5KRPB5TkYmGVD9F6YqhsglXJzE6etpbmT+f6EQElhiX/UTG551cnsRGvLG3fyZEg9HwaDmNmj5nwJ4z9g==",
      "license": "MIT",
      "dependencies": {
        "semver": "^7.3.5"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/prebuild-install": {
      "version": "7.1.3",
      "resolved": "https://registry.npmjs.org/prebuild-install/-/prebuild-install-7.1.3.tgz",
      "integrity": "sha512-8Mf2cbV7x1cXPUILADGI3wuhfqWvtiLA1iclTDbFRZkgRQS0NqsPZphna9V+HyTEadheuPmjaJMsbzKQFOzLug==",
      "deprecated": "No longer maintained. Please contact the author of the relevant native addon; alternatives are available.",
      "license": "MIT",
      "dependencies": {
        "detect-libc": "^2.0.0",
        "expand-template": "^2.0.3",
        "github-from-package": "0.0.0",
        "minimist": "^1.2.3",
        "mkdirp-classic": "^0.5.3",
        "napi-build-utils": "^2.0.0",
        "node-abi": "^3.3.0",
        "pump": "^3.0.0",
        "rc": "^1.2.7",
        "simple-get": "^4.0.0",
        "tar-fs": "^2.0.0",
        "tunnel-agent": "^0.6.0"
      },
      "bin": {
        "prebuild-install": "bin.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/pump": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.4.tgz",
      "integrity": "sha512-VS7sjc6KR7e1ukRFhQSY5LM2uBWAUPiOPa/A3mkKmiMwSmRFUITt0xuj+/lesgnCv+dPIEYlkzrcyXgquIHMcA==",
      "license": "MIT",
      "dependencies": {
        "end-of-stream": "^1.1.0",
        "once": "^1.3.1"
      }
    },
    "node_modules/rc": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/rc/-/rc-1.2.8.tgz",
      "integrity": "sha512-y3bGgqKj3QBdxLbLkomlohkvsA8gdAiUQlSBJnBhfn+BPxg4bc62d8TcBW15wavDfgexCgccckhcZvywyQYPOw==",
      "license": "(BSD-2-Clause OR MIT OR Apache-2.0)",
      "dependencies": {
        "deep-extend": "^0.6.0",
        "ini": "~1.3.0",
        "minimist": "^1.2.0",
        "strip-json-comments": "~2.0.1"
      },
      "bin": {
        "rc": "cli.js"
      }
    },
    "node_modules/readable-stream": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
      "license": "MIT",
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/simple-concat": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/simple-concat/-/simple-concat-1.0.1.tgz",
      "integrity": "sha512-cSFtAPtRhljv69IK0hTVZQ+OfE9nePi/rtJmw5UjHeVyVroEqJXP1sFztKUy1qU+xvz3u/sfYJLa947b7nAN2Q==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/simple-get": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/simple-get/-/simple-get-4.0.1.tgz",
      "integrity": "sha512-brv7p5WgH0jmQJr1ZDDfKDOSeWWg+OVypG99A/5vYGPqJ6pxiaHLy8nxtFjBA7oMa01ebA9gfh1uMCFqOuXxvA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "decompress-response": "^6.0.0",
        "once": "^1.3.1",
        "simple-concat": "^1.0.0"
      }
    },
    "node_modules/string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
      "integrity": "sha512-4gB8na07fecVVkOI6Rs4e7T6NOTki5EmL7TUduTs6bu3EdnSycntVJ4re8kgZA+wx9IueI2Y11bfbgwtzuE0KQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/tar-fs": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/tar-fs/-/tar-fs-2.1.5.tgz",
      "integrity": "sha512-OboTd8mmMhZDNPV+UjQcK9yKAatXu2aJ+r1w4im1Otd4M4fl2hwvdoXUxIYHFTHWK/3y3FarBP70v3vwmGlOxw==",
      "license": "MIT",
      "dependencies": {
        "chownr": "^1.1.1",
        "mkdirp-classic": "^0.5.2",
        "pump": "^3.0.0",
        "tar-stream": "^2.1.4"
      }
    },
    "node_modules/tar-stream": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/tar-stream/-/tar-stream-2.2.0.tgz",
      "integrity": "sha512-ujeqbceABgwMZxEJnk2HDY2DlnUZ+9oEcb1KzTVfYHio0UE6dG71n60d8D2I4qNvleWrrXpmjpt7vZeF1LnMZQ==",
      "license": "MIT",
      "dependencies": {
        "bl": "^4.0.3",
        "end-of-stream": "^1.4.1",
        "fs-constants": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^3.1.1"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/tunnel-agent": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
      "integrity": "sha512-McnNiV1l8RYeY8tBgEpuodCC1mLUdbSN+CYBL7kJsJNInOP8UjDDEwdk6Mw60vdLLrr5NHKZhMAOSrR2NZuQ+w==",
      "license": "Apache-2.0",
      "dependencies": {
        "safe-buffer": "^5.0.1"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT"
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
    }
  }
}

```

---

## الملف: `backend\package.json`

```json
{
  "dependencies": {
    "better-sqlite3": "^12.11.1"
  }
}

```

---

## الملف: `backend\preload.js`

```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // دوال الموردين
  getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
  addSupplier: (data) => ipcRenderer.invoke('add-supplier', data)
});
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
import Expenses from './components/pages/Expenses';
import Agenda from './components/pages/Agenda'; // استيراد صفحة الأجندة      
// Layout
import MainLayout from './components/layout/MainLayout';
 
// الصفحات الحقيقية التي قمنا ببنائها حتى الآن
import Dashboard from './components/pages/Dashboard';
import Suppliers from './components/pages/Suppliers';
import HR from './components/pages/HR';

// صفحات وهمية مؤقتة (Placeholders) لباقي الروابط حتى نقوم ببرمجتها

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
import { Bell, Search, UserCircle, Globe } from 'lucide-react';

export default function Topbar() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
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
        
        {/* زر تغيير اللغة */}
        <button 
          onClick={toggleLanguage}
          className="relative hover:text-white transition-colors bg-slate-900 p-2 rounded-lg border border-slate-800"
          title="تغيير اللغة"
        >
          <Globe size={18} />
        </button>

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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Calendar as CalendarIcon, CheckCircle2, Clock, Truck, Banknote, Wrench } from 'lucide-react';

// بيانات وهمية للمهام (بافتراض اليوم 2026-07-20)
const initialTasks = [
  { id: 1, title: 'Soummam Dairy Delivery', type: 'delivery', date: '2026-07-20', time: '10:00 AM', status: 'completed' },
  { id: 2, title: 'Pay ULTRA JOY Inc. Invoice', type: 'payment', date: '2026-07-20', time: '14:00 PM', status: 'pending' },
  { id: 3, title: 'Restock Beverage Coolers', type: 'maintenance', date: '2026-07-20', time: '20:00 PM', status: 'pending' },
  { id: 4, title: 'Cevital Oil Delivery', type: 'delivery', date: '2026-07-21', time: '09:00 AM', status: 'pending' },
  { id: 5, title: 'Store Deep Cleaning', type: 'maintenance', date: '2026-07-22', time: '22:00 PM', status: 'pending' },
];

export default function Agenda() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [tasks, setTasks] = useState(initialTasks);

  // تصفية المهام حسب الحالة
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  // فصل المهام إلى "اليوم" و "قادمة"
  const todayTasks = filteredTasks.filter(task => task.date === '2026-07-20');
  const upcomingTasks = filteredTasks.filter(task => task.date !== '2026-07-20');

  // دالة لتغيير حالة المهمة (Check/Uncheck)
  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };

  // أيقونات وألوان حسب نوع المهمة
  const getTypeConfig = (type) => {
    switch (type) {
      case 'delivery': return { icon: <Truck size={18} />, color: 'text-blue-400 bg-blue-950 border-blue-900' };
      case 'payment': return { icon: <Banknote size={18} />, color: 'text-red-400 bg-red-950 border-red-900' };
      case 'maintenance': return { icon: <Wrench size={18} />, color: 'text-amber-400 bg-amber-950 border-amber-900' };
      default: return { icon: <Clock size={18} />, color: 'text-slate-400 bg-slate-800 border-slate-700' };
    }
  };

  // مكون فرعي لعرض بطاقة المهمة
  const TaskCard = ({ task }) => {
    const typeConfig = getTypeConfig(task.type);
    const isCompleted = task.status === 'completed';

    return (
      <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
        isCompleted 
          ? 'bg-slate-900/50 border-slate-800/50 opacity-60' 
          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}>
        <div className="flex items-center gap-4">
          {/* زر الإنجاز */}
          <button 
            onClick={() => toggleTaskStatus(task.id)}
            className={`transition-colors ${isCompleted ? 'text-emerald-500' : 'text-slate-600 hover:text-emerald-400'}`}
          >
            <CheckCircle2 size={24} />
          </button>
          
          {/* تفاصيل المهمة */}
          <div>
            <h4 className={`font-medium ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>
              {task.title}
            </h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="flex items-center gap-1 text-slate-400">
                <Clock size={14} /> {task.time} {task.date !== '2026-07-20' && `| ${task.date}`}
              </span>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${typeConfig.color}`}>
                {typeConfig.icon}
                {t(`agenda.types.${task.type}`)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('agenda.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('agenda.subtitle')}</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span>{t('agenda.addTask')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* القسم الأيسر: التقويم المصغر والفلاتر */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4 text-white font-medium border-b border-slate-800 pb-3">
              <CalendarIcon size={18} className="text-blue-400" />
              July 2026
            </div>
            {/* تقويم مصغر شكلي */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {[...Array(31)].map((_, i) => (
                <div key={i} className={`p-1.5 rounded-md cursor-pointer hover:bg-slate-800 ${
                  i + 1 === 20 ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* أزرار التصفية */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === f ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                {t(`agenda.filters.${f}`)}
              </button>
            ))}
          </div>
        </div>

        {/* القسم الأيمن: قائمة المهام */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* مهام اليوم */}
          {todayTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                {t('agenda.sections.today')}
              </h3>
              <div className="space-y-3">
                {todayTasks.map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          )}

          {/* المهام القادمة */}
          {upcomingTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-slate-400 mb-4 border-b border-slate-800 pb-2">
                {t('agenda.sections.upcoming')}
              </h3>
              <div className="space-y-3">
                {upcomingTasks.map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          )}

          {filteredTasks.length === 0 && (
            <div className="text-center p-12 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
              No tasks found for this filter.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
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

## الملف: `frontend\src\components\pages\Expenses.jsx`

```javascript
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Receipt, ArrowDownCircle, Wallet } from 'lucide-react';

// بيانات وهمية للمصاريف
const initialExpenses = [
  { id: 1, date: '2026-07-20', description: 'Electricity Bill', category: 'utilities', amount: 12500 },
  { id: 2, date: '2026-07-20', description: 'Advance for Karim (Stock Clerk)', category: 'advance', amount: 5000 },
  { id: 3, date: '2026-07-19', description: 'Cleaning Supplies', category: 'supplies', amount: 3200 },
  { id: 4, date: '2026-07-18', description: 'AC Repair', category: 'maintenance', amount: 8000 },
];

export default function Expenses() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  // تصفية المصاريف حسب البحث
  const filteredExpenses = initialExpenses.filter(exp => 
    exp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // حساب إجمالي اليوم (بافتراض أن اليوم هو 2026-07-20 للتجربة)
  const todayTotal = initialExpenses
    .filter(exp => exp.date === '2026-07-20')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const monthTotal = initialExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // دالة لتحديد لون الفئة (Category Badge)
  const getCategoryColor = (category) => {
    switch (category) {
      case 'advance': return 'bg-purple-950 text-purple-400 border-purple-900';
      case 'utilities': return 'bg-blue-950 text-blue-400 border-blue-900';
      case 'maintenance': return 'bg-amber-950 text-amber-400 border-amber-900';
      case 'supplies': return 'bg-emerald-950 text-emerald-400 border-emerald-900';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('expenses.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('expenses.subtitle')}</p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
          <Plus size={18} />
          <span>{t('expenses.addExpense')}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.today')}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{todayTotal.toLocaleString()} DA</h3>
          </div>
          <div className="p-3 bg-red-950/30 rounded-lg text-red-400">
            <ArrowDownCircle size={24} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.month')}</p>
            <h3 className="text-2xl font-bold text-slate-300 mt-1">{monthTotal.toLocaleString()} DA</h3>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg text-slate-400">
            <Wallet size={24} />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('expenses.searchPlaceholder')}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Expenses Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50">
                <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('expenses.table.date')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('expenses.table.description')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('expenses.table.category')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-right">{t('expenses.table.amount')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                  <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">{exp.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Receipt size={16} className="text-slate-500" />
                      <span className="font-medium text-white">{exp.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(exp.category)}`}>
                      {t(`expenses.categories.${exp.category}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-white">{exp.amount.toLocaleString()} DA</span>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    No expenses found.
                  </td>
                </tr>
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
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel,
  getSortedRowModel,
  flexRender 
} from '@tanstack/react-table';
import { Plus, Search, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import Modal from '../ui/Modal';

export default function Suppliers() {
  const { t } = useTranslation();
  
  // حالات (States) الصفحة
  const [suppliers, setSuppliers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // جلب البيانات من SQLite عند فتح الصفحة
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        if (window.api && window.api.getSuppliers) {
          const data = await window.api.getSuppliers();
          setSuppliers(data);
        } else {
          console.warn("API is not available. Are you running in Electron?");
        }
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  // دالة إضافة مورد جديد وحفظه في SQLite
  const handleAddSupplier = async (e) => {
    e.preventDefault();
    const newSupplier = {
      name: e.target[0].value,
      phone: e.target[1].value,
      totalDebt: parseFloat(e.target[2].value) || 0
    };

    try {
      if (window.api && window.api.addSupplier) {
        const addedSupplier = await window.api.addSupplier(newSupplier);
        setSuppliers(prev => [addedSupplier, ...prev]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

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
    data: suppliers, // استخدام البيانات القادمة من قاعدة البيانات
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      {/* القسم العلوي */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('suppliers.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('suppliers.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors"
        >
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

      {/* نافذة إضافة مورد جديد */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={t('suppliers.addSupplier')}
      >
        <form className="space-y-4" onSubmit={handleAddSupplier}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Supplier Name</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
            <input 
              type="tel" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Initial Debt (DA)</label>
            <input 
              type="number" 
              defaultValue="0" 
              min="0"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)} 
              className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Save Supplier
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
```

---

## الملف: `frontend\src\components\ui\Modal.jsx`

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

## الملف: `frontend\src\locales\ar\translation.json`

```json
{
  "common": {
    "search": "بحث...",
    "superAdmin": "المدير العام",
    "systemOwner": "مالك النظام",
    "noResults": "لا توجد نتائج مطابقة لبحثك."
  },
  "sidebar": {
    "dashboard": "لوحة القيادة",
    "suppliers": "الموردين",
    "hr": "الموارد البشرية",
    "expenses": "المصاريف",
    "agenda": "الأجندة"
  },
  "dashboard": {
    "title": "لوحة القيادة",
    "subtitle": "نظرة عامة على النظام والمؤشرات المالية",
    "quickAction": "إجراء سريع",
    "kpi": {
      "totalDebts": "إجمالي ديون الموردين",
      "dueThisWeek": "مستحقة هذا الأسبوع",
      "activeEmployees": "العمال النشطون",
      "expenses": "المصاريف والسلفيات"
    },
    "charts": {
      "topCreditors": "أكبر 5 دائنين",
      "expensesDist": "توزيع المصاريف",
      "piePlaceholder": "مساحة المخطط الدائري",
      "barPlaceholder": "مساحة المخطط العمودي"
    },
    "lists": {
      "urgentAlerts": "تنبيهات عاجلة",
      "recentAudit": "سجل النشاطات الأخير"
    },
    "actions": {
      "payNow": "دفع الآن"
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
    "modal": {
      "nameLabel": "اسم المورد",
      "phoneLabel": "رقم الهاتف",
      "debtLabel": "الدين الأولي (د.ج)",
      "saveBtn": "حفظ المورد",
      "cancelBtn": "إلغاء"
    }
  },
  "hr": {
    "title": "الموارد البشرية",
    "subtitle": "إدارة الحضور، الورديات، وسجلات العمال",
    "scanner": {
      "title": "سجل الدخول والخروج",
      "placeholder": "قم بمسح الباركود أو أدخل الرمز...",
      "submit": "تسجيل"
    },
    "kpi": {
      "present": "حاضر اليوم",
      "absent": "غائب",
      "late": "متأخر"
    },
    "table": {
      "name": "اسم العامل",
      "role": "المنصب",
      "timeIn": "وقت الدخول",
      "timeOut": "وقت الخروج",
      "status": "الحالة"
    },
    "status": {
      "present": "حاضر",
      "absent": "غائب",
      "late": "متأخر"
    }
  },
  "expenses": {
    "title": "المصاريف والسلفيات",
    "subtitle": "تتبع مصاريف المتجر اليومية وسلفيات العمال",
    "addExpense": "إضافة مصروف",
    "searchPlaceholder": "ابحث في الوصف...",
    "kpi": {
      "today": "مصاريف اليوم",
      "month": "مصاريف هذا الشهر"
    },
    "table": {
      "date": "التاريخ",
      "description": "الوصف",
      "category": "التصنيف",
      "amount": "المبلغ"
    },
    "categories": {
      "utilities": "فواتير ومرافق",
      "maintenance": "صيانة",
      "supplies": "مستلزمات المتجر",
      "advance": "سلفة عامل"
    }
  },
  "agenda": {
    "title": "أجندة المتجر",
    "subtitle": "إدارة مواعيد الاستلام، المدفوعات القادمة، والمهام",
    "addTask": "مهمة جديدة",
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
    }
  }
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

  ,

  "expenses": {
    "title": "Expenses & Advances",
    "subtitle": "Track daily store expenses and employee salary advances",
    "addExpense": "Add Expense",
    "searchPlaceholder": "Search by description...",
    "kpi": {
      "today": "Today's Expenses",
      "month": "This Month (Total)"
    },
    "table": {
      "date": "Date",
      "description": "Description",
      "category": "Category",
      "amount": "Amount"
    },
    "categories": {
      "utilities": "Utilities & Bills",
      "maintenance": "Maintenance",
      "supplies": "Store Supplies",
      "advance": "Employee Advance"
    }
  }
  ,
  
  "agenda": {
    "title": "Store Agenda",
    "subtitle": "Manage scheduled deliveries, upcoming payments, and tasks",
    "addTask": "New Task",
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
    }
  }
}


```

---

## الملف: `frontend\store\authStore.js`

```javascript

```

---

