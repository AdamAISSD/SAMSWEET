# SAMSWEET Price Admin Android Build Guide

Date: 2026-06-24

## Source Path

Android source is stored in:

```text
android/SamsweetPriceAdmin/
```

The repository does not commit APK, AAB, signing files, keystores, or local build outputs.

## Build With GitHub Actions

Workflow:

```text
.github/workflows/android-build.yml
```

It builds a debug APK artifact on push, pull request, or manual workflow dispatch.

No GitHub token, signing key, or Play Store credential is required.

## Build Locally

Requirements:

- Android Studio or Android SDK command-line tools
- JDK 17+
- Gradle 8.10.x or compatible
- Android platform 35
- AndroidX enabled through `android/SamsweetPriceAdmin/gradle.properties`

Command:

```bash
cd android/SamsweetPriceAdmin
gradle :app:assembleDebug
```

Output:

```text
android/SamsweetPriceAdmin/app/build/outputs/apk/debug/app-debug.apk
```

## Security Notes

- Do not place GitHub tokens in source files.
- Do not commit `local.properties`, keystores, signing configs, APKs, AABs, or logs.
- Use a fine-grained PAT only inside the app at runtime.
- Prefer session-only token use when possible.
