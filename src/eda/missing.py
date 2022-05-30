import pandas as pd


def calculate_missing_values(df, shape):
    missing = {}
    length = shape[1]

    for column in df:
        missing_count = df[column].isna().sum()
        missing[column] = {"count": missing_count, "proportion": 0 if length == 0 else missing_count/length}

    return missing