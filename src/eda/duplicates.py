import pandas as pd


def get_duplicates(df: pd.DataFrame, shape: tuple) -> dict:
    num_duplicates = df.duplicated().sum()

    return {"overview": {"duplicates": {"num_duplicates": num_duplicates,
                                        "proportion_duplicated": num_duplicates / shape[0]}}}
