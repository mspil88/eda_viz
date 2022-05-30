import pandas as pd


def get_duplicates(df, shape):
    num_duplicates = df.duplicated().sum()

    return {"num_duplicates": num_duplicates,
            "proportion duplicated": num_duplicates/shape[0]}