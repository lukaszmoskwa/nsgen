/**
 * Default abstract parser class used as schema
 */
abstract class Parser {
  public abstract parserType: string;
  /**
   * Function used to parse the fie
   * @param config Configuration file to parse
   */
  public abstract parse(config?: any): void;

  /**
   * Function used to transform the raw configuration object to
   * the stardardized type
   * @param config Raw configuration object
   */
  public abstract typeMap(config?: any): void;

  /**
   * Function used to check if the raw configuration object
   * is in the right format
   * @param config Raw configuration object to validate
   */
  public abstract validate(config?: any): void;
}

export default Parser;
